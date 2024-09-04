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
  List,
  ListItem,
  ListItemText,
  Button,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,
} from "@mui/material";
import { green } from "@mui/material/colors";
import axios from "axios";
import { useSelector } from "react-redux";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);
  const { user } = useSelector((state) => state.auth);
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

  const handleMarkAsRead = async () => {
    const notificationIds = [selectedNotification._id]; // Assuming _id is unique identifier
    try {
      await axios.post(
        "http://localhost:5000/api/donation/notifications/mark-as-read",
        { notificationIds }
      );
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification._id === selectedNotification._id
            ? { ...notification, read: true }
            : notification
        )
      );
      handleCloseDialog();
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const sortedNotifications = [...notifications].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <Card
      sx={{
        maxWidth: 500,
        margin: "auto",
        mt: 5,
        border: `2px solid ${green[500]}`,
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          gutterBottom
          color={green[800]}
        >
          Notifications
        </Typography>
        <List>
          {sortedNotifications.map((notification) => (
            <Paper
              key={notification._id}
              elevation={3}
              sx={{
                mb: 2,
                backgroundColor: notification.read ? green[50] : green[100],
                border: notification.read
                  ? `1px solid ${green[300]}`
                  : `1px solid ${green[500]}`,
              }}
            >
              <ListItem
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <ListItemText
                  primary={notification.message}
                  sx={{
                    textDecoration: notification.read ? "line-through" : "none",
                    color: green[800],
                  }}
                  onClick={() => handleOpenDialog(notification)}
                />
                {!notification.read && (
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: green[700],
                      "&:hover": { backgroundColor: green[900] },
                    }}
                    onClick={() => handleOpenDialog(notification)}
                  >
                    View
                  </Button>
                )}
              </ListItem>
            </Paper>
          ))}
        </List>

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
            {!selectedNotification?.read && (
              <Button onClick={handleMarkAsRead} color="primary" autoFocus>
                Mark as Read
              </Button>
            )}
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
