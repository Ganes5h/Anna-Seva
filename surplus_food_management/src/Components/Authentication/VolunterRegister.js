import React, { useState } from "react";
import backGroundImage from "../../Images/BackgroundImage.svg";
import {
  Button,
  Box,
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PinDropIcon from "@mui/icons-material/PinDrop";
import { toast } from "sonner";
import logo from "../../Images/Logo.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import MapWithGeocoder from "./MapWithGeolocatorAuthentication"; // Import the Map component

function VolunteerRegister() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    contactNumber: "",
    locationType: "Point",
    locationCoordinates: [null, null], // New field for coordinates
  });
  const [openMapDialog, setOpenMapDialog] = useState(false);
  const [errors, setErrors] = useState({});
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
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!formData.email.endsWith("@gmail.com")) {
      newErrors.email = "Email must end with @gmail.com";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 5) {
      newErrors.password = "Password must be at least 5 characters long";
    }
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.pincode) newErrors.pincode = "Pincode is required";
    if (!formData.contactNumber) {
      newErrors.contactNumber = "Contact Number is required";
    } else if (!/^\d{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = "Contact Number must be 10 digits";
    }
    if (
      !formData.locationCoordinates ||
      formData.locationCoordinates.some((coord) => coord === null)
    ) {
      newErrors.locationCoordinates =
        "Location Coordinates are required and must be selected on map";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/volunteer/register",
        formData
      );
      if (response.status === 201) {
        toast.success("Volunteer Registration Successful");
        navigate("/login"); // Redirect to login or any other route after successful registration
      }
    } catch (error) {
      toast.error(
        `Volunteer registration failed: ${
          error.response?.data?.message || error.message
        }`
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
                  backgroundColor: "#1A946D ",
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
            // background: "rgba(255, 255, 255, 0.9)",
            borderRadius: "10px",
          }}
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="name"
                placeholder="Enter your Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.name}
                onChange={handleInputChange}
                required
                error={!!errors.name}
                helperText={errors.name}
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
                name="email"
                placeholder="Enter your Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.email}
                onChange={handleInputChange}
                required
                error={!!errors.email}
                helperText={errors.email}
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
                placeholder="Enter your Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.password}
                onChange={handleInputChange}
                required
                error={!!errors.password}
                helperText={errors.password}
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
                placeholder="Enter your Address"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.address}
                onChange={handleInputChange}
                required
                error={!!errors.address}
                helperText={errors.address}
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
                placeholder="Enter your City"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.city}
                onChange={handleInputChange}
                required
                error={!!errors.city}
                helperText={errors.city}
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
                placeholder="Enter your State"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.state}
                onChange={handleInputChange}
                required
                error={!!errors.state}
                helperText={errors.state}
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
                placeholder="Enter your Pincode"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.pincode}
                onChange={handleInputChange}
                required
                error={!!errors.pincode}
                helperText={errors.pincode}
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
                name="contactNumber"
                placeholder="Enter your Contact Number"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.contactNumber}
                onChange={handleInputChange}
                required
                error={!!errors.contactNumber}
                helperText={errors.contactNumber}
                InputProps={{
                  startAdornment: (
                    <PhoneIcon sx={{ color: "black", marginRight: "10px" }} />
                  ),
                  sx: { borderRadius: "20px", backgroundColor: "white" },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleOpenMapDialog}
                fullWidth
                sx={{
                  borderRadius: "20px",
                  backgroundColor: "white",
                  marginTop: "10px",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                  },
                }}
              >
                Select Location on Map
              </Button>
              {errors.locationCoordinates && (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {errors.locationCoordinates}
                </p>
              )}
            </Grid>
          </Grid>
          <Box mt={3} display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                borderRadius: "20px",
                backgroundColor: "#20B486",
                "&:hover": {
                  backgroundColor: "#1A946D",
                },
              }}
            >
              Register
            </Button>
          </Box>
        </form>
      </div>
      <Dialog
        open={openMapDialog}
        onClose={handleCloseMapDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Select Location</DialogTitle>
        <DialogContent>
          <MapWithGeocoder onLocationSelect={handleLocationSelect} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMapDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default VolunteerRegister;
