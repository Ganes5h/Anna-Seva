import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Snackbar,
  Alert,
  Step,
  Stepper,
  StepLabel,
  StepIcon,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import QrScanner from "./NgoQrScanner"; // Import your QR Scanner component here
import { useSelector } from "react-redux";
import Title from "../Title/Title1";

const DonationList = () => {
  const [donations, setDonations] = useState([]);
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openTrackingDialog, setOpenTrackingDialog] = useState(false);
  const [openQRDialog, setOpenQRDialog] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [userLoading, setUserLoading] = useState(true);
  const [contactDetails, setContactDetails] = useState(null);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchDonations = async () => {
      if (user && user._id) {
        setUserLoading(false);
        try {
          const response = await axios.get(
            `http://annaseva.ajinkyatechnologies.in/api/donation/getReceivedDonationForNgo?id=${user._id}`
          );
          setDonations(response.data.claimedDonationsWithDetails);
        } catch (error) {
          console.error("Error fetching donations:", error);
        }
      } else {
        setUserLoading(true);
      }
    };

    fetchDonations();
  }, [user]);

  const handleTrackingClick = async (donationId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://annaseva.ajinkyatechnologies.in/api/tracking/tracking/donation?id=${donationId}`
      );
      setTrackingInfo(response.data.trackingRecords[0]);
      if (response.data.trackingRecords[0].status === "Delivered") {
        setShowSnackbar(true);
      }
      setLoading(false);
      setOpenTrackingDialog(true);
    } catch (error) {
      console.error("Error fetching tracking info:", error);
      setLoading(false);
    }
  };

  const handleQRScanClick = (donationId) => {
    const selectedDonation = donations.find(
      (donation) => donation.donationDetails?._id === donationId
    );
    if (selectedDonation) {
      setSelectedDonation(selectedDonation);
      setOpenQRDialog(true);
    } else {
      console.error(`Donation with ID ${donationId} not found.`);
    }
  };

  const handleContactClick = (donationDetails) => {
    if (donationDetails) {
      setContactDetails({
        contactPerson: donationDetails.contactPerson,
        pickupInstructions: donationDetails.pickupInstructions,
        // Add any other relevant contact details here
      });
      setOpenTrackingDialog(true);
    } else {
      console.error("Donation details are undefined");
      // Optionally, show an error message to the user
    }
  };

  const handleCloseTrackingDialog = () => {
    setOpenTrackingDialog(false);
    setContactDetails(null);
    setTrackingInfo(null);
  };

  const handleCloseQRDialog = () => {
    setOpenQRDialog(false);
  };

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  const updateStatusToDelivered = async (trackingId) => {
    try {
      const response = await axios.put(
        `http://annaseva.ajinkyatechnologies.in/api/tracking/scan/ngo?id=${trackingId}`
      );
      console.log(response.data);
      handleTrackingClick(selectedDonation.donationDetails._id);
      handleCloseQRDialog();
    } catch (error) {
      console.error("Error updating status to delivered:", error);
    }
  };

  const steps = ["Accepted", "Shipped", "Delivered"];

  const getActiveStep = (status) => {
    switch (status) {
      case "Accepted":
        return 0;
      case "Shipped":
        return 1;
      case "Delivered":
        return 2;
      default:
        return 0;
    }
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <div className="pb-8">
        <Title title="Received Donations"></Title>
      </div>
      {userLoading ? (
        <Typography variant="h5" align="center" sx={{ mt: 3 }}>
          Loading user data...
        </Typography>
      ) : donations.length === 0 ? (
        <Typography variant="h5" align="center" sx={{ mt: 3 }}>
          No Donations available at this point
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {donations.map((donation) => {
            const donationDetails = donation?.donationDetails;
            if (!donationDetails) return null;

            const uploadPhoto = donationDetails.uploadPhoto;
            const imageUrl =
              uploadPhoto && uploadPhoto.includes("\\")
                ? `http://annaseva.ajinkyatechnologies.in/${uploadPhoto
                    .split("\\")
                    .pop()}`
                : uploadPhoto
                ? `http://annaseva.ajinkyatechnologies.in/${uploadPhoto}`
                : "https://via.placeholder.com/200";

            return (
              <Grid item xs={12} sm={6} md={4} key={donationDetails._id}>
                <Card
                  sx={{
                    maxWidth: 345,
                    boxShadow: `3px 3px 10px green`,
                    transition: "transform 0.2s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={imageUrl}
                    alt={donationDetails?.name || "Donation Image"}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                      {donationDetails?.name}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "stretch",
                      }}
                    >
                      <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={() => handleTrackingClick(donationDetails._id)}
                      >
                        Tracking
                      </Button>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mt: 2,
                        }}
                      >
                        <Button
                          variant="contained"
                          color="secondary"
                          sx={{ width: "calc(50% - 8px)" }}
                          onClick={() => handleContactClick(donationDetails)}
                        >
                          Contact
                        </Button>
                        <Button
                          variant="outlined"
                          sx={{
                            width: "calc(50% - 8px)",
                            backgroundColor: "#20B486",
                            "&:hover": {
                              backgroundColor: "#1A946D ",
                            },
                            color: "white",
                          }}
                          onClick={() => handleQRScanClick(donationDetails._id)}
                        >
                          Scan QR
                        </Button>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* Tracking/Contact Dialog */}
      <Dialog open={openTrackingDialog} onClose={handleCloseTrackingDialog}>
        <DialogTitle>
          {contactDetails ? "Contact Details" : "Tracking Status"}
        </DialogTitle>
        <DialogContent>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
              <CircularProgress />
            </Box>
          ) : contactDetails ? (
            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", color: "green" }}>
                      Contact Person
                    </TableCell>
                    <TableCell>{contactDetails.contactPerson}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", color: "green" }}>
                      Pickup Instructions
                    </TableCell>
                    <TableCell>{contactDetails.pickupInstructions}</TableCell>
                  </TableRow>
                  {/* Add more rows for additional contact details if needed */}
                </TableBody>
              </Table>
            </TableContainer>
          ) : trackingInfo ? (
            <Stepper
              activeStep={getActiveStep(trackingInfo.status)}
              alternativeLabel
            >
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel
                    StepIconComponent={(props) =>
                      index === 2 && trackingInfo.status === "Delivered" ? (
                        <CheckCircleIcon color="success" />
                      ) : (
                        <StepIcon {...props} />
                      )
                    }
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          ) : (
            <Typography variant="h6">No details found.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTrackingDialog}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* QR Scanner Dialog */}
      <Dialog open={openQRDialog} onClose={handleCloseQRDialog}>
        <DialogTitle>Scan QR Code</DialogTitle>
        <DialogContent>
          {selectedDonation && (
            <QrScanner
              isOpen={openQRDialog}
              onClose={handleCloseQRDialog}
              onScan={(result) => updateStatusToDelivered(result)}
              donationId={selectedDonation.donationDetails._id}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseQRDialog}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for congrats message */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          Congratulations! Donation has been delivered successfully.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DonationList;
