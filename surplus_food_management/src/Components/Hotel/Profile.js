import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
} from "@mui/material";
import {
  Home,
  Business,
  Room,
  Person,
  Email,
  Lock,
  Phone,
  PhotoCamera,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import axios from "axios";

const hotelTypes = ["Veg", "Non-Veg", "Both"];

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [hotelName, setHotelName] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [hotelType, setHotelType] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [contactPerson, setContactPerson] = useState("");

  useEffect(() => {
    if (user) {
      setHotelName(user.name);
      setGstNumber(user.gstNumber || "");
      setHotelType(user.hotelType || "");
      setOwnerName(user.contactPerson);
      setEmail(user.email);
      setPassword(""); // Do not populate password for security reasons
      setLocation(user.address);
      setPostalCode(user.pincode);
      setPhoneNumber(user.contactNumber);
      setProfilePhoto(user.profilePhoto || "");
      setAddress(user.address);
      setCity(user.city);
      setState(user.state);
      setContactPerson(user.contactPerson);
    }
  }, [user]);

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedData = {
      name: hotelName,
      gstNumber,
      hotelType,
      contactPerson: ownerName,
      email,
      password,
      address: location,
      pincode: postalCode,
      contactNumber: phoneNumber,
      profilePhoto,
      city,
      state,
    };

    try {
      const response = await axios.put(
        `http://localhost:5000/api/hotel/${user._id}`,
        updatedData
      );
      console.log("Success:", response.data);
      setIsEditing(false); // Set editing mode to false after saving
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={3} xs={12}>
              <Stack spacing={2} sx={{ alignItems: "center" }}>
                <Avatar
                  src={profilePhoto}
                  sx={{ height: "200px", width: "200px" }}
                />
                <label htmlFor="upload-photo">
                  <input
                    style={{ display: "none" }}
                    id="upload-photo"
                    name="upload-photo"
                    type="file"
                    onChange={handlePhotoUpload}
                  />
                  <Button
                    color="primary"
                    variant="contained"
                    component="span"
                    startIcon={<PhotoCamera />}
                    style={{ backgroundColor: "#20B486" }}
                  >
                    Upload photo
                  </Button>
                </label>
              </Stack>
            </Grid>
            <Grid item md={9} xs={12}>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Hotel Name</InputLabel>
                    <OutlinedInput
                      value={hotelName}
                      onChange={(e) => setHotelName(e.target.value)}
                      label="Hotel Name"
                      startAdornment={<Home />}
                      disabled={!isEditing}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Hotel GST Number</InputLabel>
                    <OutlinedInput
                      value={gstNumber}
                      onChange={(e) => setGstNumber(e.target.value)}
                      label="Hotel GST Number"
                      startAdornment={<Business />}
                      disabled={!isEditing}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Hotel Type</InputLabel>
                    <Select
                      value={hotelType}
                      onChange={(e) => setHotelType(e.target.value)}
                      label="Hotel Type"
                      startAdornment={<Room />}
                      disabled={!isEditing}
                    >
                      {hotelTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Owner Name</InputLabel>
                    <OutlinedInput
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      label="Owner Name"
                      startAdornment={<Person />}
                      disabled={!isEditing}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Email</InputLabel>
                    <OutlinedInput
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      label="Email"
                      startAdornment={<Email />}
                      disabled={!isEditing}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Password</InputLabel>
                    <OutlinedInput
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      label="Password"
                      startAdornment={<Lock />}
                      disabled={!isEditing}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Location Address</InputLabel>
                    <OutlinedInput
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      label="Location Address"
                      startAdornment={<Home />}
                      disabled={!isEditing}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Postal Code</InputLabel>
                    <OutlinedInput
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      label="Postal Code"
                      startAdornment={<Room />}
                      disabled={!isEditing}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Phone Number</InputLabel>
                    <OutlinedInput
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      label="Phone Number"
                      startAdornment={<Phone />}
                      disabled={!isEditing}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Address</InputLabel>
                    <OutlinedInput
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      label="Address"
                      startAdornment={<Home />}
                      disabled={!isEditing}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>City</InputLabel>
                    <OutlinedInput
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      label="City"
                      startAdornment={<Room />}
                      disabled={!isEditing}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>State</InputLabel>
                    <OutlinedInput
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      label="State"
                      startAdornment={<Room />}
                      disabled={!isEditing}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          {!isEditing ? (
            <Button variant="contained" onClick={handleEdit}>
              Edit
            </Button>
          ) : (
            <Button variant="contained" type="submit">
              Save
            </Button>
          )}
        </CardActions>
      </Card>
    </form>
  );
};

export default Profile;
