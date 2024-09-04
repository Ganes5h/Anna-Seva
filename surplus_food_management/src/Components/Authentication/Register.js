import React from "react";
import backGroundImage from "../../Images/BackgroundImage.svg";
import { Button, Box, Grid, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../Images/Logo.svg";

function UserRegister() {
  return (
    <div
      style={{
        backgroundImage: `url(${backGroundImage})`,
        height: "100vh",
        width: "100%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box display="flex" justifyContent="flex-end">
        <Box
          width="100%"
          height="50px"
          //   border="1px solid red"
          borderRadius="50px"
          display="flex"
          alignItems="center"
          justifyContent="end"
          padding="10px"
        >
          {/* Rounded Button using MUI */}
          <Link to="/login">
            <Button
              variant="contained"
              color="success"
              sx={{
                borderRadius: "50px",
                marginRight: "10px",
                width: "110px",
                backgroundColor: "#20B486",
                "&:hover": {
                  backgroundColor: "#1A946D ",
                },
              }}
            >
              Login
            </Button>
          </Link>
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
          //   width: "499px",
          height: "80vh",
          flexDirection: "column",
          //   border: "1px solid red",
        }}
      >
        {/* HEading */}
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
        <div
          style={{
            // border: "1px solid white",
            maxwidth: "200px",
            height: "300px",
            padding: "10px",
          }}
        >
          <Link to="/user_register">
            <Button
              variant="contained"
              color="success"
              fullWidth
              sx={{
                mt: 6,
                height: "50px",
                borderRadius: "20px",
                backgroundColor: "#20B486",
                "&:hover": {
                  backgroundColor: "#1A946D ",
                },
              }}
            >
              User Registration
            </Button>
          </Link>
          <Link to="/volunteer_register">
            <Button
              variant="contained"
              color="success"
              fullWidth
              sx={{
                mt: 6,
                height: "50px",
                borderRadius: "20px",
                backgroundColor: "#20B486",
                "&:hover": {
                  backgroundColor: "#1A946D ",
                },
              }}
            >
              Volunteer Registration
            </Button>
          </Link>
          <Link to="/ngo_register">
            <Button
              variant="contained"
              color="success"
              fullWidth
              sx={{
                mt: 6,
                height: "50px",
                borderRadius: "20px",
                backgroundColor: "#20B486",
                "&:hover": {
                  backgroundColor: "#1A946D ",
                },
              }}
            >
              Ngo / Organization Registration
            </Button>
          </Link>
          <Link to="/hotel_register">
            <Button
              variant="contained"
              color="success"
              fullWidth
              sx={{
                mt: 6,
                height: "50px",
                borderRadius: "20px",
                backgroundColor: "#20B486",
                "&:hover": {
                  backgroundColor: "#1A946D ",
                },
              }}
            >
              Hotel Registration
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserRegister;
