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

function UserRegister() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNo: "",
    password: "",
    city: "",
    pincode: "",
    latitude: null, // New field for latitude
    longitude: null, // New field for longitude
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
      latitude: lat,
      longitude: lng,
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
    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!formData.email.endsWith("@gmail.com"))
      newErrors.email = "Email must end with @gmail.com";
    if (!formData.mobileNo) newErrors.mobileNo = "Mobile Number is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 5)
      newErrors.password = "Password must be at least 5 characters long";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.pincode) newErrors.pincode = "Pincode is required";
    if (formData.latitude === null) newErrors.latitude = "Latitude is required";
    else if (
      isNaN(formData.latitude) ||
      formData.latitude < -90 ||
      formData.latitude > 90
    )
      newErrors.latitude = "Invalid Latitude";
    if (formData.longitude === null)
      newErrors.longitude = "Longitude is required";
    else if (
      isNaN(formData.longitude) ||
      formData.longitude < -180 ||
      formData.longitude > 180
    )
      newErrors.longitude = "Invalid Longitude";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/register",
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
        height: "100vh",
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
          height: "80vh",
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
                name="fullName"
                placeholder="Enter your Full Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                error={!!errors.fullName}
                helperText={errors.fullName}
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
                name="mobileNo"
                placeholder="Enter your Mobile Number"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.mobileNo}
                onChange={handleInputChange}
                required
                error={!!errors.mobileNo}
                helperText={errors.mobileNo}
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
                name="latitude"
                placeholder="Enter Latitude"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.latitude}
                onChange={handleInputChange}
                required
                error={!!errors.latitude}
                helperText={errors.latitude}
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
                name="longitude"
                placeholder="Enter Longitude"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.longitude}
                onChange={handleInputChange}
                required
                error={!!errors.longitude}
                helperText={errors.longitude}
                InputProps={{
                  startAdornment: (
                    <PersonIcon sx={{ color: "black", marginRight: "10px" }} />
                  ),
                  sx: { borderRadius: "20px", backgroundColor: "white" },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleOpenMapDialog}
                sx={{
                  backgroundColor: "#20B486",
                  "&:hover": {
                    backgroundColor: "#1A946D ",
                  },
                }}
              >
                Open Map
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
                backgroundColor: "#1A946D ",
              },
            }}
          >
            Register
          </Button>
        </form>
      </div>
      <Dialog
        open={openMapDialog}
        onClose={handleCloseMapDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Select Location on Map</DialogTitle>
        <DialogContent>
          <MapWithGeocoder onLocationSelect={handleLocationSelect} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMapDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseMapDialog} color="primary">
            Select
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UserRegister;
