import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "sonner";

function NonVerifiedHotels() {
  const [hotels, setHotels] = useState([]);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedHotelId, setSelectedHotelId] = useState(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedHotelDetails, setSelectedHotelDetails] = useState({});

  useEffect(() => {
    const fetchNonVerifiedHotels = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/hotel/hotels/non-verified"
        );
        setHotels(response.data.nonVerifiedHotels);
      } catch (error) {
        console.error("Error fetching non-verified hotels:", error);
      }
    };

    fetchNonVerifiedHotels();
  }, []);

  const handleVerifyHotel = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/hotel/verify/hotel/${selectedHotelId}`
      );
      toast.success(response.data.message);
      setHotels(hotels.filter((hotel) => hotel._id !== selectedHotelId));
      setOpenConfirmDialog(false);
    } catch (error) {
      toast.error("Error verifying hotel:", error);
    }
  };

  const handleOpenImageDialog = (imagePath) => {
    const correctedPath = imagePath.replace("public\\", "").replace(/\\/g, "/");
    setImageUrl(`http://localhost:5000/${correctedPath}`);
    setOpenImageDialog(true);
  };

  const handleCloseImageDialog = () => {
    setOpenImageDialog(false);
    setImageUrl("");
  };

  const handleOpenConfirmDialog = (hotelId) => {
    setSelectedHotelId(hotelId);
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    setSelectedHotelId(null);
  };

  const handleOpenDetailsDialog = (hotel) => {
    setSelectedHotelDetails(hotel);
    setOpenDetailsDialog(true);
  };

  const handleCloseDetailsDialog = () => {
    setOpenDetailsDialog(false);
    setSelectedHotelDetails({});
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ marginTop: 4 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "primary.main" }}>
            <TableRow>
              <TableCell sx={{ color: "common.white", fontWeight: "bold" }}>
                Hotel Name
              </TableCell>
              <TableCell sx={{ color: "common.white", fontWeight: "bold" }}>
                Aadhar Image
              </TableCell>
              <TableCell sx={{ color: "common.white", fontWeight: "bold" }}>
                License Image
              </TableCell>
              <TableCell sx={{ color: "common.white", fontWeight: "bold" }}>
                Action
              </TableCell>
              <TableCell sx={{ color: "common.white", fontWeight: "bold" }}>
                Details
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hotels.map((hotel) => (
              <TableRow key={hotel._id}>
                <TableCell>{hotel.name}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ margin: 0.5 }}
                    onClick={() => handleOpenImageDialog(hotel.kycDocuments[0])}
                  >
                    See Aadhar Image
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ margin: 0.5 }}
                    onClick={() => handleOpenImageDialog(hotel.kycDocuments[1])}
                  >
                    See License Image
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ margin: 0.5 }}
                    onClick={() => handleOpenConfirmDialog(hotel._id)}
                  >
                    Verify
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="info"
                    sx={{ margin: 0.5 }}
                    onClick={() => handleOpenDetailsDialog(hotel)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openImageDialog} onClose={handleCloseImageDialog}>
        <DialogTitle>
          Image
          <IconButton
            aria-label="close"
            onClick={handleCloseImageDialog}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <img src={imageUrl} alt="KYC Document" style={{ width: "100%" }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseImageDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
        <DialogTitle>Confirm Verification</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to verify this hotel?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleVerifyHotel} color="secondary">
            Verify
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDetailsDialog} onClose={handleCloseDetailsDialog}>
        <DialogTitle>
          Hotel Details
          <IconButton
            aria-label="close"
            onClick={handleCloseDetailsDialog}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="body1">
            <strong>Name:</strong> {selectedHotelDetails.name}
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> {selectedHotelDetails.email}
          </Typography>
          <Typography variant="body1">
            <strong>Address:</strong> {selectedHotelDetails.address}
          </Typography>
          <Typography variant="body1">
            <strong>City:</strong> {selectedHotelDetails.city}
          </Typography>
          <Typography variant="body1">
            <strong>State:</strong> {selectedHotelDetails.state}
          </Typography>
          <Typography variant="body1">
            <strong>Pincode:</strong> {selectedHotelDetails.pincode}
          </Typography>
          <Typography variant="body1">
            <strong>Contact Person:</strong>{" "}
            {selectedHotelDetails.contactPerson}
          </Typography>
          <Typography variant="body1">
            <strong>Contact Number:</strong>{" "}
            {selectedHotelDetails.contactNumber}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetailsDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default NonVerifiedHotels;
