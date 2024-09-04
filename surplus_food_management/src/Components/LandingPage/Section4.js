import React from "react";
import section4Pic from "../../Images/Section-4.svg";
import { Button, Typography } from "@mui/material";
function Section4() {
  return (
    <>
      <div
        style={{
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            backgroundImage: `url(${section4Pic})`,
            height: "70%",
            width: "80%",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            alignItems: "center",
            borderRadius: "20px",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h3"
            style={{
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            You can contribute to provide a meal for needy with special needs!
          </Typography>
          <div className="py-4">
            <Button
              style={{
                backgroundColor: "yellow",
                color: "black",
                marginRight: "30px",
                fontWeight: "bold",
                px: 12,
                py: 4,
              }}
            >
              Join as a volunteer
            </Button>
            <Button
              className="mx-4"
              style={{
                backgroundColor: "white",
                color: "black",
                fontWeight: "bold",
                px: 12,
                py: 4,
              }}
            >
              Donate
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Section4;
