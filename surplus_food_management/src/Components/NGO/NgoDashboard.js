import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
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
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  Table,
  TableBody,
} from "@mui/material";
import { useSelector } from "react-redux";
import Title from "../Title/Title1";

const NgoDashboard = ({ setSelectedLink }) => {
  const [donations, setDonations] = useState([]);
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [requestedDonations, setRequestedDonations] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Fetch donations from API
    axios
      .get(
        `http://annaseva.ajinkyatechnologies.in/api/donation/ngos/${user._id}/donations`
      )
      .then((response) => {
        setDonations(response.data.donations);
      })
      .catch((error) => {
        console.error("Error fetching donations:", error);
      });
  }, [user._id]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // meters
    const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in meters
    return (d / 1000).toFixed(2); // convert meters to kilometers and return with 2 decimal places
  };

  const handleRequestClick = (donation) => {
    setSelectedDonation(donation);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, request it!",
      cancelButtonText: "No, cancel!",
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: true,
    }).then((result) => {
      if (result.isConfirmed) {
        handleConfirmRequest();
      }
    });
  };

  const handleConfirmRequest = () => {
    if (selectedDonation) {
      axios
        .put(
          "http://annaseva.ajinkyatechnologies.in/api/donation/donations/request",
          {
            donationId: selectedDonation._id,
            ngoId: user._id,
          }
        )
        .then((response) => {
          setRequestedDonations([...requestedDonations, selectedDonation._id]);
          Swal.fire({
            title: "Requested!",
            text: "Your request has been sent.",
            icon: "success",
          });
        })
        .catch((error) => {
          console.error("Error requesting donation:", error);
          Swal.fire({
            title: "Error!",
            text: "There was a problem sending your request.",
            icon: "error",
          });
        });
    }
  };

  const handleViewDetailsClick = (donation) => {
    setSelectedDonation(donation);
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
  };

  const getBorderColor = (expiryDate) => {
    const currentDate = new Date();
    const expiry = new Date(expiryDate);
    const differenceInDays = Math.ceil(
      (expiry - currentDate) / (1000 * 60 * 60 * 24)
    );

    if (differenceInDays < 4) {
      return "red";
    } else if (differenceInDays < 8) {
      return "orange";
    } else {
      return "green";
    }
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <div className="pb-8">
        <Title title="Dashboard "></Title>
      </div>
      {donations.length === 0 ? (
        <Typography variant="h5" align="center" sx={{ mt: 3 }}>
          No Donations available at this point
        </Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {donations.slice(0, 3).map((donation) => {
              const uploadPhoto = donation.uploadPhoto;
              const imageUrl =
                uploadPhoto && uploadPhoto.includes("\\")
                  ? `http://annaseva.ajinkyatechnologies.in/${uploadPhoto
                      .split("\\")
                      .pop()}`
                  : uploadPhoto
                  ? `http://annaseva.ajinkyatechnologies.in/${uploadPhoto}`
                  : "https://via.placeholder.com/80";

              // Calculate distance between donation and NGO
              const distance = calculateDistance(
                donation.location.coordinates[0],
                donation.location.coordinates[1],
                user.location.coordinates[0],
                user.location.coordinates[1]
              );

              return (
                <Grid item xs={12} sm={6} md={4} key={donation._id}>
                  <Card
                    sx={{
                      maxWidth: 345,
                      boxShadow: `3px 3px 10px ${getBorderColor(
                        donation.expiry
                      )}`,
                      transition: "transform 0.2s ease-in-out", // Adding transition for smooth effect
                      "&:hover": {
                        transform: "scale(1.05)", // Scale effect on hover
                      },
                    }}
                  >
                    {imageUrl ? (
                      <CardMedia
                        component="img"
                        height="200"
                        image={imageUrl}
                        alt={donation.name}
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                    ) : (
                      <CardMedia
                        component="img"
                        height="200"
                        image="https://via.placeholder.com/200"
                        alt="No Image Available"
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                    )}
                    <CardContent>
                      <Typography variant="h5" component="div" gutterBottom>
                        {donation.name}
                      </Typography>
                      <Typography variant="body2" component="p">
                        Distance: {distance} km
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginTop: 2,
                        }}
                      >
                        <Button
                          variant="outlined"
                          onClick={() => handleViewDetailsClick(donation)}
                          sx={{ marginRight: 1 }}
                        >
                          View Details
                        </Button>
                        <Button
                          variant="contained"
                          color={
                            requestedDonations.includes(donation._id) ||
                            donation.requests.length > 0
                              ? "success"
                              : "secondary"
                          }
                          onClick={() => handleRequestClick(donation)}
                          disabled={
                            requestedDonations.includes(donation._id) ||
                            donation.requests.length > 0
                          }
                        >
                          {requestedDonations.includes(donation._id) ||
                          donation.requests.length > 0
                            ? "Requested"
                            : "Request"}
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>

          <Box sx={{ textAlign: "right", marginTop: 3, marginRight: 4 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setSelectedLink("NgoRequestDonation")}
              sx={{
                backgroundColor: "#20B486",
                "&:hover": {
                  backgroundColor: "#1A946D ",
                },
              }}
              disabled={donations.length < 3}
            >
              View More
            </Button>
          </Box>

          <Dialog
            open={openDetails}
            onClose={handleCloseDetails}
            className="rounded-lg shadow-lg"
          >
            <DialogTitle
              sx={{ fontWeight: "bold" }}
              className="text-xl font-bold text-center py-4 bg-green-100 rounded-t-lg"
            >
              Donation Details
            </DialogTitle>
            <DialogContent>
              {selectedDonation && (
                <TableContainer
                  component={Paper}
                  className="bg-green-50 p-4 rounded-lg"
                >
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold", color: "green" }}>
                          Name
                        </TableCell>
                        <TableCell className="text-green-900">
                          {selectedDonation.name}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold", color: "green" }}>
                          Description
                        </TableCell>
                        <TableCell className="text-green-900">
                          {selectedDonation.description}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold", color: "green" }}>
                          Category
                        </TableCell>
                        <TableCell className="text-green-900">
                          {selectedDonation.category}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold", color: "green" }}>
                          Quantity
                        </TableCell>
                        <TableCell className="text-green-900">
                          {selectedDonation.quantity}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold", color: "green" }}>
                          Expiry
                        </TableCell>
                        <TableCell className="text-green-900">
                          {new Date(
                            selectedDonation.expiry
                          ).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold", color: "green" }}>
                          Ideal for
                        </TableCell>
                        <TableCell className="text-green-900">
                          {selectedDonation.idealfor}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold", color: "green" }}>
                          Available at
                        </TableCell>
                        <TableCell className="text-green-900">
                          {new Date(
                            selectedDonation.availableAt
                          ).toLocaleString()}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold", color: "green" }}>
                          Pickup Instructions
                        </TableCell>
                        <TableCell className="text-green-900">
                          {selectedDonation.pickupInstructions}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold", color: "green" }}>
                          Contact
                        </TableCell>
                        <TableCell className="text-green-900">
                          {selectedDonation.contactPerson}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </DialogContent>
            <DialogActions className="px-4 py-2 bg-green-100 rounded-b-lg">
              <Button
                onClick={handleCloseDetails}
                className="text-white bg-green-600 hover:bg-green-700 rounded-md px-4 py-2"
                sx={{
                  color: "green",
                  fontWeight: "semibold",
                  backgroundColor: "#fff",
                  border: "1px solid",
                }}
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Box>
  );
};

export default NgoDashboard;
