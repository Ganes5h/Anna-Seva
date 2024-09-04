import React from "react";
import Section3Pic from "../../Images/Section3-pic.svg";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import PeopleIcon from "@mui/icons-material/People";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HotelIcon from "@mui/icons-material/Hotel";
import { Typography } from "@mui/material";
function Section3() {
  return (
    <>
      <div style={{ border: "1px solid black", backgroundColor: "#20B486" }}>
        <div className="text-center pt-8">
          <Typography sx={{ fontWeight: "bold" }} variant="h4">
            - WHAT WE DO -
          </Typography>
        </div>
        <div
          className="max-xl:flex-col"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            minHeight: "85vh",
          }}
        >
          {/* Content div */}
          <div
            // className="max-xl:"
            style={{
              borderLeft: "5px solid white",
              width: "600px",
              height: "500px",
              marginRight: "30px",
            }}
          >
            <Typography
              variant="h3"
              style={{ color: "white", paddingLeft: "50px" }}
            >
              How it works ➡
            </Typography>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                // border: "1px solid white",
                height: "30%",
                alignItems: "center",
              }}
            >
              <LocalDiningIcon style={{ fontSize: 40, margin: "10px" }} />
              <div style={{ color: "white" }}>
                <Typography sx={{ fontWeight: "semibold" }} variant="h5">
                  Restaurants/Users List Surplus Food{" "}
                </Typography>
                <p>
                  Restaurants can quickly and easily list surplus food items
                  through our user-friendly interface. By entering details such
                  as the type of food, quantity, and expiration date,
                  restaurants ensure that their surplus reaches those who need
                  it most.
                </p>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                // border: "1px solid white",
                height: "30%",
                alignItems: "center",
              }}
            >
              <VolunteerActivismIcon style={{ fontSize: 40, margin: "10px" }} />
              <div style={{ color: "white" }}>
                <Typography sx={{ fontWeight: "semibold" }} variant="h5">
                  NGOs Browse and Request
                </Typography>
                <p>
                  NGOs can browse the available surplus food listings based on
                  their requirements. With filters for food type, quantity, and
                  location, NGOs can find and request the food items they need
                  efficiently.
                </p>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                // border: "1px solid white",
                height: "30%",
                alignItems: "center",
              }}
            >
              <LocalShippingIcon style={{ fontSize: 40, margin: "10px" }} />
              <div style={{ color: "white" }}>
                <Typography sx={{ fontWeight: "semibold" }} variant="h5">
                  Seamless Redistribution
                </Typography>
                <p>
                  AnnaSeva facilitates smooth and efficient redistribution of
                  food. Our system prioritizes requests based on various factors
                  and ensures timely pickups and deliveries, minimizing food
                  waste and maximizing impact.
                </p>
              </div>
            </div>
          </div>
          <div
            style={{
              //   borderLeft: "1px solid white",
              width: "380px",
              height: "500px",
              marginLeft: "30px",

              display: "flex",
              backgroundImage: `url(${Section3Pic})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </div>
      </div>
    </>
  );
}

export default Section3;
