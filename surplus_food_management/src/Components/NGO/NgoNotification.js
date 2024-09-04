// import React, { useState, useEffect } from "react";
// import {
//   Card,
//   CardContent,
//   Typography,
//   List,
//   ListItem,
//   ListItemText,
//   Button,
//   Paper,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { styled, keyframes } from "@mui/system";

// // Define the keyframes for fadeIn animation
// const fadeIn = keyframes`
//   0% {
//     opacity: 0;
//   }
//   100% {
//     opacity: 1;
//   }
// `;

// // Create a new component that wraps the Paper component and adds the animation
// const AnimatedPaper = styled(Paper)(({ theme }) => ({
//   animation: `${fadeIn} 0.3s ${theme.transitions.easing.easeInOut}`,
// }));

// const NgoNotification = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedNotification, setSelectedNotification] = useState(null);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);

//   useEffect(() => {
//     fetchNotifications();
//   }, []);

//   const { user } = useSelector((state) => state.auth);

//   const fetchNotifications = async () => {
//     try {
//       const response = await axios.get(
//         `http://annaseva.ajinkyatechnologies.in/api/donation/notifications/${user._id}`
//       );
//       setNotifications(response.data.notifications);
//     } catch (error) {
//       console.error("Error fetching notifications:", error);
//     }
//   };

//   const handleOpenDialog = (notification) => {
//     setSelectedNotification(notification);
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedNotification(null);
//   };

//   const handleMarkAsRead = async () => {
//     const notificationIds = [selectedNotification._id];
//     try {
//       await axios.post(
//         "http://annaseva.ajinkyatechnologies.in/api/donation/notifications/mark-as-read",
//         { notificationIds }
//       );
//       setNotifications((prevNotifications) =>
//         prevNotifications.map((notification) =>
//           notification._id === selectedNotification._id
//             ? { ...notification, read: true }
//             : notification
//         )
//       );
//       handleCloseDialog();
//       setSnackbarOpen(true);
//     } catch (error) {
//       console.error("Error marking notification as read:", error);
//     }
//   };

//   const sortedNotifications = [...notifications].sort(
//     (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//   );

//   return (
//     <Card
//       sx={{
//         maxWidth: 600,
//         margin: "auto",
//         mt: 5,
//         border: `2px solid #20B486`,
//         borderRadius: 2,
//         boxShadow: 3,
//       }}
//     >
//       <CardContent>
//         <Typography
//           variant="h5"
//           component="div"
//           gutterBottom
//           sx={{ color: "#188a68", textAlign: "center", fontWeight: "bold" }}
//         >
//           Notifications
//         </Typography>
//         <List>
//           {sortedNotifications.map((notification) => (
//             <AnimatedPaper
//               key={notification._id}
//               elevation={3}
//               sx={{
//                 mb: 2,
//                 backgroundColor: notification.read ? "#e8f5e9" : "#c8e6c9",
//                 border: `1px solid ${
//                   notification.read ? "#a5d6a7" : "#20B486"
//                 }`,
//                 transition: "all 0.3s ease",
//                 "&:hover": {
//                   backgroundColor: "#d0e9c6",
//                   cursor: "pointer",
//                 },
//               }}
//               onClick={() => handleOpenDialog(notification)}
//             >
//               <ListItem
//                 sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   padding: 2,
//                 }}
//               >
//                 <ListItemText
//                   primary={notification.message}
//                   sx={{
//                     textDecoration: notification.read ? "line-through" : "none",
//                     color: "#188a68",
//                   }}
//                 />
//                 {!notification.read && (
//                   <Button
//                     variant="contained"
//                     sx={{
//                       backgroundColor: "#20B486",
//                       "&:hover": { backgroundColor: "#188a68" },
//                     }}
//                   >
//                     View
//                   </Button>
//                 )}
//               </ListItem>
//             </AnimatedPaper>
//           ))}
//         </List>

//         <Dialog
//           open={openDialog}
//           onClose={handleCloseDialog}
//           aria-labelledby="alert-dialog-title"
//           aria-describedby="alert-dialog-description"
//           PaperProps={{
//             sx: { borderRadius: 2, p: 2, boxShadow: 5 },
//           }}
//         >
//           <DialogTitle id="alert-dialog-title" sx={{ fontWeight: "bold" }}>
//             Notification Details
//           </DialogTitle>
//           <DialogContent>
//             <DialogContentText id="alert-dialog-description">
//               {selectedNotification?.message}
//             </DialogContentText>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleCloseDialog} color="primary">
//               Close
//             </Button>
//             {!selectedNotification?.read && (
//               <Button onClick={handleMarkAsRead} color="primary" autoFocus>
//                 Mark as Read
//               </Button>
//             )}
//           </DialogActions>
//         </Dialog>

//         <Snackbar
//           open={snackbarOpen}
//           autoHideDuration={3000}
//           onClose={() => setSnackbarOpen(false)}
//           anchorOrigin={{ vertical: "top", horizontal: "right" }}
//         >
//           <Alert
//             onClose={() => setSnackbarOpen(false)}
//             severity="success"
//             sx={{ width: "100%" }}
//           >
//             Notification marked as read!
//           </Alert>
//         </Snackbar>
//       </CardContent>
//     </Card>
//   );
// };

// export default NgoNotification;

//new
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,
  Pagination,
  Button,
} from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";
import axios from "axios";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import Title from "../Title/Title1";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // 5 notifications on each side

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        `http://annaseva.ajinkyatechnologies.in/api/donation/notifications/${user._id}`
      );
      setNotifications(response.data.notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleOpenDialog = (notification) => {
    setSelectedNotification(notification);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedNotification(null);
  };

  const handleMarkAsRead = async (notification) => {
    const notificationIds = [notification._id]; // Assuming _id is unique identifier
    try {
      await axios.post(
        "http://annaseva.ajinkyatechnologies.in/api/donation/notifications/mark-as-read",
        { notificationIds }
      );
      setNotifications((prevNotifications) =>
        prevNotifications.map((notif) =>
          notif._id === notification._id ? { ...notif, read: true } : notif
        )
      );
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const extractNgoName = (message) => {
    const fromIndex = message.indexOf("from");
    if (fromIndex !== -1) {
      return message.substring(fromIndex + 5);
    }
    return "";
  };

  const sortedNotifications = [...notifications].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const indexOfLastNotification = currentPage * itemsPerPage;
  const indexOfFirstNotification = indexOfLastNotification - itemsPerPage;
  const currentNotifications = sortedNotifications.slice(
    indexOfFirstNotification,
    indexOfLastNotification
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const cardStyle = {
    maxWidth: 1000,
    margin: "auto",
    mt: 5,
    border: `2px solid #000`,
    backgroundColor: "#fff",
    color: "#000",
  };

  const paperStyle = (read) => ({
    mb: 2,
    backgroundColor: read ? "#eee" : "#fff",
    border: read ? `1px solid #ccc` : `1px solid #000`,
    color: "#000",
  });

  return (
    <Card>
      <Title title="Notifications "></Title>
      <CardContent>
        {/* <Typography variant="h5" component="div" gutterBottom>
          Notifications
        </Typography> */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <List>
              {currentNotifications
                .filter((_, index) => index % 2 === 0)
                .map((notification) => (
                  <Paper
                    key={notification._id}
                    elevation={3}
                    sx={paperStyle(notification.read)}
                  >
                    <ListItem
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <ListItemText
                        primary={
                          <>
                            <Typography
                              variant="body1"
                              sx={{ fontWeight: "bold" }}
                            >
                              {extractNgoName(notification.message)}
                            </Typography>
                            <Typography variant="body1">
                              {notification.message}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              sx={{ textAlign: "right" }}
                            >
                              {format(
                                new Date(notification.createdAt),
                                "dd MMM yyyy, h:mm a"
                              )}
                            </Typography>
                          </>
                        }
                        sx={{
                          textDecoration: notification.read
                            ? "line-through"
                            : "none",
                        }}
                        onClick={() => handleOpenDialog(notification)}
                      />
                      {!notification.read ? (
                        <IconButton
                          color="primary"
                          onClick={() => handleMarkAsRead(notification)}
                        >
                          <CheckCircle />
                        </IconButton>
                      ) : (
                        <IconButton disabled>
                          <Cancel />
                        </IconButton>
                      )}
                    </ListItem>
                  </Paper>
                ))}
            </List>
          </Grid>
          <Grid item xs={6}>
            <List>
              {currentNotifications
                .filter((_, index) => index % 2 !== 0)
                .map((notification) => (
                  <Paper
                    key={notification._id}
                    elevation={3}
                    sx={paperStyle(notification.read)}
                  >
                    <ListItem
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <ListItemText
                        primary={
                          <>
                            <Typography
                              variant="body1"
                              sx={{ fontWeight: "bold" }}
                            >
                              {extractNgoName(notification.message)}
                            </Typography>
                            <Typography variant="body1">
                              {notification.message}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              sx={{ textAlign: "right" }}
                            >
                              {format(
                                new Date(notification.createdAt),
                                "dd MMM yyyy, h:mm a"
                              )}
                            </Typography>
                          </>
                        }
                        sx={{
                          textDecoration: notification.read
                            ? "line-through"
                            : "none",
                        }}
                        onClick={() => handleOpenDialog(notification)}
                      />
                      {!notification.read ? (
                        <IconButton
                          color="primary"
                          onClick={() => handleMarkAsRead(notification)}
                        >
                          <CheckCircle />
                        </IconButton>
                      ) : (
                        <IconButton disabled>
                          <Cancel />
                        </IconButton>
                      )}
                    </ListItem>
                  </Paper>
                ))}
            </List>
          </Grid>
        </Grid>

        <Pagination
          count={Math.ceil(sortedNotifications.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          sx={{ mt: 3, display: "flex", justifyContent: "center" }}
        />

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Notification Details"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {selectedNotification?.message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            Notification marked as read!
          </Alert>
        </Snackbar>
      </CardContent>
    </Card>
  );
};

export default Notification;
