import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import "./Sidenav.css";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Typography, InputBase } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Search as SearchIcon } from "@mui/icons-material";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";

import {
  Dashboard as DashboardIcon,
  Add as AddIcon,
  List as ListIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  Help as HelpIcon,
  Menu,
  MenuItem,
} from "@mui/icons-material";
import Logo from "../../../Images/Logo_Hotel.svg";
import { useNavigate } from "react-router-dom";
// import DashboardComponent from "./DashboardComponen";
// import Content from "../Contact/Contact";
// import About from "../Authentication/Register";
// import Contact from "./Contact";
import AddFood from "../AddFood";
import FoodListing from "../FoodListing";
import HelpSupport from "../HelpSupport";
import Notification from "../Notification";
import Profile from "../Profile";
import DashboardHotel from "../DashboardHotel";
import AcceptedDonation from "../AcceptedDonation";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../features/auth/authSlice";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { toast } from "sonner";
const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState("Dashboard");
  const { user } = useSelector((state) => state.auth);
  const [unreadCount, setUnreadCount] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    if (user) {
      fetchUnreadCount();
    }
  }, [user]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1400) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    toast.success("Logout Successful");
  };

  const fetchUnreadCount = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/donation/notificationsCount/${user._id}`
      );
      setUnreadCount(response.data.unreadCount);
      console.log(response);
    } catch (error) {
      console.error("Error fetching unread notification count:", error);
    }
  };

  return (
    <div>
      <nav
        className={`z-5000000 ${
          isOpen ? "z-50" : "z-100"
        } transition-all fixed inset-x-0 top-0`}
        style={{
          boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;",
          background:
            "linear-gradient(107deg, rgb(255, 67, 5) 11.1%, rgb(245, 135, 0) 95.3%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <img src={Logo} alt="logo" width={50} />
              <Typography
                variant="h4"
                component="h1"
                style={{ fontFamily: "Dancing Script" }}
                className="text-white px-4 font-bold"
              >
                Anna Seva{" "}
                <span style={{ fontFamily: "popins", fontSize: "20px" }}>
                  {" "}
                  for hotel
                </span>
              </Typography>
            </div>

            <div className="md:hidden">
              <button
                onClick={toggleNav}
                className={`ml-4 ${window.innerWidth > 1400 ? "hidden" : ""}`}
              >
                <IconButton edge="start" color="inherit" aria-label="menu">
                  <MenuIcon style={{ color: "white" }} />
                </IconButton>
              </button>
            </div>

            <div className="flex items-center">
              {/* <div className="hidden md:flex items-center">
                <a href="#" className="text-white hover:text-gray-400 ml-4">
                  Sign Up
                </a>
                <a href="#" className="text-white hover:text-gray-400 ml-4">
                  Log In
                </a>
              </div> */}
              <div className="relative bg-white rounded-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: "pl-10 pr-4 py-2",
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
              <IconButton
                color="inherit"
                onClick={() => setSelectedLink("Notifications")}
              >
                <Badge badgeContent={unreadCount} color="success">
                  <NotificationsIcon style={{ color: "white" }} />
                </Badge>
                {/* {unreadCount > 0 && (
                  <span className="notification-badge">{unreadCount}</span>
                )} */}
              </IconButton>
              <div className="ml-4">
                <Avatar
                  className="w-10 h-10"
                  alt="Avatar"
                  src="https://marketplace.canva.com/EAFpeiTrl4c/1/0/1600w/canva-abstract-chef-cooking-restaurant-free-logo-9Gfim1S8fHg.jpg"
                />
              </div>
              <IconButton onClick={handleLogout}>
                {/* <ExitToAppIcon
                  fontSize="small"
                  sx={{ mr: 1 }}
                  style={{ color: "white" }}
                /> */}
                <h6 style={{ color: "white", fontSize: "15px" }}>Log Out</h6>
              </IconButton>
            </div>
          </div>
        </div>
      </nav>

      <Transition
        show={isOpen}
        enter="transition ease-out duration-300 transform"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in duration-300 transform"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        {(ref) => (
          <div
            ref={ref}
            className={`fixed inset-y-0 left-0 w-64 md:w-64 transition transform ease-in-out duration-300 z-40 ${
              isOpen ? "block" : "hidden"
            } md:block`}
            style={{
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            }}
          >
            <div
              className="p-4"
              style={{ height: "100vh", backgroundColor: "#382E29" }}
            >
              <Typography
                variant="h6"
                sx={{ color: "white", fontWeight: "bold" }}
              >
                Sidebar
              </Typography>
              <List sx={{ marginTop: 4 }}>
                <ListItem button onClick={() => setSelectedLink("Dashboard")}>
                  <DashboardIcon style={{ color: "white" }} className="mx-2" />
                  <ListItemText
                    style={{ color: "white" }}
                    primary="Dashboard"
                  />
                </ListItem>
                <ListItem button onClick={() => setSelectedLink("Add")}>
                  <AddIcon style={{ color: "white" }} className="mx-2" />
                  <ListItemText
                    style={{ color: "white" }}
                    primary="Add Surplus Food"
                  />
                </ListItem>
                <ListItem button onClick={() => setSelectedLink("FoodListing")}>
                  <ListIcon style={{ color: "white" }} className="mx-2" />
                  <ListItemText
                    style={{ color: "white" }}
                    primary="Food Listing"
                  />
                </ListItem>
                <ListItem
                  button
                  onClick={() => setSelectedLink("AcceptingDonation")}
                >
                  <CheckCircleIcon
                    style={{ color: "white" }}
                    className="mx-2"
                  />
                  <ListItemText
                    style={{ color: "white" }}
                    primary="Accepted Food Donations"
                  />
                </ListItem>
                <ListItem
                  button
                  onClick={() => setSelectedLink("Notifications")}
                >
                  <NotificationsIcon
                    style={{ color: "white" }}
                    className="mx-2"
                  />
                  <ListItemText
                    style={{ color: "white" }}
                    primary="Notifications"
                  />
                </ListItem>
                <ListItem button onClick={() => setSelectedLink("Profile")}>
                  <AccountCircleIcon
                    style={{ color: "white" }}
                    className="mx-2"
                  />
                  <ListItemText style={{ color: "white" }} primary="Profile" />
                </ListItem>
                <ListItem button onClick={() => setSelectedLink("HelpSupport")}>
                  <HelpIcon style={{ color: "white" }} className="mx-2" />
                  <ListItemText
                    style={{ color: "white" }}
                    primary="Help and Support"
                  />
                </ListItem>
                <ListItem
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  button
                  onClick={() => setSelectedLink("HelpSupport")}
                >
                  <Link to="/">
                    <Button
                      style={{
                        backgroundColor: "#F26E0D",
                        color: "white",
                        borderRadius: "10px",
                        width: "200px",
                      }}
                    >
                      Home
                    </Button>
                  </Link>
                </ListItem>
              </List>
            </div>
          </div>
        )}
      </Transition>
      <div
        className={`px-8 py-8 my-11 ${window.innerWidth > 1400 ? "ml-64" : ""}`}
      >
        {selectedLink === "Dashboard" && <DashboardHotel />}
        {selectedLink === "Add" && <AddFood />}
        {selectedLink === "FoodListing" && <FoodListing />}
        {selectedLink === "AcceptingDonation" && <AcceptedDonation />}
        {selectedLink === "Notifications" && <Notification />}
        {selectedLink === "Profile" && <Profile />}
        {selectedLink === "HelpSupport" && <HelpSupport />}
      </div>
    </div>
  );
};

export default SideNav;
