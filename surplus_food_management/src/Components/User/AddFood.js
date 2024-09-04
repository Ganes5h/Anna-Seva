import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  MenuItem,
  Button,
  Typography,
  Box,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import {
  FoodBank,
  Category,
  CalendarToday,
  LocationOn,
  Person,
  Image,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import MapWithGeocoder from "./MapWithGeocoder";
import { toast } from "sonner";

const foodTypes = [
  "Vegetables",
  "Fruits",
  "Dairy",
  "Meat",
  "Grains",
  "Prepared",
];

const idealForOptions = [
  { value: "Adults", label: "Adults" },
  { value: "Children", label: "Children" },
  { value: "Elderly", label: "Elderly" },
  { value: "Families", label: "Families" },
  { value: "Food Banks", label: "Food Banks" },
  { value: "Homeless Shelters", label: "Homeless Shelters" },
];

const AddFood = () => {
  const [foodName, setFoodName] = useState("");
  const [foodType, setFoodType] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expiry, setExpiry] = useState("");
  const [idealFor, setIdealFor] = useState("");
  const [availableAt, setAvailableAt] = useState("");
  const [transportation, setTransportation] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [pickupInstructions, setPickupInstructions] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [image, setImage] = useState(null);
  const [open, setOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleLocationSelect = ({ lat, lng }) => {
    setLatitude(lat);
    setLongitude(lng);
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Number(quantity) < 10) {
      toast.error("Quantity must be minimum 10 people.");
      return;
    }

    const formData = new FormData();
    formData.append("type", "Food Donation");
    formData.append("name", foodName);
    formData.append("description", description);
    formData.append("category", foodType);
    formData.append("quantity", quantity);
    formData.append("expiry", expiry);
    formData.append("idealFor", idealFor);
    formData.append("availableAt", availableAt);
    formData.append("transportation", transportation);
    formData.append("contactPerson", contactPerson);
    formData.append("pickupInstructions", pickupInstructions);
    formData.append("location", JSON.stringify({ coordinates: [longitude, latitude] }));
    formData.append("uploadPhoto", image);

    try {
      const response = await axios.post(`http://localhost:5000/api/user/${user._id}/createDonation`, formData);

      // Handle success response
      toast.success("Donation added successfully");
      // Reset form fields
      setFoodName("");
      setFoodType("");
      setDescription("");
      setQuantity("");
      setExpiry("");
      setIdealFor("");
      setAvailableAt("");
      setTransportation("");
      setContactPerson("");
      setPickupInstructions("");
      setLatitude("");
      setLongitude("");
      setImage(null);
    } catch (error) {
      // Handle error response
      console.error("Error:", error);
      toast.error("Error adding donation. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "90%",
        margin: "auto",
        padding: 2,
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        className="text-center"
        gutterBottom
      >
        Add Surplus Food
      </Typography>
      <TextField
        label="Food Item Name"
        placeholder="Enter food item name"
        value={foodName}
        onChange={(e) => setFoodName(e.target.value)}
        fullWidth
        margin="normal"
        InputProps={{
          startAdornment: <FoodBank />,
        }}
      />
      <TextField
        select
        label="Food Item Type"
        value={foodType}
        onChange={(e) => setFoodType(e.target.value)}
        fullWidth
        margin="normal"
        InputProps={{
          startAdornment: <Category />,
        }}
      >
        {foodTypes.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Description about Food "
        placeholder="Enter Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
        InputProps={{
          startAdornment: <CalendarToday />,
        }}
      />
      <TextField
        label="Quantity of Item"
        placeholder="Enter quantity"
        value={quantity}
        type="number"
        onChange={(e) => setQuantity(e.target.value)}
        fullWidth
        margin="normal"
        InputProps={{
          startAdornment: <CalendarToday />,
        }}
      />
      <TextField
        label="Expiration Date"
        type="date"
        value={expiry}
        onChange={(e) => setExpiry(e.target.value)}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          startAdornment: <CalendarToday />,
        }}
      />
      <TextField
        select
        label="Ideal for"
        value={idealFor}
        onChange={(e) => setIdealFor(e.target.value)}
        fullWidth
        margin="normal"
        InputProps={{
          startAdornment: <FoodBank />,
        }}
      >
        {idealForOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Available At"
        type="date"
        placeholder="Enter date when it is available at"
        value={availableAt}
        onChange={(e) => setAvailableAt(e.target.value)}
        fullWidth
        margin="normal"
        InputProps={{
          startAdornment: <LocationOn />,
        }}
      />
      <TextField
        label="Transportation"
        placeholder="Enter transportation details"
        value={transportation}
        onChange={(e) => setTransportation(e.target.value)}
        fullWidth
        margin="normal"
        InputProps={{
          startAdornment: <LocationOn />,
        }}
      />
      <TextField
        label="Contact Person"
        placeholder="Enter contact person name"
        value={contactPerson}
        onChange={(e) => setContactPerson(e.target.value)}
        fullWidth
        margin="normal"
        InputProps={{
          startAdornment: <Person />,
        }}
      />
      <TextField
        label="Pickup Instructions"
        placeholder="Enter pickup instructions"
        value={pickupInstructions}
        onChange={(e) => setPickupInstructions(e.target.value)}
        fullWidth
        margin="normal"
        InputProps={{
          startAdornment: <LocationOn />,
        }}
      />
      <Box marginTop={2}>
        <Button variant="contained" component="label">
          <Image />
          Upload Image
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </Button>
      </Box>
      <MapWithGeocoder
        open={open}
        handleClose={() => setOpen(false)}
        handleLocationSelect={handleLocationSelect}
      />
      <Box marginTop={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpen(true)}
        >
          Select Location on Map
        </Button>
      </Box>
      <Box marginTop={2}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default AddFood;
