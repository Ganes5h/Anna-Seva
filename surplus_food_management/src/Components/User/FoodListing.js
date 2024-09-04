import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Box,
  Pagination,
  Dialog,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const Donations = () => {
  const { user } = useSelector((state) => state.auth);
  const [donationData, setDonationData] = useState({ donations: [] });
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [requestDialogOpen, setRequestDialogOpen] = useState(false);
  const [selectedDonationId, setSelectedDonationId] = useState(null);
  const [ngoNames, setNgoNames] = useState([]);
  const [requestId, setRequestId] = useState(null); // Add state for requestId

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/donation/donationsbyhotel?id=${user._id}`
        );
        if (Array.isArray(response.data)) {
          setDonationData({ donations: response.data });
        } else {
          setDonationData({ donations: [] });
        }
      } catch (error) {
        console.error("Error fetching donations:", error);
        setDonationData({ donations: [] });
      }
    };

    fetchDonations();
  }, [user._id]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleOpenDialog = (donation) => {
    setSelectedDonation(donation);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedDonation(null);
  };

  const handleOpenRequestDialog = async (donationId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/donation/getNgoName?id=${donationId}`
      );
      const ngos = response.data.ngos;
      setNgoNames(ngos.map((ngo) => ngo.name));
      setSelectedDonationId(donationId);
      setRequestDialogOpen(true);
      if (ngos.length > 0) {
        setRequestId(ngos[0]._id); // Assume the request ID is the first NGO's ID for demonstration
      }
    } catch (error) {
      console.error("Error fetching NGO names:", error);
    }
  };

  const handleCloseRequestDialog = () => {
    setRequestDialogOpen(false);
    setSelectedDonationId(null);
    setNgoNames([]);
  };

  const handleAcceptRequest = async (donationId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/donation/donationsbyhotel?id=${user._id}`
      );
      const donations = response.data;

      // Find the donation with the given ID
      const donation = donations.find(
        (donation) => donation._id === donationId
      );

      if (donation) {
        // Iterate over each request ID and accept it
        donation.requests.forEach(async (requestId) => {
          try {
            await axios.post(
              "http://localhost:5000/api/donation/request/status",
              {
                requestId: requestId,
                status: "Accepted",
              }
            );
            toast.success("Success");
          } catch (error) {
            console.error("Error accepting request:", error);
            toast.error("error");
          }
        });
      }
    } catch (error) {
      console.error("Error fetching donations:", error);
    }
  };

  const handleRejectRequest = async (donationId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/donation/donationsbyhotel?id=${user._id}`
      );
      const donations = response.data;

      // Find the donation with the given ID
      const donation = donations.find(
        (donation) => donation._id === donationId
      );

      if (donation) {
        // Iterate over each request ID and reject it
        donation.requests.forEach(async (requestId) => {
          try {
            await axios.post(
              "http://localhost:5000/api/donation/request/status",
              {
                requestId: requestId,
                status: "Rejected",
              }
            );
            toast.success("Success");
          } catch (error) {
            console.error("Error rejecting request:", error);
            toast.error("error");
          }
        });
      }
    } catch (error) {
      console.error("Error fetching donations:", error);
    }
  };

  const calculateDistance = (donation) => {
    const userLat = user.location.coordinates[1];
    const userLng = user.location.coordinates[0];
    const donationLat = donation.location.coordinates[1];
    const donationLng = donation.location.coordinates[0];

    // Using Haversine formula to calculate distance between two points
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(donationLat - userLat);
    const dLng = deg2rad(donationLng - userLng);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(userLat)) *
        Math.cos(deg2rad(donationLat)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance.toFixed(2);
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  // Pagination logic
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedDonations = donationData.donations.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        {paginatedDonations.map((donation) => {
          const uploadPhoto = donation.uploadPhoto;
          const imageUrl =
            uploadPhoto && uploadPhoto.includes("\\")
              ? `http://localhost:5000/donations/${uploadPhoto
                  .split("\\")
                  .pop()}`
              : uploadPhoto
              ? `http://localhost:5000/donations/${uploadPhoto}`
              : null;

          return (
            <Grid item xs={12} sm={6} md={4} key={donation._id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent>
                  <Typography variant="h6">{donation.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {donation.category}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Distance: {calculateDistance(donation)} km
                  </Typography>
                </CardContent>
                {imageUrl && (
                  <CardMedia
                    component="img"
                    sx={{
                      height: 200,
                      objectFit: "cover",
                    }}
                    image={imageUrl}
                    alt={donation.name}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => handleOpenDialog(donation)}
                  >
                    Donation Details
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    sx={{ mt: 1 }}
                    onClick={() => handleOpenRequestDialog(donation._id)}
                  >
                    View Requests ({donation.requests.length})
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Pagination
          count={Math.ceil(donationData.donations.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>

      <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth>
        <DialogContent>
          {selectedDonation && (
            <div>
              <Typography variant="h6" gutterBottom sx={{ color: "#3f51b5" }}>
                Donation Details
              </Typography>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", color: "#673ab7" }}>
                      Name:
                    </TableCell>
                    <TableCell>{selectedDonation.name}</TableCell>
                  </TableRow>
                  {/* Add more donation details here */}
                </TableBody>
              </Table>
            </div>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={requestDialogOpen}
        onClose={handleCloseRequestDialog}
        fullWidth
      >
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Request Details
          </Typography>
          {ngoNames.length > 0 ? (
            ngoNames.map((name, index) => (
              <Box
                key={index}
                sx={{ display: "flex", alignItems: "center", mb: 2 }}
              >
                <Typography variant="body1">{name}</Typography>
                <Box sx={{ ml: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAcceptRequest(selectedDonationId)}
                    sx={{ mr: 1 }}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleRejectRequest(selectedDonationId)}
                  >
                    Reject
                  </Button>
                </Box>
              </Box>
            ))
          ) : (
            <Typography variant="body1">No NGOs found</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRequestDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Donations;
