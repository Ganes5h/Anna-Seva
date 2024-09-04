// // src/Notification.js
// import React, { useState } from "react";
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
// import { green } from "@mui/material/colors";

// const notificationsData = [
//   {
//     id: 1,
//     message: "Notification 1: This is a detailed message for notification 1.",
//     read: false,
//   },
//   {
//     id: 2,
//     message: "Notification 2: This is a detailed message for notification 2.",
//     read: false,
//   },
//   {
//     id: 3,
//     message: "Notification 3: This is a detailed message for notification 3.",
//     read: false,
//   },
// ];

// const Notification = () => {
//   const [notifications, setNotifications] = useState(notificationsData);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedNotification, setSelectedNotification] = useState(null);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);

//   const handleOpenDialog = (notification) => {
//     setSelectedNotification(notification);
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedNotification(null);
//   };

//   const handleMarkAsRead = () => {
//     setNotifications((prevNotifications) =>
//       prevNotifications.map((notification) =>
//         notification.id === selectedNotification.id
//           ? { ...notification, read: true }
//           : notification
//       )
//     );
//     handleCloseDialog();
//     setSnackbarOpen(true);
//   };

//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   const sortedNotifications = [...notifications].sort(
//     (a, b) => a.read - b.read
//   );

//   return (
//     <Card
//       sx={{
//         maxWidth: 500,
//         margin: "auto",
//         mt: 5,
//         border: `2px solid ${green[500]}`,
//       }}
//     >
//       <CardContent>
//         <Typography
//           variant="h5"
//           component="div"
//           gutterBottom
//           color={green[800]}
//         >
//           Notifications
//         </Typography>
//         <List>
//           {sortedNotifications.map((notification) => (
//             <Paper
//               key={notification.id}
//               elevation={3}
//               sx={{
//                 mb: 2,
//                 backgroundColor: notification.read ? green[50] : green[100],
//                 border: notification.read
//                   ? `1px solid ${green[300]}`
//                   : `1px solid ${green[500]}`,
//               }}
//             >
//               <ListItem
//                 sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                 }}
//               >
//                 <ListItemText
//                   primary={notification.message.split(":")[0]} // Display only the summary
//                   sx={{
//                     textDecoration: notification.read ? "line-through" : "none",
//                     color: green[800],
//                   }}
//                   onClick={() => handleOpenDialog(notification)}
//                 />
//                 {!notification.read && (
//                   <Button
//                     variant="contained"
//                     sx={{
//                       backgroundColor: green[700],
//                       "&:hover": { backgroundColor: green[900] },
//                     }}
//                     onClick={() => handleOpenDialog(notification)}
//                   >
//                     View
//                   </Button>
//                 )}
//               </ListItem>
//             </Paper>
//           ))}
//         </List>

//         <Dialog
//           open={openDialog}
//           onClose={handleCloseDialog}
//           aria-labelledby="alert-dialog-title"
//           aria-describedby="alert-dialog-description"
//         >
//           <DialogTitle id="alert-dialog-title">
//             {"Notification Details"}
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
//           onClose={handleSnackbarClose}
//           anchorOrigin={{ vertical: "top", horizontal: "right" }}
//         >
//           <Alert
//             onClose={handleSnackbarClose}
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

// export default Notification;
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
import Title from "../Title/Title";

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
        `http://localhost:5000/api/donation/notifications/${user._id}`
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
        "http://localhost:5000/api/donation/notifications/mark-as-read",
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
