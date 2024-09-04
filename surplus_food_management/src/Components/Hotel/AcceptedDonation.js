// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import {
//   Container,
//   Typography,
//   List,
//   ListItem,
//   ListItemText,
//   Button,
//   CircularProgress,
//   Card,
//   CardContent,
//   CardMedia,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Grid,
// } from "@mui/material";
// import QrScanner from "./QrScanner"; // Import the QrScanner component

// function AcceptedDonation() {
//   const { user } = useSelector((state) => state.auth);
//   const anchorRef = useRef(null);
//   const [acceptedRequests, setAcceptedRequests] = useState([]);
//   const [donationDetails, setDonationDetails] = useState(null);
//   const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
//   const hotelId = `${user._id}`; // Replace with actual hotel ID
//   const apiUrl = `http://localhost:5000/api/donation/getAcceptedRequestsByHotel?hotelId=${hotelId}`;
//   const [loading, setLoading] = useState(true);
//   const [openQrScanner, setOpenQrScanner] = useState(false); // State for QR scanner dialog

//   useEffect(() => {
//     const fetchAcceptedRequests = async () => {
//       try {
//         const response = await axios.get(apiUrl);
//         setAcceptedRequests(response.data.acceptedRequests);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching accepted requests:", error);
//       }
//     };

//     fetchAcceptedRequests();
//   }, [apiUrl]);

//   const fetchDonationDetails = async (donationId) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/donation/getDonationById?id=${donationId}`
//       );
//       setDonationDetails(response.data.donation);
//       setDetailsDialogOpen(true);
//     } catch (error) {
//       console.error("Error fetching donation details:", error);
//     }
//   };

//   const handleDownload = (trackingId) => {
//     if (anchorRef.current) {
//       anchorRef.current.href = `http://localhost:5000/qrcodes/${trackingId}.png`;
//       anchorRef.current.download = `http://localhost:5000/qrcodes/${trackingId}.png`;
//       anchorRef.current.click();
//     }
//   };

//   const handleOpenQrScanner = () => {
//     setOpenQrScanner(true);
//   };

//   const handleCloseQrScanner = () => {
//     setOpenQrScanner(false);
//   };

//   const handleCloseDetailsDialog = () => {
//     setDetailsDialogOpen(false);
//   };

//   return (
//     <Container style={{ marginTop: "20px" }}>
//       <Typography variant="h3" gutterBottom>
//         Accepted Donations
//       </Typography>
//       <Grid container justifyContent="center">
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleOpenQrScanner}
//           style={{ margin: "10px" }}
//         >
//           Scan QR Code
//         </Button>
//       </Grid>
//       {loading ? (
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             marginTop: "20px",
//           }}
//         >
//           <CircularProgress />
//         </div>
//       ) : (
//         <List>
//           {acceptedRequests.length === 0 ? (
//             <ListItem>
//               <ListItemText primary="No accepted requests found." />
//             </ListItem>
//           ) : (
//             acceptedRequests.map((request) => (
//               <Card
//                 key={request.requestId}
//                 style={{
//                   margin: "20px",
//                   padding: "20px",
//                   backgroundColor: "#f5f5f5",
//                   borderRadius: "10px",
//                   boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
//                   transition: "transform 0.3s ease",
//                 }}
//               >
//                 <CardContent>
//                   <Typography variant="h5" component="div">
//                     NGO Name: {request.ngoName}
//                   </Typography>
//                   <Button
//                     variant="outlined"
//                     color="primary"
//                     onClick={() => fetchDonationDetails(request.donationId)}
//                   >
//                     View Details
//                   </Button>
//                 </CardContent>
//                 {request.tracking && (
//                   <CardMedia
//                     component="img"
//                     style={{
//                       width: "100px",
//                       height: "100px",
//                       margin: "20px auto",
//                       transition: "transform 0.3s ease",
//                     }}
//                     image={`http://localhost:5000/qrcodes/${request.requestId}.png`}
//                     alt={`QR Code for donation ${request.requestId}`}
//                   />
//                 )}
//                 <Grid container justifyContent="center">
//                   <Button
//                     variant="contained"
//                     color="secondary"
//                     onClick={handleOpenQrScanner}
//                     style={{ margin: "10px" }}
//                   >
//                     Scan QR to Mark as Shipped
//                   </Button>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     // onClick={() => handleDownload(request.requestId)}
//                     style={{ margin: "10px" }}
//                   >
//                     <a
//                       href={`http://localhost:5000/qrcodes/${request.requestId}.png`}
//                       download={`http://localhost:5000/qrcodes/${request.requestId}.png`}
//                     >
//                       Download QR
//                     </a>
//                   </Button>
//                 </Grid>
//               </Card>
//             ))
//           )}
//         </List>
//       )}
//       <Dialog open={openQrScanner} onClose={handleCloseQrScanner} fullWidth>
//         <DialogTitle>Scan QR Code</DialogTitle>
//         <DialogContent>
//           <QrScanner />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseQrScanner}>Close</Button>
//         </DialogActions>
//       </Dialog>
//       <Dialog
//         open={detailsDialogOpen}
//         onClose={handleCloseDetailsDialog}
//         fullWidth
//       >
//         <DialogTitle>Donation Details</DialogTitle>
//         <DialogContent>
//           {donationDetails && (
//             <div>
//               <Typography variant="h6">Type: {donationDetails.type}</Typography>
//               <Typography variant="body1">
//                 Description: {donationDetails.description}
//               </Typography>
//               <Typography variant="body1">
//                 Category: {donationDetails.category}
//               </Typography>
//               <Typography variant="body1">
//                 Quantity: {donationDetails.quantity}
//               </Typography>
//               <Typography variant="body1">
//                 Expiry: {new Date(donationDetails.expiry).toDateString()}
//               </Typography>
//               {/* Add more details as needed */}
//             </div>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDetailsDialog}>Close</Button>
//         </DialogActions>
//       </Dialog>
//       <a ref={anchorRef} style={{ display: "none" }}></a>
//     </Container>
//   );
// }

// export default AcceptedDonation;

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Button,
  TablePagination,
} from "@mui/material";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";
import QrScanner from "./QrScanner";
import Title from "../Title/Title";
function AcceptedDonation() {
  const { user } = useSelector((state) => state.auth);
  const anchorRef = useRef(null);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [donationDetails, setDonationDetails] = useState({});
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const hotelId = user?._id;
  const apiUrl = `http://localhost:5000/api/donation/getAcceptedRequestsByHotel?hotelId=${hotelId}`;
  const [loading, setLoading] = useState(true);
  const [openQrScanner, setOpenQrScanner] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAcceptedRequests = async () => {
      try {
        const response = await axios.get(apiUrl);
        setAcceptedRequests(response.data.acceptedRequests);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching accepted requests:", error);
      }
    };

    fetchAcceptedRequests();
  }, [apiUrl]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter the acceptedRequests based on search term
  const filteredRequests = acceptedRequests.filter((request) =>
    request.ngoName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchDonationDetails = async (donationId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/donation/getDonationById?id=${donationId}`
      );
      setDonationDetails(response.data.donation);
      setDetailsDialogOpen(true);
    } catch (error) {
      console.error("Error fetching donation details:", error);
    }
  };

  const handleOpenQrScanner = () => {
    setOpenQrScanner(true);
  };

  const handleCloseQrScanner = () => {
    setOpenQrScanner(false);
  };

  const handleCloseDetailsDialog = () => {
    setDetailsDialogOpen(false);
  };

  const handleDownloadInvoice = (requestId) => {
    window.open(
      `http://localhost:5000/api/donation/downloadOrderInvoice/${requestId}`,
      "_blank"
    );
  };

  return (
    <Container style={{ marginTop: "20px" }}>
      <Title title="Accepted Donation Details"></Title>
      {/* <Typography variant="h3" gutterBottom>
        Accepted Donations
      </Typography> */}
      {/* <Grid container justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenQrScanner}
          style={{ margin: "10px" }}
        >
          Scan QR Code
        </Button>
      </Grid> */}
      <Grid
        container
        justifyContent="flex-end"
        style={{ marginBottom: "20px" }}
      >
        <TextField
          style={{ margin: "10px" }}
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <div
          style={{
            // display: "flex",
            // justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>NGO Name</TableCell>

                  <TableCell>View Details</TableCell>
                  <TableCell>QR Code</TableCell>
                  <TableCell>Scan</TableCell>
                  <TableCell>Download Invoice</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? acceptedRequests.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : acceptedRequests
                ).map((request) => (
                  <TableRow key={request.requestId}>
                    <TableCell>{request.ngoName}</TableCell>

                    <TableCell>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => fetchDonationDetails(request.donationId)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                    <TableCell>
                      {request.tracking && (
                        <img
                          src={`http://annaseva.ajinkyatechnologies.in/qrcodes/${request.requestId}.png`}
                          alt={`QR Code for donation ${request.requestId}`}
                          style={{ width: "100px", height: "100px" }}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleOpenQrScanner}
                        style={{ margin: "10px" }}
                      >
                        Scan QR to Mark as Shipped
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleDownloadInvoice(request.requestId)}
                      >
                        Download Invoice
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={acceptedRequests.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      )}
      <Dialog open={openQrScanner} onClose={handleCloseQrScanner} fullWidth>
        {/* <DialogTitle>Scan QR Code</DialogTitle> */}
        <DialogContent>
          <QrScanner />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseQrScanner}>Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={detailsDialogOpen}
        onClose={handleCloseDetailsDialog}
        fullWidth
      >
        <DialogTitle>Donation Details</DialogTitle>
        <DialogContent>
          {donationDetails && (
            <div>
              <Typography variant="h6">Type: {donationDetails.type}</Typography>
              <Typography variant="h6">Name: {donationDetails.name}</Typography>
              <Typography variant="h6">
                Status: {donationDetails.shipmentStatus}
              </Typography>
              <Typography variant="body1">
                Description: {donationDetails.description}
              </Typography>
              <Typography variant="body1">
                Category: {donationDetails.category}
              </Typography>
              <Typography variant="body1">
                Quantity: {donationDetails.quantity}
              </Typography>
              <Typography variant="body1">
                Expiry: {new Date(donationDetails.expiry).toDateString()}
              </Typography>
              {/* Add more details as needed */}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetailsDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default AcceptedDonation;
