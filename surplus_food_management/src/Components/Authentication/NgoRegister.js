import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
import MapWithGeolocatorAuthentication from "./MapWithGeolocatorAuthentication";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import BusinessIcon from "@mui/icons-material/Business";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PinDropIcon from "@mui/icons-material/PinDrop";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import WorkIcon from "@mui/icons-material/Work";
import backGroundImage from "../../Images/BackgroundImage.svg";
import logo from "../../Images/Logo.svg";

const HotelRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    contactPerson: "",
    contactNumber: "",
    position: "",
    locationType: "Point",
    locationCoordinates: [null, null],
  });
  const [openMapDialog, setOpenMapDialog] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLocationSelect = ({ lat, lng }) => {
    setFormData((prevData) => ({
      ...prevData,
      locationCoordinates: [lat, lng],
    }));
  };

  const handleOpenMapDialog = () => {
    setOpenMapDialog(true);
  };

  const handleCloseMapDialog = () => {
    setOpenMapDialog(false);
  };

  const validateForm = () => {
    const {
      name,
      email,
      password,
      address,
      city,
      state,
      pincode,
      contactPerson,
      contactNumber,
      position,
      locationCoordinates,
    } = formData;

    if (
      !name ||
      !email ||
      !password ||
      !address ||
      !city ||
      !state ||
      !pincode ||
      !contactPerson ||
      !contactNumber ||
      !position
    ) {
      toast.error("All fields are required.");
      return false;
    }

    if (password.length < 5) {
      toast.error("Password must be at least 5 characters long.");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Invalid email format. It should have @domain.com");
      return false;
    }

    const [lat, lng] = locationCoordinates;
    if (lat === null || lng === null) {
      toast.error("Location must be selected on the map.");
      return false;
    }

    if (
      typeof lat !== "number" ||
      typeof lng !== "number" ||
      lat < -90 ||
      lat > 90 ||
      lng < -180 ||
      lng > 180
    ) {
      toast.error("Invalid coordinates.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/hotel/register",
        formData
      );
      if (response.status === 201) {
        toast.success("Registration Successful");
        navigate("/login");
      }
    } catch (error) {
      toast.error(
        `Registration failed: ${error.response?.data?.error || error.message}`
      );
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backGroundImage})`,
        width: "100%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box display="flex" justifyContent="flex-end">
        <Box
          width="100%"
          height="50px"
          borderRadius="50px"
          display="flex"
          alignItems="center"
          justifyContent="end"
          padding="10px"
        >
          <Link to="/register">
            <Button
              variant="contained"
              color="success"
              sx={{
                borderRadius: "50px",
                backgroundColor: "#20B486",
                "&:hover": {
                  backgroundColor: "#1A946D",
                },
              }}
            >
              Register
            </Button>
          </Link>
        </Box>
      </Box>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={logo} width={70} alt="logo" />
          <h1
            style={{
              color: "white",
              fontSize: "60px",
              paddingLeft: "40px",
              fontFamily: "Dancing Script",
              fontOpticalSizing: "auto",
            }}
          >
            Anna Seva
          </h1>
        </div>
        <form
          style={{
            maxWidth: "600px",
            padding: "20px",
            border: "1px solid white",
            borderRadius: "10px",
          }}
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="name"
                placeholder="Enter Hotel Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.name}
                onChange={handleInputChange}
                required
                InputProps={{
                  startAdornment: (
                    <BusinessIcon
                      sx={{ color: "black", marginRight: "10px" }}
                    />
                  ),
                  sx: { borderRadius: "20px", backgroundColor: "white" },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="email"
                placeholder="Enter Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.email}
                onChange={handleInputChange}
                required
                InputProps={{
                  startAdornment: (
                    <EmailIcon sx={{ color: "black", marginRight: "10px" }} />
                  ),
                  sx: { borderRadius: "20px", backgroundColor: "white" },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="password"
                placeholder="Enter Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.password}
                onChange={handleInputChange}
                required
                InputProps={{
                  startAdornment: (
                    <LockIcon sx={{ color: "black", marginRight: "10px" }} />
                  ),
                  sx: { borderRadius: "20px", backgroundColor: "white" },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="address"
                placeholder="Enter Address"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.address}
                onChange={handleInputChange}
                required
                InputProps={{
                  startAdornment: (
                    <LocationCityIcon
                      sx={{ color: "black", marginRight: "10px" }}
                    />
                  ),
                  sx: { borderRadius: "20px", backgroundColor: "white" },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="city"
                placeholder="Enter City"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.city}
                onChange={handleInputChange}
                required
                InputProps={{
                  startAdornment: (
                    <LocationCityIcon
                      sx={{ color: "black", marginRight: "10px" }}
                    />
                  ),
                  sx: { borderRadius: "20px", backgroundColor: "white" },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="state"
                placeholder="Enter State"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.state}
                onChange={handleInputChange}
                required
                InputProps={{
                  startAdornment: (
                    <LocationCityIcon
                      sx={{ color: "black", marginRight: "10px" }}
                    />
                  ),
                  sx: { borderRadius: "20px", backgroundColor: "white" },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="pincode"
                placeholder="Enter Pincode"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.pincode}
                onChange={handleInputChange}
                required
                InputProps={{
                  startAdornment: (
                    <PinDropIcon sx={{ color: "black", marginRight: "10px" }} />
                  ),
                  sx: { borderRadius: "20px", backgroundColor: "white" },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="contactPerson"
                placeholder="Enter Contact Person"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.contactPerson}
                onChange={handleInputChange}
                required
                InputProps={{
                  startAdornment: (
                    <PersonIcon sx={{ color: "black", marginRight: "10px" }} />
                  ),
                  sx: { borderRadius: "20px", backgroundColor: "white" },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="contactNumber"
                placeholder="Enter Contact Number"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.contactNumber}
                onChange={handleInputChange}
                required
                InputProps={{
                  startAdornment: (
                    <PhoneIcon sx={{ color: "black", marginRight: "10px" }} />
                  ),
                  sx: { borderRadius: "20px", backgroundColor: "white" },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="position"
                placeholder="Enter Position"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.position}
                onChange={handleInputChange}
                required
                InputProps={{
                  startAdornment: (
                    <WorkIcon sx={{ color: "black", marginRight: "10px" }} />
                  ),
                  sx: { borderRadius: "20px", backgroundColor: "white" },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="latitude"
                variant="outlined"
                fullWidth
                placeholder="Latitude"
                margin="normal"
                value={formData.locationCoordinates[0] || ''}
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <PinDropIcon sx={{ color: "black", marginRight: "10px" }} />
                  ),
                  sx: { borderRadius: "20px", backgroundColor: "white" },
                }}
              />
              <TextField
                name="longitude"
                variant="outlined"
                placeholder="Longitude"
                fullWidth
                margin="normal"
                value={formData.locationCoordinates[1] || ''}
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <PinDropIcon sx={{ color: "black", marginRight: "10px" }} />
                  ),
                  sx: { borderRadius: "20px", backgroundColor: "white" },
                }}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleOpenMapDialog}
                sx={{
                  mt: 2,
                  backgroundColor: "#20B486",
                  "&:hover": {
                    backgroundColor: "#1A946D",
                  },
                }}
              >
                Select Location on Map
              </Button>
            </Grid>
          </Grid>
          <p
            style={{
              color: "white",
              alignItems: "center",
              textAlign: "center",
              fontSize: "12px",
              padding: "10px",
            }}
          >
            By signing up to Anna Seva, you agree to our Terms and Privacy
            Policy.
          </p>
          <Button
            type="submit"
            variant="contained"
            color="success"
            fullWidth
            sx={{
              mt: 2,
              height: "50px",
              borderRadius: "20px",
              backgroundColor: "#20B486",
              "&:hover": {
                backgroundColor: "#1A946D",
              },
            }}
          >
            Register
          </Button>
        </form>
      </div>
      <Dialog open={openMapDialog} onClose={handleCloseMapDialog} maxWidth="md" fullWidth>
        <DialogTitle>Select Location on Map</DialogTitle>
        <DialogContent>
          <MapWithGeolocatorAuthentication onLocationSelect={handleLocationSelect} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMapDialog}>Cancel</Button>
          <Button onClick={handleCloseMapDialog}>Select</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default HotelRegister;