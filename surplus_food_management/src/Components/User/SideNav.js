import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import "./Sidenav.css";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Dashboard as DashboardIcon,
  Add as AddIcon,
  List as ListIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  Help as HelpIcon,
} from "@mui/icons-material";
import Logo from "../../Images/Logo.svg";
// import DashboardComponent from "./DashboardComponen";
// import Content from "../Contact/Contact";
// import About from "../Authentication/Register";
// import Contact from "./Contact";
import AddFood from "./AddFood";
import FoodListing from "./FoodListing";
import HelpSupport from "./HelpSupport";
import Notification from "./Notification";
import Profile from "./Profile";
import DashboardUser from "./DashboardHotel";
import AcceptedDonation from "./AcceptedDonation";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState("Dashboard");

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

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

  return (
    <div>
      <nav
        className={`z-5000000 ${
          isOpen ? "z-50" : "z-100"
        } transition-all fixed inset-x-0 top-0`}
        style={{
          boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;",
          backgroundColor: "#20B486",
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
                  for User
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
              <div className="hidden md:flex items-center">
                <a href="#" className="text-white hover:text-gray-400 ml-4">
                  Sign Up
                </a>
                <a href="#" className="text-white hover:text-gray-400 ml-4">
                  Log In
                </a>
              </div>
              <div className="ml-4">
                <Avatar
                  className="w-10 h-10"
                  alt="Avatar"
                  src="https://oliver-andersen.se/wp-content/uploads/2018/03/cropped-Profile-Picture-Round-Color.png"
                />
              </div>
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
            <div className="p-4 bg-white" style={{ height: "100vh" }}>
              <Typography
                variant="h6"
                sx={{ color: "white", fontWeight: "bold" }}
              >
                Sidebar
              </Typography>
              <List sx={{ marginTop: 4 }}>
                <ListItem button onClick={() => setSelectedLink("Dashboard")}>
                  <DashboardIcon className="mx-2" />
                  <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button onClick={() => setSelectedLink("Add")}>
                  <AddIcon className="mx-2" />
                  <ListItemText primary="Add Surplus Food" />
                </ListItem>
                <ListItem button onClick={() => setSelectedLink("FoodListing")}>
                  <ListIcon className="mx-2" />
                  <ListItemText primary="Food Listing" />
                </ListItem>
                <ListItem
                  button
                  onClick={() => setSelectedLink("AcceptingDonation")}
                >
                  <CheckCircleIcon className="mx-2" />
                  <ListItemText primary="Accepted Food Donations" />
                </ListItem>
                <ListItem
                  button
                  onClick={() => setSelectedLink("Notifications")}
                >
                  <NotificationsIcon className="mx-2" />
                  <ListItemText primary="Notifications" />
                </ListItem>
                <ListItem button onClick={() => setSelectedLink("Profile")}>
                  <AccountCircleIcon className="mx-2" />
                  <ListItemText primary="Profile" />
                </ListItem>
                <ListItem button onClick={() => setSelectedLink("HelpSupport")}>
                  <HelpIcon className="mx-2" />
                  <ListItemText primary="Help and Support" />
                </ListItem>
              </List>
            </div>
          </div>
        )}
      </Transition>
      <div
        className={`px-8 py-8 my-11 ${window.innerWidth > 1400 ? "ml-64" : ""}`}
      >
        {selectedLink === "Dashboard" && <DashboardUser />}
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
