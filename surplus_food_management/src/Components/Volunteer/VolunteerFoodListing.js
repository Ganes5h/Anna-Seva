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
  Modal,
  Backdrop,
  Fade,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from "@mui/material";
import { useSelector } from "react-redux";

const DonationList = () => {
  const [donations, setDonations] = useState([]);
  const [open, setOpen] = useState(false);
  const [trackingRecord, setTrackingRecord] = useState(null);
  const { user } = useSelector((state) => state.auth);

  const handleOpen = async (donationId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/tracking/tracking/donation?id=${donationId}`
      );
      if (response.data.success) {
        setTrackingRecord(response.data.trackingRecords[0]);
        setOpen(true);
      } else {
        console.error("Failed to fetch tracking records");
      }
    } catch (error) {
      console.error("Error fetching tracking records:", error);
    }
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/donation/getReceivedDonationForNgo?id=${user._id}`
        );
        setDonations(response.data.claimedDonationsWithDetails);
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };

    fetchDonations();
  }, [user._id]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in meters
    return d / 1000; // convert to kilometers
  };

  return (
    <div>
      {donations.length === 0 ? (
        <Typography variant="h5" align="center" sx={{ mt: 3 }}>
          No donations available
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {donations.map((donation) => (
            <Grid item xs={12} sm={6} md={4} key={donation.donationDetails._id}>
              <Card
                sx={{
                  boxShadow: 3,
                  backgroundColor: "#e8f5e9",
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  width="100%"
                  image={`http://localhost:5000/donations/${donation.donationDetails.uploadPhoto
                    .split("\\")
                    .pop()}`}
                  alt={donation.donationDetails.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {donation.donationDetails.name}
                  </Typography>
                  <Typography variant="body2" component="p">
                    Distance:{" "}
                    {calculateDistance(
                      donation.donationDetails.location.coordinates[0],
                      donation.donationDetails.location.coordinates[1],
                      user.location.coordinates[0],
                      user.location.coordinates[1]
                    ).toFixed(2)}{" "}
                    km
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: 2,
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpen(donation.donationDetails._id)}
                    >
                      Contact
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleOpen(donation.donationDetails._id)}
                    >
                      Live Tracking
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 600,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" component="h2" gutterBottom>
              Tracking Details
            </Typography>
            <Stepper activeStep={0} orientation="vertical">
              {trackingRecord && (
                <>
                  <Step key="Accepted">
                    <StepLabel>Accepted</StepLabel>
                    <StepContent>
                      <Typography variant="body1" gutterBottom>
                        Status:{" "}
                        {trackingRecord.status === "Accepted"
                          ? "Accepted"
                          : "Not Accepted"}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        Hotel: {trackingRecord.donation.hotel.name}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        Contact Person: {trackingRecord.donation.contactPerson}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        Available At:{" "}
                        {new Date(
                          trackingRecord.donation.availableAt
                        ).toLocaleString()}
                      </Typography>
                    </StepContent>
                  </Step>
                  <Step key="In Transit">
                    <StepLabel>In Transit</StepLabel>
                    <StepContent>
                      <Typography variant="body1" gutterBottom>
                        Status: In Transit
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        Estimated Arrival Time:{" "}
                        {new Date(
                          trackingRecord.donation.estimatedArrivalTime
                        ).toLocaleString()}
                      </Typography>
                    </StepContent>
                  </Step>
                  <Step key="Delivered">
                    <StepLabel>Delivered</StepLabel>
                    <StepContent>
                      <Typography variant="body1" gutterBottom>
                        Status: Delivered
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        Delivered At:{" "}
                        {new Date(
                          trackingRecord.donation.deliveredAt
                        ).toLocaleString()}
                      </Typography>
                    </StepContent>
                  </Step>
                </>
              )}
            </Stepper>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default DonationList;
