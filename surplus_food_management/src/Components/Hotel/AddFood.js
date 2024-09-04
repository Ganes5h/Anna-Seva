// import React, { useState } from "react";
// import {
//   TextField,
//   MenuItem,
//   Button,
//   Typography,
//   Box,
//   Avatar,
// } from "@mui/material";
// import {
//   FoodBank,
//   Category,
//   CalendarToday,
//   LocationOn,
//   Home,
//   Person,
//   Phone,
//   Image,
// } from "@mui/icons-material";
// import { useSelector } from "react-redux";
// const foodTypes = [
//   "Vegetables",
//   "Fruits",
//   "Dairy",
//   "Meat",
//   "Grains",
//   "Prepared",
// ];

// const AddFood = () => {
//   const [foodName, setFoodName] = useState("");
//   const [foodType, setFoodType] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [expirationDate, setExpirationDate] = useState("");
//   const [location, setLocation] = useState("");
//   const [address, setAddress] = useState("");
//   const [contactPerson, setContactPerson] = useState("");
//   const [contactNumber, setContactNumber] = useState("");
//   const [image, setImage] = useState(null);

//   const { user } = useSelector((state) => state.auth);
//   console.log(user._id);
//   const handleImageChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setImage(e.target.files[0]);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         maxWidth: "90%",
//         margin: "auto",
//         padding: 2,
//         // border: "1px solid black",
//         boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
//       }}
//     >
//       <Typography
//         variant="h4"
//         component="h1"
//         className="text-center"
//         gutterBottom
//       >
//         Add Surplus Food
//       </Typography>
//       <TextField
//         label="Food Item Name"
//         placeholder="Enter food item name"
//         value={foodName}
//         onChange={(e) => setFoodName(e.target.value)}
//         fullWidth
//         margin="normal"
//         InputProps={{
//           startAdornment: <FoodBank />,
//         }}
//       />
//       <TextField
//         select
//         label="Food Item Type"
//         value={foodType}
//         onChange={(e) => setFoodType(e.target.value)}
//         fullWidth
//         margin="normal"
//         InputProps={{
//           startAdornment: <Category />,
//         }}
//       >
//         {foodTypes.map((option) => (
//           <MenuItem key={option} value={option}>
//             {option}
//           </MenuItem>
//         ))}
//       </TextField>
//       <TextField
//         label="Quantity of Item"
//         placeholder="Enter quantity"
//         value={quantity}
//         onChange={(e) => setQuantity(e.target.value)}
//         fullWidth
//         margin="normal"
//         InputProps={{
//           startAdornment: <CalendarToday />,
//         }}
//       />
//       <TextField
//         label="Expiration Date"
//         type="date"
//         value={expirationDate}
//         onChange={(e) => setExpirationDate(e.target.value)}
//         fullWidth
//         margin="normal"
//         InputLabelProps={{
//           shrink: true,
//         }}
//         InputProps={{
//           startAdornment: <CalendarToday />,
//         }}
//       />
//       <TextField
//         label="Location"
//         placeholder="Enter location"
//         value={location}
//         onChange={(e) => setLocation(e.target.value)}
//         fullWidth
//         margin="normal"
//         InputProps={{
//           startAdornment: <LocationOn />,
//         }}
//       />
//       <TextField
//         label="Address"
//         placeholder="Enter address"
//         value={address}
//         onChange={(e) => setAddress(e.target.value)}
//         fullWidth
//         margin="normal"
//         InputProps={{
//           startAdornment: <Home />,
//         }}
//       />
//       <TextField
//         label="Contact Person"
//         placeholder="Enter contact person's name"
//         value={contactPerson}
//         onChange={(e) => setContactPerson(e.target.value)}
//         fullWidth
//         margin="normal"
//         InputProps={{
//           startAdornment: <Person />,
//         }}
//       />
//       <TextField
//         label="Contact Person's Mobile Number"
//         placeholder="Enter mobile number"
//         value={contactNumber}
//         onChange={(e) => setContactNumber(e.target.value)}
//         fullWidth
//         margin="normal"
//         InputProps={{
//           startAdornment: <Phone />,
//         }}
//       />
//       <div className="flex items-center justify-center w-full my-4">
//         <label
//           htmlFor="dropzone-file"
//           className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
//         >
//           <div className="flex flex-col items-center justify-center pt-5 pb-6">
//             <Image className="w-8 h-8 mb-4 text-gray-500" />
//             <p className="mb-2 text-sm text-gray-500">
//               <span className="font-semibold">Click to upload</span> or drag and
//               drop
//             </p>
//             <p className="text-xs text-gray-500">
//               SVG, PNG, JPG or GIF (MAX. 800x400px)
//             </p>
//           </div>
//           <input
//             id="dropzone-file"
//             type="file"
//             className="hidden"
//             onChange={handleImageChange}
//           />
//         </label>
//       </div>
//       {image && (
//         <Box display="flex" justifyContent="center" my={2}>
//           <Avatar
//             src={URL.createObjectURL(image)}
//             alt="Food Image"
//             sx={{ width: 100, height: 100 }}
//           />
//         </Box>
//       )}
//       <Button variant="contained" color="primary" fullWidth>
//         Submit
//       </Button>
//     </Box>
//   );
// };

// export default AddFood;

// import React, { useState } from "react";
// import {
//   TextField,
//   MenuItem,
//   Button,
//   Typography,
//   Box,
//   Avatar,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
// } from "@mui/material";
// import {
//   FoodBank,
//   Category,
//   CalendarToday,
//   LocationOn,
//   Home,
//   Person,
//   Phone,
//   Image,
// } from "@mui/icons-material";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import MapWithGeocoder from "./MapWithGeocoder"; // Import the map component
// import { toast } from "sonner";

// const foodTypes = [
//   "Vegetables",
//   "Fruits",
//   "Dairy",
//   "Meat",
//   "Grains",
//   "Prepared",
// ];

// const AddFood = () => {
//   const [foodName, setFoodName] = useState("");
//   const [foodType, setFoodType] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [expirationDate, setExpirationDate] = useState("");
//   const [location, setLocation] = useState([]);
//   const [address, setAddress] = useState("");
//   const [contactPerson, setContactPerson] = useState("");
//   const [contactNumber, setContactNumber] = useState("");
//   const [image, setImage] = useState(null);
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);
//   const [open, setOpen] = useState(false);

//   const { user } = useSelector((state) => state.auth);

//   const handleImageChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setImage(e.target.files[0]);
//     }
//   };

//   const handleLocationSelect = ({ lat, lng, address }) => {
//     setLatitude(lat);
//     setLongitude(lng);
//     setLocation(address || `${lat}, ${lng}`);
//     setAddress(address || "");
//     setOpen(false);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("foodName", foodName);
//     formData.append("foodType", foodType);
//     formData.append("quantity", quantity);
//     formData.append("expirationDate", expirationDate);
//     formData.append("location", location);
//     // formData.append("latitude", latitude);
//     // formData.append("longitude", longitude);
//     formData.append("address", address);
//     formData.append("contactPerson", contactPerson);
//     formData.append("contactNumber", contactNumber);
//     formData.append("image", image);

//     try {
//       console.log(formData);
//       const response = await axios.post(
//         `http://localhost:5000/api/donation/donations?id=${user._id}`,
//         formData
//       );
//       console.log("Success:", response.data);
//       toast.success("Donation is added");
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         maxWidth: "90%",
//         margin: "auto",
//         padding: 2,
//         boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
//       }}
//     >
//       <Typography
//         variant="h4"
//         component="h1"
//         className="text-center"
//         gutterBottom
//       >
//         Add Surplus Food
//       </Typography>
//       <TextField
//         label="Food Item Name"
//         placeholder="Enter food item name"
//         value={foodName}
//         onChange={(e) => setFoodName(e.target.value)}
//         fullWidth
//         margin="normal"
//         InputProps={{
//           startAdornment: <FoodBank />,
//         }}
//       />
//       <TextField
//         select
//         label="Food Item Type"
//         value={foodType}
//         onChange={(e) => setFoodType(e.target.value)}
//         fullWidth
//         margin="normal"
//         InputProps={{
//           startAdornment: <Category />,
//         }}
//       >
//         {foodTypes.map((option) => (
//           <MenuItem key={option} value={option}>
//             {option}
//           </MenuItem>
//         ))}
//       </TextField>
//       <TextField
//         label="Quantity of Item"
//         placeholder="Enter quantity"
//         value={quantity}
//         onChange={(e) => setQuantity(e.target.value)}
//         fullWidth
//         margin="normal"
//         InputProps={{
//           startAdornment: <CalendarToday />,
//         }}
//       />
//       <TextField
//         label="Expiration Date"
//         type="date"
//         value={expirationDate}
//         onChange={(e) => setExpirationDate(e.target.value)}
//         fullWidth
//         margin="normal"
//         InputLabelProps={{
//           shrink: true,
//         }}
//         InputProps={{
//           startAdornment: <CalendarToday />,
//         }}
//       />
//       <TextField
//         label="Location"
//         placeholder="Enter location"
//         value={location}
//         onChange={(e) => setLocation(e.target.value)}
//         fullWidth
//         margin="normal"
//         InputProps={{
//           startAdornment: <LocationOn />,
//         }}
//         onClick={() => setOpen(true)}
//       />
//       <TextField
//         label="Address"
//         placeholder="Enter address"
//         value={address}
//         onChange={(e) => setAddress(e.target.value)}
//         fullWidth
//         margin="normal"
//         InputProps={{
//           startAdornment: <Home />,
//         }}
//       />
//       <TextField
//         label="Contact Person"
//         placeholder="Enter contact person's name"
//         value={contactPerson}
//         onChange={(e) => setContactPerson(e.target.value)}
//         fullWidth
//         margin="normal"
//         InputProps={{
//           startAdornment: <Person />,
//         }}
//       />
//       <TextField
//         label="Contact Person's Mobile Number"
//         placeholder="Enter mobile number"
//         value={contactNumber}
//         onChange={(e) => setContactNumber(e.target.value)}
//         fullWidth
//         margin="normal"
//         InputProps={{
//           startAdornment: <Phone />,
//         }}
//       />
//       <div className="flex items-center justify-center w-full my-4">
//         <label
//           htmlFor="dropzone-file"
//           className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
//         >
//           <div className="flex flex-col items-center justify-center pt-5 pb-6">
//             <Image className="w-8 h-8 mb-4 text-gray-500" />
//             <p className="mb-2 text-sm text-gray-500">
//               <span className="font-semibold">Click to upload</span> or drag and
//               drop
//             </p>
//             <p className="text-xs text-gray-500">
//               SVG, PNG, JPG or GIF (MAX. 800x400px)
//             </p>
//           </div>
//           <input
//             id="dropzone-file"
//             type="file"
//             className="hidden"
//             onChange={handleImageChange}
//           />
//         </label>
//       </div>
//       {image && (
//         <Box display="flex" justifyContent="center" my={2}>
//           <Avatar
//             src={URL.createObjectURL(image)}
//             alt="Food Image"
//             sx={{ width: 100, height: 100 }}
//           />
//         </Box>
//       )}
//       <Button
//         variant="contained"
//         color="primary"
//         fullWidth
//         onClick={handleSubmit}
//       >
//         Submit
//       </Button>
//       <Dialog
//         open={open}
//         onClose={() => setOpen(false)}
//         maxWidth="md"
//         fullWidth
//       >
//         <DialogTitle>Select Location</DialogTitle>
//         <DialogContent>
//           <MapWithGeocoder onLocationSelect={handleLocationSelect} />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpen(false)} color="primary">
//             Cancel
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default AddFood;

// import React, { useState } from "react";
// import {
//   TextField,
//   MenuItem,
//   Button,
//   Typography,
//   Box,
//   Avatar,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
// } from "@mui/material";
// import {
//   FoodBank,
//   Category,
//   CalendarToday,
//   LocationOn,
//   Home,
//   Person,
//   Phone,
//   Image,
// } from "@mui/icons-material";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import MapWithGeocoder from "./MapWithGeocoder"; // Import the map component
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";

// const MySwal = withReactContent(Swal);

// const foodTypes = [
//   "Vegetables",
//   "Fruits",
//   "Dairy",
//   "Meat",
//   "Grains",
//   "Prepared",
// ];

// const AddFood = () => {
//   const [foodName, setFoodName] = useState("");
//   const [foodType, setFoodType] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [expiry, setExpiry] = useState("");
//   const [idealFor, setIdealFor] = useState("");
//   const [availableAt, setAvailableAt] = useState("");
//   const [transportation, setTransportation] = useState("");
//   const [contactPerson, setContactPerson] = useState("");
//   const [pickupInstructions, setPickupInstructions] = useState("");
//   const [locationType, setLocationType] = useState("");
//   const [locationCoordinates, setLocationCoordinates] = useState([]);
//   const [image, setImage] = useState(null);
//   const [open, setOpen] = useState(false);

//   const { user } = useSelector((state) => state.auth);

//   const handleImageChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setImage(e.target.files[0]);
//     }
//   };

//   const handleLocationSelect = ({ lat, lng, address }) => {
//     setLocationCoordinates([lat, lng]); // Store coordinates as an array
//     setOpen(false);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("type", "Food Donation");
//     formData.append("name", foodName);
//     formData.append("description", "");
//     formData.append("category", foodType);
//     formData.append("quantity", quantity);
//     formData.append("expiry", expiry);
//     formData.append("idealfor", idealFor);
//     formData.append("availableAt", availableAt);
//     formData.append("transportation", transportation);
//     formData.append("contactPerson", contactPerson);
//     formData.append("pickupInstructions", pickupInstructions);
//     formData.append("locationType", locationType);
//     formData.append("locationCoordinates", JSON.stringify(locationCoordinates)); // Convert array to string for backend handling
//     formData.append("uploadPhoto", image);

//     try {
//       const response = await axios.post(
//         `http://localhost:5000/api/donation/donations?id=${user._id}`,
//         formData
//       );

//       MySwal.fire({
//         title: "Success",
//         text: "Donation is added",
//         icon: "success",
//         confirmButtonText: "OK",
//       });
//     } catch (error) {
//       console.error("Error:", error);
//       MySwal.fire({
//         title: "Error",
//         text: "There was an error adding your donation. Please try again.",
//         icon: "error",
//         confirmButtonText: "OK",
//       });
//     }
//   };

//   return (
//     <Box
//       sx={{
//         maxWidth: "90%",
//         margin: "auto",
//         padding: 2,
//         boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
//       }}
//     >
//       <Typography
//         variant="h4"
//         component="h1"
//         className="text-center"
//         gutterBottom
//       >
//         Add Surplus Food
//       </Typography>
//       <TextField
//         label="Food Item Name"
//         placeholder="Enter food item name"
//         value={foodName}
//         onChange={(e) => setFoodName(e.target.value)}
//         fullWidth
//         margin="normal"
//         InputProps={{
//           startAdornment: <FoodBank />,
//         }}
//       />
//       <TextField
//         select
//         label="Food Item Type"
//         value={foodType}
//         onChange={(e) => setFoodType(e.target.value)}
//         fullWidth
//         margin="normal"
//         InputProps={{
//           startAdornment: <Category />,
//         }}
//       >
//         {foodTypes.map((option) => (
//           <MenuItem key={option} value={option}>
//             {option}
//           </MenuItem>
//         ))}
//       </TextField>
//       <TextField
//         label="Quantity of Item"
//         placeholder="Enter quantity"
//         value={quantity}
//         onChange={(e) => setQuantity(e.target.value)}
//         fullWidth
//         margin="normal"
//         InputProps={{
//           startAdornment: <CalendarToday />,
//         }}
//       />
//       <TextField
//         label="Expiration Date"
//         type="date"
//         value={expiry}
//         onChange={(e) => setExpiry(e.target.value)}
//         fullWidth
//         margin="normal"
//         InputLabelProps={{
//           shrink: true,
//         }}
//         InputProps={{
//           startAdornment: <CalendarToday />,
//         }}
//       />
//       <TextField
//         label="Ideal for"
//         placeholder="Enter who it's ideal for"
//         value={idealFor}
//         onChange={(e) => setIdealFor(e.target.value)}
//         fullWidth
//         margin="normal"
//         InputProps={{
//           startAdornment: <FoodBank />,
//         }}
//       />
//       <TextField
//         label="Available At"
//         placeholder="Enter where it's available"
//         value={availableAt}
//         onChange={(e) => setAvailableAt(e.target.value)}
//         fullWidth
//         margin="normal"
//         InputProps={{
//           startAdornment: <LocationOn />,
//         }}
//       />
//       <TextField
//         label="Transportation"
//         placeholder="Enter transportation details"
//         value={transportation}
//         onChange={(e) => setTransportation(e.target.value)}
//         fullWidth
//         margin="normal"
//         InputProps={{
//           startAdornment: <LocationOn />,
//         }}
//       />
//       <TextField
//         label="Contact Person"
//         placeholder="Enter contact person's name"
//         value={contactPerson}
//         onChange={(e) => setContactPerson(e.targetvalue)}
//         fullWidth
//         margin="normal"
//         InputProps={{
//           startAdornment: <Person />,
//         }}
//       />
//       <TextField
//         label="Pickup Instructions"
//         placeholder="Enter pickup instructions"
//         value={pickupInstructions}
//         onChange={(e) => setPickupInstructions(e.target.value)}
//         fullWidth
//         margin="normal"
//         InputProps={{
//           startAdornment: <LocationOn />,
//         }}
//       />
//       <TextField
//         label="Location Type"
//         placeholder="Enter location type"
//         value={locationType}
//         onChange={(e) => setLocationType(e.target.value)}
//         fullWidth
//         margin="normal"
//         InputProps={{
//           startAdornment: <LocationOn />,
//         }}
//       />
//       <TextField
//         label="Location Coordinates"
//         placeholder="Enter location coordinates"
//         value={locationCoordinates.join(',')} // Join array elements into string
//         onChange={(e) => setLocationCoordinates(e.target.value.split(','))} // Split string into array
//         fullWidth
//         margin="normal"
//         InputProps={{
//           startAdornment: <LocationOn />,
//         }}
//         onClick={() => setOpen(true)}
//       />
//       <div className="flex items-center justify-center w-full my-4">
//         <label
//           htmlFor="dropzone-file"
//           className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
//         >
//           <div className="flex flex-col items-center justify-center pt-5 pb-6">
//             <Image className="w-8 h-8 mb-4 text-gray-500" />
//             <p className="mb-2 text-sm text-gray-500">
//               <span className="font-semibold">Click to upload</span> or drag and
//               drop
//             </p>
//             <p className="text-xs text-gray-500">
//               SVG, PNG, JPG or GIF (MAX. 800x400px)
//             </p>
//           </div>
//           <input
//             id="dropzone-file"
//             type="file"
//             name="uploadPhoto" // Ensure this matches the multer configuration
//             className="hidden"
//             onChange={handleImageChange}
//           />
//         </label>
//       </div>
//       {image && (
//         <Box display="flex" justifyContent="center" my={2}>
//           <Avatar
//             src={URL.createObjectURL(image)}
//             alt="Food Image"
//             sx={{ width: 100, height: 100 }}
//           />
//         </Box>
//       )}
//       <Button
//         variant="contained"
//         color="primary"
//         fullWidth
//         onClick={handleSubmit}
//       >
//         Submit
//       </Button>
//       <Dialog
//         open={open}
//         onClose={() => setOpen(false)}
//         maxWidth="md"
//         fullWidth
//       >
//         <DialogTitle>Select Location</DialogTitle>
//         <DialogContent>
//           <MapWithGeocoder onLocationSelect={handleLocationSelect} />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpen(false)} color="primary">
//             Cancel
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default AddFood;

// WAVE.2.0
// import React, { useState } from "react";
// import {
//   TextField,
//   MenuItem,
//   Button,
//   Typography,
//   Box,
//   Avatar,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
// } from "@mui/material";
// import {
//   FoodBank,
//   Category,
//   CalendarToday,
//   LocationOn,
//   Home,
//   Person,
//   Phone,
//   Image,
// } from "@mui/icons-material";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import MapWithGeocoder from "./MapWithGeocoder"; // Import the map component
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// import { toast } from "sonner";

// const MySwal = withReactContent(Swal);

// const foodTypes = [
//   "Vegetables",
//   "Fruits",
//   "Dairy",
//   "Meat",
//   "Grains",
//   "Prepared",
// ];

// const idealForOptions = [
//   { value: "Adults", label: "Adults" },
//   { value: "Children", label: "Children" },
//   { value: "Elderly", label: "Elderly" },
//   { value: "Families", label: "Families" },
//   { value: "Food Banks", label: "Food Banks" },
//   { value: "Homeless Shelters", label: "Homeless Shelters" },
// ];
// const AddFood = () => {
//   const [foodName, setFoodName] = useState("");
//   const [foodType, setFoodType] = useState("");
//   const [description, setDescription] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [expiry, setExpiry] = useState("");
//   const [idealFor, setIdealFor] = useState("");
//   const [availableAt, setAvailableAt] = useState("");
//   const [transportation, setTransportation] = useState("");
//   const [contactPerson, setContactPerson] = useState("");
//   const [pickupInstructions, setPickupInstructions] = useState("");
//   const [locationType, setLocationType] = useState("Point");
//   const [latitude, setLatitude] = useState("");
//   const [longitude, setLongitude] = useState("");
//   const [image, setImage] = useState(null);
//   const [open, setOpen] = useState(false);

//   const { user } = useSelector((state) => state.auth);

//   const handleImageChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setImage(e.target.files[0]);
//     }
//   };

//   const handleLocationSelect = ({ lat, lng, address }) => {
//     setLatitude(lat); // Store latitude
//     setLongitude(lng); // Store longitude
//     setOpen(false);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     MySwal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, add it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         const formData = new FormData();
//         formData.append("type", "Food Donation");
//         formData.append("name", foodName);
//         formData.append("description", description);
//         formData.append("category", foodType);
//         formData.append("quantity", Number(quantity));
//         formData.append("expiry", expiry);
//         formData.append("idealfor", idealFor);
//         formData.append("availableAt", availableAt);
//         formData.append("transportation", transportation);
//         formData.append("contactPerson", contactPerson);
//         formData.append("pickupInstructions", pickupInstructions);
//         formData.append("locationType", "Point");
//         formData.append("locationCoordinates[0]", Number(latitude)); // Send longitude
//         formData.append("locationCoordinates[1]", Number(longitude)); // Send latitude
//         formData.append("uploadPhoto", image);

//         try {
//           const response = await axios.post(
//             `http://localhost:5000/api/donation/donations?id=${user._id}`,
//             formData
//           );

//           MySwal.fire({
//             title: "Success",
//             text: "Donation is added",
//             icon: "success",
//             confirmButtonText: "OK",
//           });
//           setFoodName("");
//           setFoodType("");
//           setDescription("");
//           setQuantity("");
//           setExpiry("");
//           setIdealFor("");
//           setAvailableAt("");
//           setTransportation("");
//           setContactPerson("");
//           setPickupInstructions("");
//           setLocationType("Point");
//           setLatitude(""); // Ensure you have a state for latitude
//           setLongitude(""); // Ensure you have a state for longitude
//           setImage(null);
//           toast.success("Donation added Successfullys");
//         } catch (error) {
//           console.error("Error:", error);
//           MySwal.fire({
//             title: "Error",
//             text: "There was an error adding your donation. Please try again.",
//             icon: "error",
//             confirmButtonText: "OK",
//           });
//         }
//       }
//     });
//   };

//   return (
//     <Box
//       sx={{
//         maxWidth: "90%",
//         margin: "auto",
//         padding: 2,
//         boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
//       }}
//     >
//       <Typography
//         variant="h4"
//         component="h1"
//         className="text-center"
//         gutterBottom
//       >
//         Add Surplus Food
//       </Typography>
//       <TextField
//         label="Food Item Name"
//         placeholder="Enter food item name"
//         value={foodName}
//         onChange={(e) => setFoodName(e.target.value)}
//         fullWidth
//         margin="normal"
//         InputProps={{
//           startAdornment: <FoodBank />,
//         }}
//       />
//       <TextField
//         select
//         label="Food Item Type"
//         value={foodType}
//         onChange={(e) => setFoodType(e.target.value)}
//         fullWidth
//         margin="normal"
//         InputProps={{
//           startAdornment: <Category />,
//         }}
//       >
//         {foodTypes.map((option) => (
//           <MenuItem key={option} value={option}>
//             {option}
//           </MenuItem>
//         ))}
//       </TextField>
//       <TextField
//         label="Description about Food "
//         placeholder="Enter Description"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         fullWidth
//         margin="normal"
//         InputProps={{
//           startAdornment: <CalendarToday />,
//         }}
//       />
//       <TextField
//         label="Quantity of Item"
//         placeholder="Enter quantity"
//         value={quantity}
//         type="number"
//         onChange={(e) => setQuantity(e.target.value)}
//         fullWidth
//         margin="normal"
//         InputProps={{
//           startAdornment: <CalendarToday />,
//         }}
//       />
//       <TextField
//         label="Expiration Date"
//         type="date"
//         value={expiry}
//         onChange={(e) => setExpiry(e.target.value)}
//         fullWidth
//         margin="normal"
//         InputLabelProps={{
//           shrink: true,
//         }}
//         InputProps={{
//           startAdornment: <CalendarToday />,
//         }}
//       />
//       <TextField
//         select
//         label="Ideal for"
//         value={idealFor}
//         onChange={(e) => setIdealFor(e.target.value)}
//         fullWidth
//         margin="normal"
//         InputProps={{
//           startAdornment: <FoodBank />,
//         }}
//       >
//         {idealForOptions.map((option) => (
//           <MenuItem key={option.value} value={option.value}>
//             {option.label}
//           </MenuItem>
//         ))}
//       </TextField>
//       <TextField
//         label="Available At"
//         type="date"
//         placeholder="Enter date when it is avalable at "
//         value={availableAt}
//         onChange={(e) => setAvailableAt(e.target.value)}
//         fullWidth
//         margin="normal"
//         InputProps={{
//           startAdornment: <LocationOn />,
//         }}
//       />
//       <TextField
//         label="Transportation"
//         placeholder="Enter transportation details"
//         value={transportation}
//         onChange={(e) => setTransportation(e.target.value)}
//         fullWidth
//         margin="normal"
//         InputProps={{
//           startAdornment: <LocationOn />,
//         }}
//       />
//       <TextField
//         label="Contact Person"
//         placeholder="Enter contact person's name"
//         value={contactPerson}
//         onChange={(e) => setContactPerson(e.target.value)}
//         fullWidth
//         margin="normal"
//         InputProps={{
//           startAdornment: <Person />,
//         }}
//       />
//       <TextField
//         label="Pickup Instructions"
//         placeholder="Enter pickup instructions"
//         value={pickupInstructions}
//         onChange={(e) => setPickupInstructions(e.target.value)}
//         fullWidth
//         margin="normal"
//         InputProps={{
//           startAdornment: <LocationOn />,
//         }}
//       />
//       {/* <TextField
//         label="Location Type"
//         placeholder="Enter location type"
//         value={locationType}
//         onChange={(e) => setLocationType(e.target.value)}
//         fullWidth
//         margin="normal"
//         InputProps={{
//           startAdornment: <LocationOn />,
//         }}
//       /> */}
//       <TextField
//         label="Latitude"
//         placeholder="Enter latitude"
//         type="number"
//         value={latitude}
//         onChange={(e) => setLatitude(e.target.value)}
//         fullWidth
//         margin="normal"
//         InputProps={{
//           startAdornment: <LocationOn />,
//         }}
//       />
//       <TextField
//         label="Longitude"
//         placeholder="Enter longitude"
//         type="number"
//         value={longitude}
//         onChange={(e) => setLongitude(e.target.value)}
//         fullWidth
//         margin="normal"
//         InputProps={{
//           startAdornment: <LocationOn />,
//         }}
//       />
//       <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
//         Select Latitude and Longitude from Map
//       </Button>
//       <div className="flex items-center justify-center w-full my-4">
//         <label
//           htmlFor="dropzone-file"
//           className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
//         >
//           <div className="flex flex-col items-center justify-center pt-5 pb-6">
//             <Image className="w-8 h-8 mb-4 text-gray-500" />
//             <p className="mb-2 text-sm text-gray-500">
//               <span className="font-semibold">Click to upload</span> or drag and
//               drop
//             </p>
//             <p className="text-xs text-gray-500">
//               SVG, PNG, JPG or GIF (MAX. 800x400px)
//             </p>
//           </div>
//           <input
//             id="dropzone-file"
//             type="file"
//             name="uploadPhoto" // Ensure this matches the multer configuration
//             className="hidden"
//             onChange={handleImageChange}
//           />
//         </label>
//       </div>
//       {image && (
//         <Box display="flex" justifyContent="center" my={2}>
//           <Avatar
//             src={URL.createObjectURL(image)}
//             alt="Food Image"
//             sx={{ width: 100, height: 100 }}
//           />
//         </Box>
//       )}
//       <Button
//         variant="contained"
//         color="primary"
//         fullWidth
//         onClick={handleSubmit}
//       >
//         Submit
//       </Button>
//       <Dialog
//         open={open}
//         onClose={() => setOpen(false)}
//         maxWidth="md"
//         fullWidth
//       >
//         <DialogTitle>Select Location</DialogTitle>
//         <DialogContent>
//           <MapWithGeocoder onLocationSelect={handleLocationSelect} />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpen(false)} color="primary">
//             Cancel
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default AddFood;

import React, { useState } from "react";
import Title from "../Title/Title";
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
  Grid, // Import Grid component
} from "@mui/material";
import {
  FoodBank,
  Category,
  CalendarToday,
  LocationOn,
  Home,
  Person,
  Phone,
  Image,
  Flare,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import axios from "axios";
import MapWithGeocoder from "./MapWithGeocoder"; // Import the map component
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { toast } from "sonner";

const MySwal = withReactContent(Swal);

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
  const [locationType, setLocationType] = useState("Point");
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

  const handleLocationSelect = ({ lat, lng, address }) => {
    setLatitude(lat); // Store latitude
    setLongitude(lng); // Store longitude
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, add it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append("type", "Food Donation");
        formData.append("name", foodName);
        formData.append("description", description);
        formData.append("category", foodType);
        formData.append("quantity", Number(quantity));
        formData.append("expiry", expiry);
        formData.append("idealfor", idealFor);
        formData.append("availableAt", availableAt);
        formData.append("transportation", transportation);
        formData.append("contactPerson", contactPerson);
        formData.append("pickupInstructions", pickupInstructions);
        formData.append("locationType", "Point");
        formData.append("locationCoordinates[0]", user.location.coordinates[0]); // Send longitude
        formData.append("locationCoordinates[1]", user.location.coordinates[1]); // Send latitude
        formData.append("uploadPhoto", image);

        try {
          const response = await axios.post(
            `http://annaseva.ajinkyatechnologies.in/api/donation/donations?id=${user._id}`,
            formData
          );

          MySwal.fire({
            title: "Success",
            text: "Donation is added",
            icon: "success",
            confirmButtonText: "OK",
          });
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
          setLocationType("Point");
          setLatitude(""); // Ensure you have a state for latitude
          setLongitude(""); // Ensure you have a state for longitude
          setImage(null);
          toast.success("Donation added Successfully");
        } catch (error) {
          console.error("Error:", error);
          MySwal.fire({
            title: "Error",
            text: "There was an error adding your donation. Please try again.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    });
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
      <Title title="Add Surplus Food"></Title>
      {/* <Typography
        variant="h4"
        component="h1"
        className="text-center"
        gutterBottom
      >
        Add Surplus Food
      </Typography> */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
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
        </Grid>
        <Grid item xs={12} sm={6}>
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
        </Grid>
        <Grid item xs={12} sm={6}>
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
        </Grid>
        <Grid item xs={12} sm={6}>
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
        </Grid>
        <Grid item xs={12} sm={6}>
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
        </Grid>
        <Grid item xs={12} sm={6}>
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
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Available At"
            type="date"
            placeholder="Enter date when it is avalable at "
            value={availableAt}
            onChange={(e) => setAvailableAt(e.target.value)}
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: <LocationOn />,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
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
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Contact Person"
            placeholder="Enter contact person's name"
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: <Person />,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
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
        </Grid>
        {/* <Grid item xs={12} sm={6}>
          <TextField
            label="Latitude"
            placeholder="Enter latitude"
            type="number"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: <LocationOn />,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Longitude"
            placeholder="Enter longitude"
            type="number"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: <LocationOn />,
            }}
          />
        </Grid> */}
      </Grid>
      {/* <Button
        variant="contained"
        color="primary"
        sx={{
          backgroundColor: "#F26E0D",
          "&:hover": {
            backgroundColor: "#C2570A ",
          },
        }}
        onClick={() => setOpen(true)}
      >
        Select Latitude and Longitude from Map
      </Button> */}
      <div className="flex items-center justify-center w-full my-4">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Image className="w-8 h-8 mb-4 text-gray-500" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            name="uploadPhoto" // Ensure this matches the multer configuration
            className="hidden"
            onChange={handleImageChange}
          />
        </label>
      </div>
      {image && (
        <Box display="flex" justifyContent="center" my={2}>
          <Avatar
            src={URL.createObjectURL(image)}
            alt="Food Image"
            sx={{ width: 100, height: 100 }}
          />
        </Box>
      )}
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          // fullWidth
          onClick={handleSubmit}
          sx={{
            borderRadius: "10px",
            width: "200px",
            backgroundColor: "#F26E0D",
            "&:hover": {
              backgroundColor: "#C2570A ",
            },
          }}
        >
          Submit
        </Button>
      </div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Select Location</DialogTitle>
        <DialogContent>
          <MapWithGeocoder onLocationSelect={handleLocationSelect} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddFood;
