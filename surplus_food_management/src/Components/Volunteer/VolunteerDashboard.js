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
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { useSelector } from "react-redux";

const VolunteerDashboard = ({ setSelectedLink }) => {
  const [donations, setDonations] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      // Fetch donations for the volunteer
      axios
        .get(
          `http://localhost:5000/api/donation/getDonationForVolunteer?id=${user._id}`
        )
        .then((response) => {
          setDonations(response.data.donations || []);
        })
        .catch((error) => {
          console.error("Error fetching donations:", error);
        });
    }
  }, [user]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // metres
    const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in metres
    return d / 1000; // in kilometers
  };

  const handleAcceptDonation = (donationId) => {
    axios
      .post("http://localhost:5000/api/donation/accept-donation-by-volunteer", {
        donationId: donationId,
        volunteerId: user._id,
      })
      .then((response) => {
        Swal.fire({
          title: "Donation Accepted!",
          text: "You have successfully accepted the donation.",
          icon: "success",
        });
        // Reload donations after accepting
        axios
          .get(
            `http://localhost:5000/api/donation/getDonationForVolunteer?id=${user._id}`
          )
          .then((response) => {
            setDonations(response.data.donations || []);
          })
          .catch((error) => {
            console.error("Error fetching donations:", error);
          });
      })
      .catch((error) => {
        console.error("Error accepting donation:", error);
        Swal.fire({
          title: "Error!",
          text: "There was a problem accepting the donation.",
          icon: "error",
        });
      });
  };

  const handleViewDonation = (donation) => {
    setSelectedDonation(donation);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      {donations.length === 0 ? (
        <Typography variant="h5" align="center" sx={{ mt: 3 }}>
          No Donations available at this point
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {donations.map((donation) => (
            <Grid item xs={12} sm={6} md={4} key={donation._id}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
                  transition: "0.3s",
                  borderRadius: "16px",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={`http://localhost:5000/${donation.uploadPhoto}`}
                  alt={donation.name}
                  sx={{
                    objectFit: "cover",
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="div" gutterBottom>
                    {donation.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ flexGrow: 1 }}
                  >
                    Description: {donation.description}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ flexGrow: 1 }}
                  >
                    Quantity: {donation.quantity}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ flexGrow: 1 }}
                  >
                    Distance:{" "}
                    {user &&
                      user.location &&
                      donation.location &&
                      calculateDistance(
                        donation.location.coordinates[1],
                        donation.location.coordinates[0],
                        user.location.coordinates[1],
                        user.location.coordinates[0]
                      ).toFixed(2)}{" "}
                    km
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 2,
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={() => handleAcceptDonation(donation._id)}
                      sx={{ borderRadius: "999px" }}
                    >
                      Accept Donation
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => handleViewDonation(donation)}
                      sx={{ borderRadius: "999px" }}
                    >
                      View
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Donation Details</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Name:</TableCell>
                  <TableCell>
                    {selectedDonation ? selectedDonation.name : ""}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Type:</TableCell>
                  <TableCell>
                    {selectedDonation ? selectedDonation.type : ""}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Description:</TableCell>
                  <TableCell>
                    {selectedDonation ? selectedDonation.description : ""}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Category:</TableCell>
                  <TableCell>
                    {selectedDonation ? selectedDonation.category : ""}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Quantity:</TableCell>
                  <TableCell>
                    {selectedDonation ? selectedDonation.quantity : ""}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Expiry:</TableCell>
                  <TableCell>
                    {selectedDonation
                      ? new Date(selectedDonation.expiry).toLocaleDateString()
                      : ""}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Ideal For:</TableCell>
                  <TableCell>
                    {selectedDonation ? selectedDonation.idealfor : ""}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Available At:</TableCell>
                  <TableCell>
                    {selectedDonation
                      ? new Date(selectedDonation.availableAt).toLocaleString()
                      : ""}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Pickup Instructions:</TableCell>
                  <TableCell>
                    {selectedDonation
                      ? selectedDonation.pickupInstructions
                      : ""}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Contact Person:</TableCell>
                  <TableCell>
                    {selectedDonation ? selectedDonation.contactPerson : ""}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VolunteerDashboard;
