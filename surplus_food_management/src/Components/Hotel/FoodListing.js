// import React, { useState, useEffect } from "react";
// import {
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   Button,
//   Grid,
//   Box,
//   Pagination,
//   Dialog,
//   DialogContent,
//   DialogActions,
//   Table,
//   TableBody,
//   TableRow,
//   TableCell,
// } from "@mui/material";
// import axios from "axios";
// import { useSelector } from "react-redux";

// const Donations = () => {
//   const { user } = useSelector((state) => state.auth);
//   const [donationData, setDonationData] = useState({ donations: [] });
//   const [page, setPage] = useState(1);
//   const [itemsPerPage] = useState(6);
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [selectedDonation, setSelectedDonation] = useState(null);

//   useEffect(() => {
//     const fetchDonations = async () => {
//       try {
//         const response = await axios.get(
//           `http://annaseva.ajinkyatechnologies.in/api/donation/donationsbyhotel?id=${user._id}`
//         );
//         if (Array.isArray(response.data)) {
//           setDonationData({ donations: response.data });
//         } else {
//           setDonationData({ donations: [] });
//         }
//         console.log(response.data);
//       } catch (error) {
//         console.error("Error fetching donations:", error);
//         setDonationData({ donations: [] });
//       }
//     };

//     fetchDonations();
//   }, [user._id]);

//   const handlePageChange = (event, value) => {
//     setPage(value);
//   };

//   const handleOpenDialog = (donation) => {
//     setSelectedDonation(donation);
//     setDialogOpen(true);
//   };

//   const handleCloseDialog = () => {
//     setDialogOpen(false);
//     setSelectedDonation(null);
//   };

//   // Pagination logic
//   const startIndex = (page - 1) * itemsPerPage;
//   const paginatedDonations = donationData.donations.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   return (
//     <Box sx={{ padding: 2 }}>
//       <Grid container spacing={2}>
//         {paginatedDonations.map((donation) => {
//           const uploadPhoto = donation.uploadPhoto;
//           const imageUrl =
//             uploadPhoto && uploadPhoto.includes("\\")
//               ? `http://annaseva.ajinkyatechnologies.in/donations/${uploadPhoto
//                   .split("\\")
//                   .pop()}`
//               : uploadPhoto
//               ? `http://annaseva.ajinkyatechnologies.in/donations/${uploadPhoto}`
//               : null;

//           console.log("Image URL:", imageUrl);

//           return (
//             <Grid item xs={12} sm={6} md={4} key={donation._id}>
//               <Card
//                 sx={{
//                   height: "100%",
//                   display: "flex",
//                   flexDirection: "column",
//                 }}
//               >
//                 <CardContent>
//                   <Typography variant="h6">{donation.name}</Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     {donation.category}
//                   </Typography>
//                 </CardContent>
//                 {imageUrl && (
//                   <CardMedia
//                     component="img"
//                     sx={{
//                       height: 200,
//                       objectFit: "cover",
//                     }}
//                     image={imageUrl}
//                     alt={donation.name}
//                   />
//                 )}
//                 <CardContent sx={{ flexGrow: 1 }}>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     fullWidth
//                     onClick={() => handleOpenDialog(donation)}
//                   >
//                     Donation Details
//                   </Button>
//                   <Button
//                     variant="outlined"
//                     color="secondary"
//                     fullWidth
//                     sx={{ mt: 1 }}
//                   >
//                     View Requests ({donation.requests.length})
//                   </Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//           );
//         })}
//       </Grid>
//       <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
//         <Pagination
//           count={Math.ceil(donationData.donations.length / itemsPerPage)}
//           page={page}
//           onChange={handlePageChange}
//           color="primary"
//         />
//       </Box>

// <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth>
//   <DialogContent>
//     {selectedDonation && (
//       <div>
//         <Typography variant="h6" gutterBottom sx={{ color: "#3f51b5" }}>
//           Donation Details
//         </Typography>
//         <Table>
//           <TableBody>
//             <TableRow>
//               <TableCell sx={{ fontWeight: "bold", color: "#673ab7" }}>
//                 Name:
//               </TableCell>
//               <TableCell>{selectedDonation.name}</TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell sx={{ fontWeight: "bold", color: "#e91e63" }}>
//                 Type:
//               </TableCell>
//               <TableCell>{selectedDonation.type}</TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell sx={{ fontWeight: "bold", color: "#2196f3" }}>
//                 Description:
//               </TableCell>
//               <TableCell>{selectedDonation.description}</TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell sx={{ fontWeight: "bold", color: "#4caf50" }}>
//                 Category:
//               </TableCell>
//               <TableCell>{selectedDonation.category}</TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell sx={{ fontWeight: "bold", color: "#ff9800" }}>
//                 Quantity:
//               </TableCell>
//               <TableCell>{selectedDonation.quantity}</TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell sx={{ fontWeight: "bold", color: "#f44336" }}>
//                 Expiry:
//               </TableCell>
//               <TableCell>{selectedDonation.expiry}</TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell sx={{ fontWeight: "bold", color: "#795548" }}>
//                 Ideal for:
//               </TableCell>
//               <TableCell>{selectedDonation.idealfor}</TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell sx={{ fontWeight: "bold", color: "#607d8b" }}>
//                 Available at:
//               </TableCell>
//               <TableCell>{selectedDonation.availableAt}</TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell sx={{ fontWeight: "bold", color: "#9c27b0" }}>
//                 Transportation:
//               </TableCell>
//               <TableCell>{selectedDonation.transportation}</TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell sx={{ fontWeight: "bold", color: "#00bcd4" }}>
//                 Contact Person:
//               </TableCell>
//               <TableCell>{selectedDonation.contactPerson}</TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell sx={{ fontWeight: "bold", color: "#ff5722" }}>
//                 Donation Status:
//               </TableCell>
//               <TableCell>{selectedDonation.donationStatus}</TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>
//       </div>
//     )}
//   </DialogContent>

//   <DialogActions>
//     <Button onClick={handleCloseDialog} color="primary">
//       Close
//     </Button>
//   </DialogActions>
// </Dialog>
//     </Box>
//   );
// };

// export default Donations;

// import React, { useState, useEffect } from "react";
// import {
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   Button,
//   Grid,
//   Box,
//   Pagination,
//   Dialog,
//   DialogContent,
//   DialogActions,
//   Table,
//   TableBody,
//   TableRow,
//   TableCell,
// } from "@mui/material";
// import axios from "axios";
// import { useSelector } from "react-redux";

// const Donations = () => {
//   const { user } = useSelector((state) => state.auth);
//   const [donationData, setDonationData] = useState({ donations: [] });
//   const [page, setPage] = useState(1);
//   const [itemsPerPage] = useState(6);
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [selectedDonation, setSelectedDonation] = useState(null);
//   const [requestDialogOpen, setRequestDialogOpen] = useState(false);
//   const [selectedDonationId, setSelectedDonationId] = useState(null);
//   const [ngoNames, setNgoNames] = useState([]);

//   useEffect(() => {
//     const fetchDonations = async () => {
//       try {
//         const response = await axios.get(
//           `http://annaseva.ajinkyatechnologies.in/api/donation/donationsbyhotel?id=${user._id}`
//         );
//         if (Array.isArray(response.data)) {
//           setDonationData({ donations: response.data });
//         } else {
//           setDonationData({ donations: [] });
//         }
//       } catch (error) {
//         console.error("Error fetching donations:", error);
//         setDonationData({ donations: [] });
//       }
//     };

//     fetchDonations();
//   }, [user._id]);

//   const handlePageChange = (event, value) => {
//     setPage(value);
//   };

//   const handleOpenDialog = (donation) => {
//     setSelectedDonation(donation);
//     setDialogOpen(true);
//   };

//   const handleCloseDialog = () => {
//     setDialogOpen(false);
//     setSelectedDonation(null);
//   };

//   const handleOpenRequestDialog = async (donationId) => {
//     try {
//       const response = await axios.get(
//         `http://annaseva.ajinkyatechnologies.in/api/donation/getNgoName?id=${donationId}`
//       );
//       const ngoNames = response.data.ngos.map((ngo) => ngo.name);
//       setNgoNames(ngoNames);
//       setSelectedDonationId(donationId);
//       setRequestDialogOpen(true);
//     } catch (error) {
//       console.error("Error fetching NGO names:", error);
//     }
//   };

//   const handleCloseRequestDialog = () => {
//     setRequestDialogOpen(false);
//     setSelectedDonationId(null);
//     setNgoNames([]);
//   };

//   const handleAcceptRequest = (requestId) => {
//     // Handle accept request logic here
//     console.log("Accept request:", requestId);
//   };

//   const handleRejectRequest = (requestId) => {
//     // Handle reject request logic here
//     console.log("Reject request:", requestId);
//   };

//   // Pagination logic
//   const startIndex = (page - 1) * itemsPerPage;
//   const paginatedDonations = donationData.donations.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   return (
//     <Box sx={{ padding: 2 }}>
//       <Grid container spacing={2}>
//         {paginatedDonations.map((donation) => {
//           const uploadPhoto = donation.uploadPhoto;
//           const imageUrl =
//             uploadPhoto && uploadPhoto.includes("\\")
//               ? `http://annaseva.ajinkyatechnologies.in/donations/${uploadPhoto
//                   .split("\\")
//                   .pop()}`
//               : uploadPhoto
//               ? `http://annaseva.ajinkyatechnologies.in/donations/${uploadPhoto}`
//               : null;

//           return (
//             <Grid item xs={12} sm={6} md={4} key={donation._id}>
//               <Card
//                 sx={{
//                   height: "100%",
//                   display: "flex",
//                   flexDirection: "column",
//                 }}
//               >
//                 <CardContent>
//                   <Typography variant="h6">{donation.name}</Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     {donation.category}
//                   </Typography>
//                 </CardContent>
//                 {imageUrl && (
//                   <CardMedia
//                     component="img"
//                     sx={{
//                       height: 200,
//                       objectFit: "cover",
//                     }}
//                     image={imageUrl}
//                     alt={donation.name}
//                   />
//                 )}
//                 <CardContent sx={{ flexGrow: 1 }}>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     fullWidth
//                     onClick={() => handleOpenDialog(donation)}
//                   >
//                     Donation Details
//                   </Button>
//                   <Button
//                     variant="outlined"
//                     color="secondary"
//                     fullWidth
//                     sx={{ mt: 1 }}
//                     onClick={() => handleOpenRequestDialog(donation._id)}
//                   >
//                     View Requests ({donation.requests.length})
//                   </Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//           );
//         })}
//       </Grid>
//       <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
//         <Pagination
//           count={Math.ceil(donationData.donations.length / itemsPerPage)}
//           page={page}
//           onChange={handlePageChange}
//           color="primary"
//         />
//       </Box>

//       <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth>
//         <DialogContent>
//           {selectedDonation && (
//             <div>
//               <Typography variant="h6" gutterBottom sx={{ color: "#3f51b5" }}>
//                 Donation Details
//               </Typography>
//               <Table>
//                 <TableBody>
//                   <TableRow>
//                     <TableCell sx={{ fontWeight: "bold", color: "#673ab7" }}>
//                       Name:
//                     </TableCell>
//                     <TableCell>{selectedDonation.name}</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell sx={{ fontWeight: "bold", color: "#e91e63" }}>
//                       Type:
//                     </TableCell>
//                     <TableCell>{selectedDonation.type}</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell sx={{ fontWeight: "bold", color: "#2196f3" }}>
//                       Description:
//                     </TableCell>
//                     <TableCell>{selectedDonation.description}</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell sx={{ fontWeight: "bold", color: "#4caf50" }}>
//                       Category:
//                     </TableCell>
//                     <TableCell>{selectedDonation.category}</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell sx={{ fontWeight: "bold", color: "#ff9800" }}>
//                       Quantity:
//                     </TableCell>
//                     <TableCell>{selectedDonation.quantity}</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell sx={{ fontWeight: "bold", color: "#f44336" }}>
//                       Expiry:
//                     </TableCell>
//                     <TableCell>{selectedDonation.expiry}</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell sx={{ fontWeight: "bold", color: "#795548" }}>
//                       Ideal for:
//                     </TableCell>
//                     <TableCell>{selectedDonation.idealfor}</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell sx={{ fontWeight: "bold", color: "#607d8b" }}>
//                       Available at:
//                     </TableCell>
//                     <TableCell>{selectedDonation.availableAt}</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell sx={{ fontWeight: "bold", color: "#9c27b0" }}>
//                       Transportation:
//                     </TableCell>
//                     <TableCell>{selectedDonation.transportation}</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell sx={{ fontWeight: "bold", color: "#00bcd4" }}>
//                       Contact Person:
//                     </TableCell>
//                     <TableCell>{selectedDonation.contactPerson}</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell sx={{ fontWeight: "bold", color: "#ff5722" }}>
//                       Donation Status:
//                     </TableCell>
//                     <TableCell>{selectedDonation.donationStatus}</TableCell>
//                   </TableRow>
//                 </TableBody>
//               </Table>
//             </div>
//           )}
//         </DialogContent>

//         <DialogActions>
//           <Button onClick={handleCloseDialog} color="primary">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Dialog
//         open={requestDialogOpen}
//         onClose={handleCloseRequestDialog}
//         fullWidth
//       >
//         <DialogContent>
//           <Typography variant="h6" gutterBottom>
//             Request Details
//           </Typography>
//           {ngoNames.length > 0 ? (
//             ngoNames.map((name, index) => (
//               <Box
//                 key={index}
//                 sx={{ display: "flex", alignItems: "center", mb: 2 }}
//               >
//                 <Typography variant="body1">{name}</Typography>
//                 <Box sx={{ ml: 2 }}>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={() => handleAcceptRequest(name)}
//                     sx={{ mr: 1 }}
//                   >
//                     Accept
//                   </Button>
//                   <Button
//                     variant="contained"
//                     color="secondary"
//                     onClick={() => handleRejectRequest(name)}
//                   >
//                     Reject
//                   </Button>
//                 </Box>
//               </Box>
//             ))
//           ) : (
//             <Typography variant="body1">No NGOs found</Typography>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseRequestDialog} color="primary">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default Donations;

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
  TableContainer,
  Paper,
  TableHead,
} from "@mui/material";
import Title from "../Title/Title";
import haversine from "haversine-distance";
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
  console.log(user.coordinates);
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get(
          `http://annaseva.ajinkyatechnologies.in/api/donation/donationsbyhotel?id=${user._id}`
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
        `http://annaseva.ajinkyatechnologies.in/api/donation/getNgoName?id=${donationId}`
      );
      const ngos = response.data.ngos;
      console.log(response.data, donationId);
      const ngoNamesWithDistance = ngos.map((ngo) => {
        const hotelCoords = {
          latitude: user.location.coordinates[0],
          longitude: user.location.coordinates[1],
        };
        const ngoCoords = {
          latitude: ngo.location.coordinates[0],
          longitude: ngo.location.coordinates[1],
        };
        const distance = haversine(hotelCoords, ngoCoords) / 1000; // Convert to kilometers
        console.log(distance);
        return { name: ngo.name, distance: distance.toFixed(2) }; // Limit to 2 decimal places
      });
      setNgoNames(ngoNamesWithDistance);
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
        `http://annaseva.ajinkyatechnologies.in/api/donation/donationsbyhotel?id=${user._id}`
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
              "http://annaseva.ajinkyatechnologies.in/api/donation/request/status",
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
        `http://annaseva.ajinkyatechnologies.in/api/donation/donationsbyhotel?id=${user._id}`
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
              "http://annaseva.ajinkyatechnologies.in/api/donation/request/status",
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

  // Pagination logic
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedDonations = donationData.donations.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <Box sx={{ padding: 2 }}>
      <Title title="Food Donations"></Title>
      <Grid container spacing={2}>
        {paginatedDonations.map((donation) => {
          const uploadPhoto = donation.uploadPhoto;
          const imageUrl =
            uploadPhoto && uploadPhoto.includes("\\")
              ? `http://annaseva.ajinkyatechnologies.in/${uploadPhoto
                  .split("\\")
                  .pop()}`
              : uploadPhoto
              ? `http://annaseva.ajinkyatechnologies.in/${uploadPhoto}`
              : null;
          console.log(imageUrl);
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
                </CardContent>
                {/* {imageUrl && (
                  <CardMedia
                    component="img"
                    height="200"
                    width="100%"
                    sx={{
                      height: 200,
                      objectFit: "cover",
                    }}
                    image={imageUrl}
                    alt={donation.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )} */}
                {imageUrl ? (
                  <CardMedia
                    component="img"
                    height="200"
                    image={imageUrl}
                    alt={donation.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                ) : (
                  <CardMedia
                    component="img"
                    height="200"
                    image="https://via.placeholder.com/200"
                    alt="No Image Available"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => handleOpenDialog(donation)}
                    sx={{
                      backgroundColor: "#F26E0D",
                      "&:hover": {
                        backgroundColor: "#C2570A ",
                      },
                    }}
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 2,
        }}
      >
        <Pagination
          count={Math.ceil(donationData.donations.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="secondary"
          // sx={{ color: "#F26E0D" }}
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
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", color: "#e91e63" }}>
                      Type:
                    </TableCell>
                    <TableCell>{selectedDonation.type}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", color: "#2196f3" }}>
                      Description:
                    </TableCell>
                    <TableCell>{selectedDonation.description}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", color: "#4caf50" }}>
                      Category:
                    </TableCell>
                    <TableCell>{selectedDonation.category}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", color: "#ff9800" }}>
                      Quantity:
                    </TableCell>
                    <TableCell>{selectedDonation.quantity}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", color: "#f44336" }}>
                      Expiry:
                    </TableCell>
                    <TableCell>{selectedDonation.expiry}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", color: "#795548" }}>
                      Ideal for:
                    </TableCell>
                    <TableCell>{selectedDonation.idealfor}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", color: "#607d8b" }}>
                      Available at:
                    </TableCell>
                    <TableCell>{selectedDonation.availableAt}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", color: "#9c27b0" }}>
                      Transportation:
                    </TableCell>
                    <TableCell>{selectedDonation.transportation}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", color: "#00bcd4" }}>
                      Contact Person:
                    </TableCell>
                    <TableCell>{selectedDonation.contactPerson}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", color: "#ff5722" }}>
                      Donation Status:
                    </TableCell>
                    <TableCell>{selectedDonation.donationStatus}</TableCell>
                  </TableRow>
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

      {/* <Dialog
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
      </Dialog> */}
      <Dialog
        open={requestDialogOpen}
        onClose={handleCloseRequestDialog}
        fullWidth
      >
        <DialogContent
          sx={{
            backgroundColor: "#f8fafc",
            padding: 3,
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              marginBottom: 2,
            }}
          >
            Request Details
          </Typography>
          {ngoNames.length > 0 ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", color: "#ff9800" }}>
                      NGO Name
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#ff9800" }}>
                      Distance (km)
                    </TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ngoNames.map((ngo, index) => (
                    <TableRow key={index}>
                      <TableCell>{ngo.name}</TableCell>
                      <TableCell>{ngo.distance}</TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() =>
                            handleAcceptRequest(selectedDonationId)
                          }
                          sx={{ marginRight: 1 }}
                        >
                          Accept
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() =>
                            handleRejectRequest(selectedDonationId)
                          }
                        >
                          Reject
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography
              variant="body1"
              sx={{
                fontSize: "1.125rem", // equivalent to text-lg
              }}
            >
              No NGOs found
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseRequestDialog}
            sx={{ color: "primary.main" }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Donations;
