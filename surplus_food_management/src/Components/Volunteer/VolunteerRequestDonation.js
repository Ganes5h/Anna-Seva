import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { useSelector } from "react-redux";

const ReceivedDonations = () => {
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [openContactDialog, setOpenContactDialog] = useState(false);
  const [openTrackingDialog, setOpenTrackingDialog] = useState(false);
  const [trackingDetails, setTrackingDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `http://localhost:5000/api/donation/getRequestByVolunteer?id=${user._id}`
      )
      .then((response) => {
        setAcceptedRequests(response.data.acceptedRequests);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching accepted requests:", error);
        setLoading(false);
      });
  }, [user._id]);

  const handleContactClick = (donation) => {
    setSelectedDonation(donation);
    setOpenContactDialog(true);
  };

  const handleTrackingClick = (donationId) => {
    setLoading(true);
    axios
      .get(
        `http://localhost:5000/api/tracking/tracking/donation?id=${donationId}`
      )
      .then((response) => {
        setTrackingDetails(response.data.trackingDetails || []);
        setOpenTrackingDialog(true);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tracking data:", error);
        setLoading(false);
      });
  };

  const handleUploadPhotoClick = (donationId) => {
    // Assuming you have a file input with the id "photoInput"
    const fileInput = document.getElementById("photoInput");
    fileInput.click(); // Trigger the file input click event
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("photo", file);
    formData.append("donationId", selectedDonation._id);

    try {
      setLoading(true);
      await axios.post(
        "http://localhost:5000/api/volunteer/donations/upload-photos",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);
      // Optionally, you can show a success message or update the UI after photo upload
    } catch (error) {
      console.error("Error uploading photo:", error);
      setLoading(false);
      // Optionally, you can show an error message or handle the error appropriately
    }
  };

  const handleCloseDialogs = () => {
    setOpenContactDialog(false);
    setOpenTrackingDialog(false);
  };

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
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      {loading && <CircularProgress />}
      <Grid container spacing={3}>
        {acceptedRequests.map((request) => (
          <Grid item xs={12} key={request._id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Received Donation
                </Typography>
                <Typography variant="body1" component="p">
                  Donation ID: {request.donation}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Status: {request.status}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Received At:{" "}
                  {new Date(request.createdAt).toLocaleString()}
                </Typography>
                <Box sx={{ marginTop: 2 }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleContactClick(request)}
                  >
                    Contact
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleTrackingClick(request.donation)}
                    sx={{ marginLeft: 2 }}
                  >
                    Live Tracking
                  </Button>
                  {request.status === "Delivered" && (
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleUploadPhotoClick(request.donation)}
                      sx={{ marginLeft: 2 }}
                    >
                      Upload Photo
                    </Button>
                  )}
                  <input
                    type="file"
                    id="photoInput"
                    style={{ display: "none" }}
                    onChange={handleFileInputChange}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openContactDialog} onClose={handleCloseDialogs}>
        <DialogTitle>Contact Details</DialogTitle>
        <DialogContent>
          <Typography>
            Donation ID: {selectedDonation ? selectedDonation.donation : ""}
          </Typography>
          {/* Add more contact details here */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogs}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openTrackingDialog} onClose={handleCloseDialogs}>
        <DialogTitle>Live Tracking Details</DialogTitle>
        <DialogContent>
          {trackingDetails.length > 0 ? (
            <Stepper activeStep={trackingDetails.length}>
              {trackingDetails.map((step, index) => (
                <Step key={index}>
                  <StepLabel>{step.location}</StepLabel>
                  <Typography variant="body2">
                    Distance:{" "}
                    {calculateDistance(
                      step.location.coordinates[0],
                      step.location.coordinates[1],
                      user.location.coordinates[0],
                      user.location.coordinates[1]
                    ).toFixed(2)}{" "}
                    km
                  </Typography>
                </Step>
              ))}
            </Stepper>
          ) : (
            <Typography>No tracking details available.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogs}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ReceivedDonations;
