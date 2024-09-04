// import React, { useEffect, useState } from "react";
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
// } from "@mui/material";

// function AcceptedDonation() {
//   const { user } = useSelector((state) => state.auth);
//   const [acceptedRequests, setAcceptedRequests] = useState([]);
//   const hotelId = `${user._id}`; // Replace with actual hotel ID
//   const apiUrl = `http://localhost:5000/api/donation/getAcceptedRequestsByHotel?hotelId=${hotelId}`;
//   const [loading, setLoading] = useState(true);

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

//   const downloadInvoice = async (donationId, requestId) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/donation/downloadOrderInvoice/${requestId}`,
//         {
//           responseType: "blob", // Important for downloading files
//         }
//       );

//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", `invoice_${donationId}.pdf`);
//       document.body.appendChild(link);
//       link.click();
//     } catch (error) {
//       console.error("Error downloading invoice:", error);
//     }
//   };

//   const trackDonation = async (id, trackingData) => {
//     try {
//       const response = await axios.post(
//         `http://localhost:5000/api/tracking/scan/hotel?id=${id}`,
//         trackingData
//       );
//       console.log("Donation tracked:", response.data);
//       // Optionally refetch accepted requests to update the status
//       const updatedRequests = await axios.get(apiUrl);
//       setAcceptedRequests(updatedRequests.data.acceptedRequests);
//     } catch (error) {
//       console.error("Error tracking donation:", error);
//     }
//   };

//   return (
//     <Container>
//       <Typography variant="h3" gutterBottom>
//         Accepted Donations
//       </Typography>
//       {loading ? (
//         <CircularProgress />
//       ) : (
//         <List>
//           {acceptedRequests.length === 0 ? (
//             <ListItem>
//               <ListItemText primary="No accepted requests found." />
//             </ListItem>
//           ) : (
//             acceptedRequests.map((request) => (
//               <ListItem key={request.requestId}>
//                 <ListItemText
//                   primary={`NGO Name: ${request.ngoName}`}
//                   secondary={`Donation ID: ${request.donationId}`}
//                 />
//                 <ListItemText
//                   primary={`Tracking Status: ${request.tracking.status}`}
//                 />
//                 <Button
//                   variant="contained"
//                   onClick={() =>
//                     downloadInvoice(request.donationId, request.requestId)
//                   }
//                 >
//                   Download Invoice
//                 </Button>
//                 <Button
//                   variant="contained"
//                   onClick={() =>
//                     trackDonation(request.tracking._id, {
//                       hotelId,
//                       location: "Hotel Location",
//                       agencyName: "Delivery Agency",
//                       deliveryPersonName: "Delivery Person",
//                       deliveryPersonContact: "1234567890",
//                       percentageReached: 100,
//                     })
//                   }
//                 >
//                   Mark as Shipped
//                 </Button>
//               </ListItem>
//             ))
//           )}
//         </List>
//       )}
//     </Container>
//   );
// }

// export default AcceptedDonation;

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
//   CardMedia,
// } from "@mui/material";

// function AcceptedDonation() {
//   const { user } = useSelector((state) => state.auth);
//   const anchorRef = useRef(null);
//   const [acceptedRequests, setAcceptedRequests] = useState([]);
//   const hotelId = `${user._id}`; // Replace with actual hotel ID
//   const apiUrl = `http://localhost:5000/api/donation/getAcceptedRequestsByHotel?hotelId=${hotelId}`;
//   const [loading, setLoading] = useState(true);

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

//   const handleDownload = () => {
//     if (anchorRef.current) {
//       anchorRef.current.click();
//     }
//   };

//   const markAsShipped = async (requestId) => {
//     // Call the API to mark the donation as shipped
//     try {
//       // Make API call to mark the donation as shipped using the requestId
//       // Example:
//       // const response = await axios.post(http://localhost:5000/api/donation/markAsShipped/${requestId}, requestData);
//       // Handle response
//     } catch (error) {
//       console.error("Error marking donation as shipped:", error);
//     }
//   };

//   return (
//     <Container>
//       <Typography variant="h3" gutterBottom>
//         Accepted Donations
//       </Typography>
//       {loading ? (
//         <CircularProgress />
//       ) : (
//         <List>
//           {acceptedRequests.length === 0 ? (
//             <ListItem>
//               <ListItemText primary="No accepted requests found." />
//             </ListItem>
//           ) : (
//             acceptedRequests.map((request) => (
//               <ListItem key={request.requestId}>
//                 <ListItemText
//                   primary={`NGO Name: ${request.ngoName}`}
//                   secondary={`Donation ID: ${request.donationId}`}
//                 />
//                 <ListItemText
//                   primary={`Tracking Status: ${request.tracking.status}`}
//                 />
//                 <Card>
//                   <CardMedia
//                     component="img"
//                     height="140"
//                     image={`http://localhost:5000/qrcodes/${request.requestId}.png`}
//                     alt={`QR Code for donation ${request.donationId}`}
//                   />
//                   <a
//                     ref={anchorRef}
//                     href={`http://localhost:5000/qrcodes/${request.requestId}.png`}
//                     download={`QR_Code_${request.requestId}.png`}
//                     style={{ display: "none" }}
//                   >
//                     {" "}
//                     Download QR Code
//                   </a>
//                 </Card>
//                 <Button
//                   variant="contained"
//                   onClick={() => markAsShipped(request.requestId)}
//                 >
//                   Mark as Shipped
//                 </Button>
//                 <Button
//                   variant="contained"
//                   // onClick={() => downloadQR(request.requestId)}
//                 >
//                   Download QR
//                 </Button>
//               </ListItem>
//             ))
//           )}
//         </List>
//       )}
//     </Container>
//   );
// }

// export default AcceptedDonation;

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
// import { makeStyles } from "@mui/styles";
// import QrScanner from "./QrScanner"; // Import the QrScanner component

// const useStyles = makeStyles((theme) => ({
//   button: {
//     margin: theme.spacing(1),
//   },
//   card: {
//     margin: theme.spacing(2),
//     padding: theme.spacing(2),
//     backgroundColor: theme.palette.background.default,
//   },
//   container: {
//     marginTop: theme.spacing(4),
//   },
//   loading: {
//     display: "flex",
//     justifyContent: "center",
//     marginTop: theme.spacing(4),
//   },
//   dialogContent: {
//     padding: theme.spacing(2),
//   },
// }));

// function AcceptedDonation() {
//   const { user } = useSelector((state) => state.auth);
//   const anchorRef = useRef(null);
//   const [acceptedRequests, setAcceptedRequests] = useState([]);
//   const hotelId = `${user._id}`; // Replace with actual hotel ID
//   const apiUrl = `http://localhost:5000/api/donation/getAcceptedRequestsByHotel?hotelId=${hotelId}`;
//   const [loading, setLoading] = useState(true);
//   const [openQrScanner, setOpenQrScanner] = useState(false); // State for QR scanner dialog

//   const classes = useStyles();

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

//   const handleDownload = (requestId) => {
//     if (anchorRef.current) {
//       anchorRef.current.href = `http://localhost:5000/qrcodes/${requestId}.png`;
//       anchorRef.current.download = `QR_Code_${requestId}.png`;
//       anchorRef.current.click();
//     }
//   };

//   const handleOpenQrScanner = () => {
//     setOpenQrScanner(true);
//   };

//   const handleCloseQrScanner = () => {
//     setOpenQrScanner(false);
//   };

//   return (
//     <Container className={classes.container}>
//       <Typography variant="h3" gutterBottom>
//         Accepted Donations
//       </Typography>
//       <Grid container justifyContent="center">
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleOpenQrScanner}
//           className={classes.button}
//         >
//           Scan QR Code
//         </Button>
//       </Grid>
//       {loading ? (
//         <div className={classes.loading}>
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
//               <Card className={classes.card} key={request.requestId}>
//                 <CardContent>
//                   <Typography variant="h5" component="div">
//                     NGO Name: {request.ngoName}
//                   </Typography>
//                   <Typography color="textSecondary">
//                     Donation ID: {request.donationId}
//                   </Typography>
//                   <Typography color="textSecondary">
//                     Tracking Status: {request.tracking.status}
//                   </Typography>
//                 </CardContent>
//                 <CardMedia
//                   component="img"
//                   height="140"
//                   image={`http://localhost:5000/qrcodes/${request.requestId}.png`}
//                   alt={`QR Code for donation ${request.donationId}`}
//                 />
//                 <Grid container justifyContent="center">
//                   <Button
//                     variant="contained"
//                     color="secondary"
//                     onClick={handleOpenQrScanner}
//                     className={classes.button}
//                   >
//                     Scan QR to Mark as Shipped
//                   </Button>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={() => handleDownload(request.requestId)}
//                     className={classes.button}
//                   >
//                     Download QR
//                   </Button>
//                 </Grid>
//               </Card>
//             ))
//           )}
//         </List>
//       )}
//       <Dialog open={openQrScanner} onClose={handleCloseQrScanner} fullWidth>
//         <DialogTitle>Scan QR Code</DialogTitle>
//         <DialogContent className={classes.dialogContent}>
//           <QrScanner />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseQrScanner}>Close</Button>
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
  List,
  ListItem,
  ListItemText,
  Button,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from "@mui/material";
import QrScanner from "./QrScanner"; // Import the QrScanner component

function AcceptedDonation() {
  const { user } = useSelector((state) => state.auth);
  const anchorRef = useRef(null);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const hotelId = `${user._id}`; // Replace with actual hotel ID
  const apiUrl = `http://localhost:5000/api/donation/getAcceptedRequestsByHotel?hotelId=${hotelId}`;
  const [loading, setLoading] = useState(true);
  const [openQrScanner, setOpenQrScanner] = useState(false); // State for QR scanner dialog

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

  const handleDownload = (requestId) => {
    if (anchorRef.current) {
      anchorRef.current.href = `http://localhost:5000/qrcodes/${requestId}.png`;
      anchorRef.current.download = `QR_Code_${requestId}.png`;
      anchorRef.current.click();
    }
  };

  const handleOpenQrScanner = () => {
    setOpenQrScanner(true);
  };

  const handleCloseQrScanner = () => {
    setOpenQrScanner(false);
  };

  return (
    <Container style={{ marginTop: "20px" }}>
      <Typography variant="h3" gutterBottom>
        Accepted Donations
      </Typography>
      <Grid container justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenQrScanner}
          style={{ margin: "10px" }}
        >
          Scan QR Code
        </Button>
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
        <List>
          {acceptedRequests.length === 0 ? (
            <ListItem>
              <ListItemText primary="No accepted requests found." />
            </ListItem>
          ) : (
            acceptedRequests.map((request) => (
              <Card
                key={request.requestId}
                style={{
                  margin: "20px",
                  padding: "20px",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }}
              >
                <CardContent>
                  <Typography variant="h5" component="div">
                    NGO Name: {request.ngoName}
                  </Typography>
                  <Typography color="textSecondary">
                    Donation ID: {request.donationId}
                  </Typography>
                  <Typography color="textSecondary">
                    Tracking Status: {request.tracking.status}
                  </Typography>
                </CardContent>
                <CardMedia
                  component="img"
                  style={{
                    width: "100px",
                    height: "100px",
                    margin: "20px auto",
                  }}
                  image={`http://localhost:5000/qrcodes/${request.requestId}.png`}
                  alt={`QR Code for donation ${request.donationId}`}
                />
                <Grid container justifyContent="center">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleOpenQrScanner}
                    style={{ margin: "10px" }}
                  >
                    Scan QR to Mark as Shipped
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleDownload(request.requestId)}
                    style={{ margin: "10px" }}
                  >
                    Download QR
                  </Button>
                </Grid>
              </Card>
            ))
          )}
        </List>
      )}
      <Dialog open={openQrScanner} onClose={handleCloseQrScanner} fullWidth>
        <DialogTitle>Scan QR Code</DialogTitle>
        <DialogContent>
          <QrScanner />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseQrScanner}>Close</Button>
        </DialogActions>
      </Dialog>
      <a ref={anchorRef} style={{ display: "none" }}></a>
    </Container>
  );
}

export default AcceptedDonation;
