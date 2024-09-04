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
import axios from "axios";
import { useSelector } from "react-redux";
import { styled, keyframes } from "@mui/system";

// Define the keyframes for fadeIn animation
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

// Create a new component that wraps the Paper component and adds the animation
const AnimatedPaper = styled(Paper)(({ theme }) => ({
  animation: `${fadeIn} 0.3s ${theme.transitions.easing.easeInOut}`,
}));

const NgoNotification = () => {
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
    const notificationIds = [selectedNotification._id];
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
        maxWidth: 600,
        margin: "auto",
        mt: 5,
        border: `2px solid #20B486`,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          gutterBottom
          sx={{ color: "#188a68", textAlign: "center", fontWeight: "bold" }}
        >
          Notifications
        </Typography>
        <List>
          {sortedNotifications.map((notification) => (
            <AnimatedPaper
              key={notification._id}
              elevation={3}
              sx={{
                mb: 2,
                backgroundColor: notification.read ? "#e8f5e9" : "#c8e6c9",
                border: `1px solid ${
                  notification.read ? "#a5d6a7" : "#20B486"
                }`,
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#d0e9c6",
                  cursor: "pointer",
                },
              }}
              onClick={() => handleOpenDialog(notification)}
            >
              <ListItem
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 2,
                }}
              >
                <ListItemText
                  primary={notification.message}
                  sx={{
                    textDecoration: notification.read ? "line-through" : "none",
                    color: "#188a68",
                  }}
                />
                {!notification.read && (
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#20B486",
                      "&:hover": { backgroundColor: "#188a68" },
                    }}
                  >
                    View
                  </Button>
                )}
              </ListItem>
            </AnimatedPaper>
          ))}
        </List>

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
            sx: { borderRadius: 2, p: 2, boxShadow: 5 },
          }}
        >
          <DialogTitle id="alert-dialog-title" sx={{ fontWeight: "bold" }}>
            Notification Details
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

export default NgoNotification;
