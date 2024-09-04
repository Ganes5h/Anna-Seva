// // import React, { useState } from "react";
// // import backGroundImage from "../../Images/BackgroundImage.svg";
// // import {
// //   Button,
// //   Box,
// //   Grid,
// //   TextField,
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions,
// // } from "@mui/material";
// // import EmailIcon from "@mui/icons-material/Email";
// // import LockIcon from "@mui/icons-material/Lock";
// // import BusinessIcon from "@mui/icons-material/Business";
// // import LocationCityIcon from "@mui/icons-material/LocationCity";
// // import PinDropIcon from "@mui/icons-material/PinDrop";
// // import PersonIcon from "@mui/icons-material/Person";
// // import PhoneIcon from "@mui/icons-material/Phone";
// // import { toast } from "sonner";
// // import logo from "../../Images/Logo.svg";
// // import { Link, useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import MapWithGeocoder from "./MapWithGeolocatorAuthentication"; // Import the Map component

// // function HotelRegister() {
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     password: "",
// //     address: "",
// //     city: "",
// //     state: "",
// //     pincode: "",
// //     contactPerson: "",
// //     contactNumber: "",
// //     locationType: "Point", // Default location type
// //     locationCoordinates: [null, null], // Default location coordinates
// //   });
// //   const [openMapDialog, setOpenMapDialog] = useState(false);
// //   const navigate = useNavigate();
// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prevData) => ({
// //       ...prevData,
// //       [name]: value,
// //     }));
// //   };

// //   const handleLocationSelect = ({ lat, lng }) => {
// //     setFormData((prevData) => ({
// //       ...prevData,
// //       locationCoordinates: [lat, lng],
// //     }));
// //   };

// //   const handleOpenMapDialog = () => {
// //     setOpenMapDialog(true);
// //   };

// //   const handleCloseMapDialog = () => {
// //     setOpenMapDialog(false);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       const response = await axios.post(
// //         "http://localhost:5000/api/hotel/register",
// //         formData
// //       );
// //       if (response.status === 201) {
// //         toast.success("Registration Successful");
// //         navigate("/login");
// //         // Optionally redirect the user or clear the form here
// //       }
// //     } catch (error) {
// //       toast.error(
// //         `Registration failed: ${error.response?.data?.error || error.message}`
// //       );
// //     }
// //   };

// //   return (
// //     <div
// //       style={{
// //         backgroundImage: `url(${backGroundImage})`,
// //         // height: "120vh",
// //         width: "100%",
// //         backgroundSize: "cover",
// //         backgroundRepeat: "no-repeat",
// //       }}
// //     >
// //       <Box display="flex" justifyContent="flex-end">
// //         <Box
// //           width="100%"
// //           height="50px"
// //           borderRadius="50px"
// //           display="flex"
// //           alignItems="center"
// //           justifyContent="end"
// //           padding="10px"
// //         >
// //           <Link to="/register">
// //             <Button
// //               variant="contained"
// //               color="success"
// //               sx={{
// //                 borderRadius: "50px",
// //                 backgroundColor: "#20B486",
// //                 "&:hover": {
// //                   backgroundColor: "#1A946D ",
// //                 },
// //               }}
// //             >
// //               Register
// //             </Button>
// //           </Link>
// //         </Box>
// //       </Box>
// //       <div
// //         style={{
// //           display: "flex",
// //           alignItems: "center",
// //           justifyContent: "center",
// //           flexDirection: "column",
// //         }}
// //       >
// //         <div
// //           style={{
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "center",
// //           }}
// //         >
// //           <img src={logo} width={70} alt="logo" />
// //           <h1
// //             style={{
// //               color: "white",
// //               fontSize: "60px",
// //               paddingLeft: "40px",
// //               fontFamily: "Dancing Script",
// //               fontOpticalSizing: "auto",
// //             }}
// //           >
// //             Anna Seva
// //           </h1>
// //         </div>
// //         <form
// //           style={{
// //             maxWidth: "600px",
// //             padding: "20px",
// //             border: "1px solid white",
// //             borderRadius: "10px",
// //           }}
// //           onSubmit={handleSubmit}
// //         >
// //           <Grid container spacing={2}>
// //             <Grid item xs={12} sm={6}>
// //               <TextField
// //                 name="name"
// //                 placeholder="Enter your Hotel Name"
// //                 variant="outlined"
// //                 fullWidth
// //                 margin="normal"
// //                 value={formData.name}
// //                 onChange={handleInputChange}
// //                 required
// //                 InputProps={{
// //                   startAdornment: (
// //                     <BusinessIcon
// //                       sx={{ color: "black", marginRight: "10px" }}
// //                     />
// //                   ),
// //                   sx: { borderRadius: "20px", backgroundColor: "white" },
// //                 }}
// //               />
// //             </Grid>
// //             <Grid item xs={12} sm={6}>
// //               <TextField
// //                 name="email"
// //                 placeholder="Enter your Email"
// //                 variant="outlined"
// //                 fullWidth
// //                 margin="normal"
// //                 value={formData.email}
// //                 onChange={handleInputChange}
// //                 required
// //                 InputProps={{
// //                   startAdornment: (
// //                     <EmailIcon sx={{ color: "black", marginRight: "10px" }} />
// //                   ),
// //                   sx: { borderRadius: "20px", backgroundColor: "white" },
// //                 }}
// //               />
// //             </Grid>
// //             <Grid item xs={12} sm={6}>
// //               <TextField
// //                 name="password"
// //                 placeholder="Enter your Password"
// //                 type="password"
// //                 variant="outlined"
// //                 fullWidth
// //                 margin="normal"
// //                 value={formData.password}
// //                 onChange={handleInputChange}
// //                 required
// //                 InputProps={{
// //                   startAdornment: (
// //                     <LockIcon sx={{ color: "black", marginRight: "10px" }} />
// //                   ),
// //                   sx: { borderRadius: "20px", backgroundColor: "white" },
// //                 }}
// //               />
// //             </Grid>
// //             <Grid item xs={12} sm={6}>
// //               <TextField
// //                 name="address"
// //                 placeholder="Enter your Address"
// //                 variant="outlined"
// //                 fullWidth
// //                 margin="normal"
// //                 value={formData.address}
// //                 onChange={handleInputChange}
// //                 required
// //                 InputProps={{
// //                   startAdornment: (
// //                     <LocationCityIcon
// //                       sx={{ color: "black", marginRight: "10px" }}
// //                     />
// //                   ),
// //                   sx: { borderRadius: "20px", backgroundColor: "white" },
// //                 }}
// //               />
// //             </Grid>
// //             <Grid item xs={12} sm={6}>
// //               <TextField
// //                 name="city"
// //                 placeholder="Enter your City"
// //                 variant="outlined"
// //                 fullWidth
// //                 margin="normal"
// //                 value={formData.city}
// //                 onChange={handleInputChange}
// //                 required
// //                 InputProps={{
// //                   startAdornment: (
// //                     <LocationCityIcon
// //                       sx={{ color: "black", marginRight: "10px" }}
// //                     />
// //                   ),
// //                   sx: { borderRadius: "20px", backgroundColor: "white" },
// //                 }}
// //               />
// //             </Grid>
// //             <Grid item xs={12} sm={6}>
// //               <TextField
// //                 name="state"
// //                 placeholder="Enter your State"
// //                 variant="outlined"
// //                 fullWidth
// //                 margin="normal"
// //                 value={formData.state}
// //                 onChange={handleInputChange}
// //                 required
// //                 InputProps={{
// //                   startAdornment: (
// //                     <LocationCityIcon
// //                       sx={{ color: "black", marginRight: "10px" }}
// //                     />
// //                   ),
// //                   sx: { borderRadius: "20px", backgroundColor: "white" },
// //                 }}
// //               />
// //             </Grid>
// //             <Grid item xs={12} sm={6}>
// //               <TextField
// //                 name="pincode"
// //                 placeholder="Enter your Pincode"
// //                 variant="outlined"
// //                 fullWidth
// //                 margin="normal"
// //                 value={formData.pincode}
// //                 onChange={handleInputChange}
// //                 required
// //                 InputProps={{
// //                   startAdornment: (
// //                     <PinDropIcon sx={{ color: "black", marginRight: "10px" }} />
// //                   ),
// //                   sx: { borderRadius: "20px", backgroundColor: "white" },
// //                 }}
// //               />
// //             </Grid>
// //             <Grid item xs={12} sm={6}>
// //               <TextField
// //                 name="contactPerson"
// //                 placeholder="Enter Contact Person"
// //                 variant="outlined"
// //                 fullWidth
// //                 margin="normal"
// //                 value={formData.contactPerson}
// //                 onChange={handleInputChange}
// //                 required
// //                 InputProps={{
// //                   startAdornment: (
// //                     <PersonIcon sx={{ color: "black", marginRight: "10px" }} />
// //                   ),
// //                   sx: { borderRadius: "20px", backgroundColor: "white" },
// //                 }}
// //               />
// //             </Grid>
// //             <Grid item xs={12}>
// //               <TextField
// //                 name="contactNumber"
// //                 placeholder="Enter Contact Number"
// //                 variant="outlined"
// //                 fullWidth
// //                 margin="normal"
// //                 value={formData.contactNumber}
// //                 onChange={handleInputChange}
// //                 required
// //                 InputProps={{
// //                   startAdornment: (
// //                     <PhoneIcon sx={{ color: "black", marginRight: "10px" }} />
// //                   ),
// //                   sx: { borderRadius: "20px", backgroundColor: "white" },
// //                 }}
// //               />
// //             </Grid>
// //             <Grid item xs={12}>
// //               {/* Map component to select latitude and longitude */}

// //               <TextField
// //                 name="latitude"
// //                 // label="Latitude"
// //                 variant="outlined"
// //                 fullWidth
// //                 placeholder="Enter Latitude"
// //                 margin="normal"
// //                 value={formData.locationCoordinates[0]}
// //                 InputProps={{
// //                   startAdornment: (
// //                     <PersonIcon sx={{ color: "black", marginRight: "10px" }} />
// //                   ),
// //                   sx: { borderRadius: "20px", backgroundColor: "white" },
// //                 }}
// //               />
// //               <TextField
// //                 name="longitude"
// //                 // label="Longitude"
// //                 variant="outlined"
// //                 placeholder="Enter Logitude"
// //                 fullWidth
// //                 margin="normal"
// //                 value={formData.locationCoordinates[1]}
// //                 InputProps={{
// //                   startAdornment: (
// //                     <PersonIcon sx={{ color: "black", marginRight: "10px" }} />
// //                   ),
// //                   sx: { borderRadius: "20px", backgroundColor: "white" },
// //                 }}
// //               />
// //               <Grid item xs={12}>
// //                 <Button
// //                   variant="contained"
// //                   color="primary"
// //                   fullWidth
// //                   onClick={handleOpenMapDialog} // Open Map button
// //                   sx={{
// //                     backgroundColor: "#20B486",
// //                     "&:hover": {
// //                       backgroundColor: "#1A946D ",
// //                     },
// //                   }}
// //                 >
// //                   Open Map
// //                 </Button>
// //               </Grid>
// //               <Dialog
// //                 open={openMapDialog}
// //                 onClose={handleCloseMapDialog}
// //                 maxWidth="md"
// //                 fullWidth
// //               >
// //                 <DialogTitle>Select Location on Map</DialogTitle>
// //                 <DialogContent>
// //                   <MapWithGeocoder onLocationSelect={handleLocationSelect} />
// //                 </DialogContent>
// //                 <DialogActions>
// //                   <Button onClick={handleCloseMapDialog} color="primary">
// //                     Cancel
// //                   </Button>
// //                   <Button onClick={handleCloseMapDialog} color="primary">
// //                     Select
// //                   </Button>
// //                 </DialogActions>
// //               </Dialog>
// //             </Grid>
// //           </Grid>
// //           <p
// //             style={{
// //               color: "white",
// //               alignItems: "center",
// //               textAlign: "center",
// //               fontSize: "12px",
// //               padding: "10px",
// //             }}
// //           >
// //             By signing up to Anna Seva, you agree to our Terms and Privacy
// //             Policy.
// //           </p>
// //           <Button
// //             type="submit"
// //             variant="contained"
// //             color="success"
// //             fullWidth
// //             sx={{
// //               mt: 2,
// //               height: "50px",
// //               borderRadius: "20px",
// //               backgroundColor: "#20B486",
// //               "&:hover": {
// //                 backgroundColor: "#1A946D ",
// //               },
// //             }}
// //           >
// //             Register
// //           </Button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// // export default HotelRegister;

// import React, { useState } from "react";
// import backGroundImage from "../../Images/BackgroundImage.svg";
// import {
//   Button,
//   Box,
//   Grid,
//   TextField,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import EmailIcon from "@mui/icons-material/Email";
// import LockIcon from "@mui/icons-material/Lock";
// import BusinessIcon from "@mui/icons-material/Business";
// import LocationCityIcon from "@mui/icons-material/LocationCity";
// import PinDropIcon from "@mui/icons-material/PinDrop";
// import PersonIcon from "@mui/icons-material/Person";
// import PhoneIcon from "@mui/icons-material/Phone";
// import { toast } from "sonner";
// import logo from "../../Images/Logo.svg";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import MapWithGeocoder from "./MapWithGeolocatorAuthentication"; // Import the Map component

// function HotelRegister() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     address: "",
//     city: "",
//     state: "",
//     pincode: "",
//     contactPerson: "",
//     contactNumber: "",
//     locationType: "Point", // Default location type
//     locationCoordinates: [null, null], // Default location coordinates
//     kycDocuments: null,
//     kycDocuments: null,
//   });
//   const [openMapDialog, setOpenMapDialog] = useState(false);
//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files) {
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: files[0], // Only taking the first file if multiple are selected
//       }));
//     } else {
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: value,
//       }));
//     }
//   };

//   const handleLocationSelect = ({ lat, lng }) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       locationCoordinates: [lat, lng],
//     }));
//   };
//   const handleOpenMapDialog = () => {
//     setOpenMapDialog(true);
//   };

//   const handleCloseMapDialog = () => {
//     setOpenMapDialog(false);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formDataToSend = new FormData();
//       for (const key in formData) {
//         formDataToSend.append(key, formData[key]);
//       }

//       const response = await axios.post(
//         "http://localhost:5000/api/hotel/register",
//         formDataToSend
//       );

//       if (response.status === 201) {
//         toast.success("Registration Successful");
//         navigate("/login");
//         // Optionally redirect the user or clear the form here
//       }
//     } catch (error) {
//       toast.error(
//         `Registration failed: ${error.response?.data?.error || error.message}`
//       );
//     }
//   };

//   return (
//     <div
//       style={{
//         backgroundImage: `url(${backGroundImage})`,
//         // height: "120vh",
//         width: "100%",
//         backgroundSize: "cover",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       <Box display="flex" justifyContent="flex-end">
//         <Box
//           width="100%"
//           height="50px"
//           borderRadius="50px"
//           display="flex"
//           alignItems="center"
//           justifyContent="end"
//           padding="10px"
//         >
//           <Link to="/register">
//             <Button
//               variant="contained"
//               color="success"
//               sx={{
//                 borderRadius: "50px",
//                 backgroundColor: "#20B486",
//                 "&:hover": {
//                   backgroundColor: "#1A946D ",
//                 },
//               }}
//             >
//               Register
//             </Button>
//           </Link>
//         </Box>
//       </Box>
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           flexDirection: "column",
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <img src={logo} width={70} alt="logo" />
//           <h1
//             style={{
//               color: "white",
//               fontSize: "60px",
//               paddingLeft: "40px",
//               fontFamily: "Dancing Script",
//               fontOpticalSizing: "auto",
//             }}
//           >
//             Anna Seva
//           </h1>
//         </div>
//         <form
//           style={{
//             maxWidth: "600px",
//             padding: "20px",
//             border: "1px solid white",
//             borderRadius: "10px",
//           }}
//           onSubmit={handleSubmit}
//         >
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 name="name"
//                 placeholder="Enter your Hotel Name"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 required
//                 InputProps={{
//                   startAdornment: (
//                     <BusinessIcon
//                       sx={{ color: "black", marginRight: "10px" }}
//                     />
//                   ),
//                   sx: { borderRadius: "20px", backgroundColor: "white" },
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 name="email"
//                 placeholder="Enter your Email"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 required
//                 InputProps={{
//                   startAdornment: (
//                     <EmailIcon sx={{ color: "black", marginRight: "10px" }} />
//                   ),
//                   sx: { borderRadius: "20px", backgroundColor: "white" },
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 name="password"
//                 placeholder="Enter your Password"
//                 type="password"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 required
//                 InputProps={{
//                   startAdornment: (
//                     <LockIcon sx={{ color: "black", marginRight: "10px" }} />
//                   ),
//                   sx: { borderRadius: "20px", backgroundColor: "white" },
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 name="address"
//                 placeholder="Enter your Address"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 value={formData.address}
//                 onChange={handleInputChange}
//                 required
//                 InputProps={{
//                   startAdornment: (
//                     <LocationCityIcon
//                       sx={{ color: "black", marginRight: "10px" }}
//                     />
//                   ),
//                   sx: { borderRadius: "20px", backgroundColor: "white" },
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 name="city"
//                 placeholder="Enter your City"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 value={formData.city}
//                 onChange={handleInputChange}
//                 required
//                 InputProps={{
//                   startAdornment: (
//                     <LocationCityIcon
//                       sx={{ color: "black", marginRight: "10px" }}
//                     />
//                   ),
//                   sx: { borderRadius: "20px", backgroundColor: "white" },
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 name="state"
//                 placeholder="Enter your State"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 value={formData.state}
//                 onChange={handleInputChange}
//                 required
//                 InputProps={{
//                   startAdornment: (
//                     <LocationCityIcon
//                       sx={{ color: "black", marginRight: "10px" }}
//                     />
//                   ),
//                   sx: { borderRadius: "20px", backgroundColor: "white" },
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 name="pincode"
//                 placeholder="Enter your Pincode"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 value={formData.pincode}
//                 onChange={handleInputChange}
//                 required
//                 InputProps={{
//                   startAdornment: (
//                     <PinDropIcon sx={{ color: "black", marginRight: "10px" }} />
//                   ),
//                   sx: { borderRadius: "20px", backgroundColor: "white" },
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 name="contactPerson"
//                 placeholder="Enter Contact Person"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 value={formData.contactPerson}
//                 onChange={handleInputChange}
//                 required
//                 InputProps={{
//                   startAdornment: (
//                     <PersonIcon sx={{ color: "black", marginRight: "10px" }} />
//                   ),
//                   sx: { borderRadius: "20px", backgroundColor: "white" },
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 name="contactNumber"
//                 placeholder="Enter Contact Number"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 value={formData.contactNumber}
//                 onChange={handleInputChange}
//                 required
//                 InputProps={{
//                   startAdornment: (
//                     <PhoneIcon sx={{ color: "black", marginRight: "10px" }} />
//                   ),
//                   sx: { borderRadius: "20px", backgroundColor: "white" },
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               {/* File Upload for Aadhar Image */}
//               <input
//                 type="file"
//                 accept="image/*"
//                 name="kycDocuments"
//                 onChange={handleInputChange}
//                 style={{ display: "none" }}
//                 id="upload-aadhar"
//               />
//               <label htmlFor="upload-aadhar">
//                 <Button
//                   variant="outlined"
//                   component="span"
//                   fullWidth
//                   sx={{
//                     borderRadius: "20px",
//                     marginTop: "10px",
//                     backgroundColor: "#20B486",
//                     "&:hover": {
//                       backgroundColor: "#1A946D ",
//                     },
//                   }}
//                 >
//                   Upload Aadhar Image
//                 </Button>
//               </label>
//             </Grid>
//             <Grid item xs={12}>
//               {/* File Upload for License Image */}
//               <input
//                 type="file"
//                 accept="image/*"
//                 name="kycDocuments"
//                 onChange={handleInputChange}
//                 style={{ display: "none" }}
//                 id="upload-license"
//               />
//               <label htmlFor="upload-license">
//                 <Button
//                   variant="outlined"
//                   component="span"
//                   fullWidth
//                   sx={{
//                     borderRadius: "20px",
//                     marginTop: "10px",
//                     backgroundColor: "#20B486",
//                     "&:hover": {
//                       backgroundColor: "#1A946D ",
//                     },
//                   }}
//                 >
//                   Upload License Image
//                 </Button>
//               </label>
//             </Grid>
//             <Grid item xs={12}>
//               {/* Map component to select latitude and longitude */}
//               <TextField
//                 name="latitude"
//                 // label="Latitude"
//                 variant="outlined"
//                 fullWidth
//                 placeholder="Enter Latitude"
//                 margin="normal"
//                 value={formData.locationCoordinates[0]}
//                 InputProps={{
//                   startAdornment: (
//                     <PersonIcon sx={{ color: "black", marginRight: "10px" }} />
//                   ),
//                   sx: { borderRadius: "20px", backgroundColor: "white" },
//                 }}
//               />
//               <TextField
//                 name="longitude"
//                 // label="Longitude"
//                 variant="outlined"
//                 placeholder="Enter Longitude"
//                 fullWidth
//                 margin="normal"
//                 value={formData.locationCoordinates[1]}
//                 InputProps={{
//                   startAdornment: (
//                     <PersonIcon sx={{ color: "black", marginRight: "10px" }} />
//                   ),
//                   sx: { borderRadius: "20px", backgroundColor: "white" },
//                 }}
//               />
//               <Grid item xs={12}>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   fullWidth
//                   onClick={handleOpenMapDialog} // Open Map button
//                   sx={{
//                     backgroundColor: "#20B486",
//                     "&:hover": {
//                       backgroundColor: "#1A946D ",
//                     },
//                   }}
//                 >
//                   Open Map
//                 </Button>
//               </Grid>
//               <Dialog
//                 open={openMapDialog}
//                 onClose={handleCloseMapDialog}
//                 maxWidth="md"
//                 fullWidth
//               >
//                 <DialogTitle>Select Location on Map</DialogTitle>
//                 <DialogContent>
//                   <MapWithGeocoder onLocationSelect={handleLocationSelect} />
//                 </DialogContent>
//                 <DialogActions>
//                   <Button onClick={handleCloseMapDialog} color="primary">
//                     Cancel
//                   </Button>
//                   <Button onClick={handleCloseMapDialog} color="primary">
//                     Select
//                   </Button>
//                 </DialogActions>
//               </Dialog>
//             </Grid>
//           </Grid>
//           <p
//             style={{
//               color: "white",
//               alignItems: "center",
//               textAlign: "center",
//               fontSize: "12px",
//               padding: "10px",
//             }}
//           >
//             By signing up to Anna Seva, you agree to our Terms and Privacy
//             Policy.
//           </p>
//           <Button
//             type="submit"
//             variant="contained"
//             color="success"
//             fullWidth
//             sx={{
//               mt: 2,
//               height: "50px",
//               borderRadius: "20px",
//               backgroundColor: "#20B486",
//               "&:hover": {
//                 backgroundColor: "#1A946D ",
//               },
//             }}
//           >
//             Register
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Hotelimport React, { useState, useRef } from "react";

import React, { useState, useRef } from "react";
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
  Checkbox,
  FormControlLabel,
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
import SignatureCanvas from "react-signature-canvas";

function HotelRegister() {
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
    termsAccepted: false,
  });
  const [kycDocuments, setKycDocuments] = useState([]);
  const [signatureImage, setSignatureImage] = useState(null);
  const [openMapDialog, setOpenMapDialog] = useState(false);
  const [errors, setErrors] = useState({});
  const sigCanvas = useRef({});
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

  const handleKycDocumentsChange = (e) => {
    setKycDocuments(e.target.files);
  };

  const handleSignatureClear = () => {
    sigCanvas.current.clear();
  };

  const handleTermsChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      termsAccepted: e.target.checked,
    }));
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
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const signature = sigCanvas.current
      .getTrimmedCanvas()
      .toDataURL("image/png");
    setSignatureImage(signature);

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
    Array.from(kycDocuments).forEach((file) => {
      formDataToSend.append("kycDocuments", file);
    });
    formDataToSend.append("signatureImage", signature);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/hotel/register",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        toast.success("Hotel Registration Successful");
        navigate("/login"); // Redirect to login or any other route after successful registration
      }
    } catch (error) {
      toast.error(
        `Hotel registration failed: ${
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
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                onClick={handleOpenMapDialog}
                sx={{ width: "100%", marginTop: "16px" }}
              >
                Select Location on Map
              </Button>
              {errors.locationCoordinates && (
                <div style={{ color: "red" }}>{errors.locationCoordinates}</div>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <label style={{ color: "white" }}>Choose Aadhaar and PAN</label>
              <input
                type="file"
                name="kycDocuments"
                onChange={handleKycDocumentsChange}
                multiple
                style={{ color: "white" }}
              />
              {errors.kycDocuments && (
                <div style={{ color: "white" }}>{errors.kycDocuments}</div>
              )}
            </Grid>

            <Grid item xs={12}>
              <Box
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  padding: "10px",
                  borderRadius: "10px",
                  border: "1px solid #000",
                  height: "300px",
                  overflowY: "auto",
                }}
              >
                <p
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "16px",
                    textAlign: "justify",
                    lineHeight: "1.5",
                  }}
                >
                  Terms of Service and Data Usage Agreement for Anna Seva
                  Purpose This agreement outlines the terms and conditions for
                  participation in the Anna Seva food donation program.
                </p>
                <ul
                  style={{
                    listStyleType: "disc",
                    marginLeft: "20px",
                    color: "black",
                    fontSize: "16px",
                  }}
                >
                  <li>
                    Compliance with Regulations 2.1 The Hotel agrees to comply
                    with all applicable food safety regulations, including but
                    not limited to the Food Safety and Standards (Recovery and
                    distribution of surplus food) Regulations, 2017. 2.2 The
                    Hotel confirms it possesses a valid food safety license
                    under the FSS Act, 2006.
                  </li>
                  <li>
                    PFood Donation Guidelines 3.1 The Hotel will only donate
                    surplus food that is safe for human consumption. 3.2 All
                    donated food will be properly labeled, including name,
                    source, preparation date, and expiration date. 3.3 The Hotel
                    will ensure proper storage and handling of surplus food
                    prior to donation.
                  </li>
                  <li>
                    Use of Platform 4.1 The Hotel agrees to use Anna Seva solely
                    for the purpose of facilitating food donations. 4.2 The
                    Hotel will not misuse the platform or attempt to circumvent
                    its intended functionality.
                  </li>
                  <li>
                    Record Keeping 5.1 The Hotel will maintain accurate records
                    of all donations made through the platform. 5.2 These
                    records will be made available to Anna Seva or relevant
                    authorities upon request.
                  </li>
                  <li>
                    Liability 6.1 The Hotel acknowledges that it is donating
                    food in good faith and is protected from liability as per
                    applicable laws. 6.2 The Hotel agrees to indemnify and hold
                    harmless Anna Seva from any claims arising from the Hotel's
                    use of the service.
                  </li>
                  <li>
                    Data Privacy 7.1 The Hotel consents to the collection and
                    processing of its data as necessary for the operation of
                    Anna Seva. 7.2 Anna Seva commits to protecting the Hotel's
                    data in accordance with applicable data protection laws.
                    Termination 8.1 Either party may terminate this agreement
                    with written notice. 8.2 Anna Seva reserves the right to
                    suspend or terminate the Hotel's access in case of violation
                    of these terms.
                  </li>
                  <li>
                    Amendments 9.1 Anna Seva may amend these terms from time to
                    time, with notice provided to the Hotel.
                  </li>
                </ul>
                <p
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "16px",
                    textAlign: "justify",
                    lineHeight: "1.5",
                  }}
                >
                  By digitally signing below, you confirm that you have read,
                  understood, and agree to be bound by these terms and
                  conditions.
                </p>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.termsAccepted}
                      onChange={handleTermsChange}
                    />
                  }
                  label="I agree to the Terms of Service and Data Usage Agreement for 'Anna Seva'."
                  sx={{ color: "black" }}
                />
                {errors.termsAccepted && (
                  <p style={{ color: "red" }}>{errors.termsAccepted}</p>
                )}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <div style={{ border: "1px solid black", padding: "10px" }}>
                <SignatureCanvas
                  ref={sigCanvas}
                  penColor="black"
                  canvasProps={{
                    width: 500,
                    height: 200,
                    className: "sigCanvas",
                  }}
                  backgroundColor="white"
                />
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleSignatureClear}
                >
                  Clear Signature
                </Button>
              </div>
              {errors.signature && (
                <div style={{ color: "red" }}>{errors.signature}</div>
              )}
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ width: "100%", borderRadius: "20px" }}
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>

      <Dialog
        open={openMapDialog}
        onClose={handleCloseMapDialog}
        maxWidth="lg"
        fullWidth
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

export default HotelRegister;
