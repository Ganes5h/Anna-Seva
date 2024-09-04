import React from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import LandingPageTopImage from "../../Images/LandingPageTopImage.svg";
import Box1 from "../../Images/Three-box-1.svg";
import Box2 from "../../Images/Three-box-2.svg";
import Box3 from "../../Images/Three-box-3.svg";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section4";
import Gif from "../../Images/animatedgif.gif";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
function LandingPage() {
  return (
    <>
      <div>
        <Navbar />
        <div
          style={{
            // display: "flex",
            backgroundImage: `url(${LandingPageTopImage})`,
            height: "90vh",
            // width: "100%",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            alignItems: "center",
          }}
          className="container"
        >
          <section class=" body-font container">
            <div class="container mx-auto flex px-12 py-20 md:flex-row flex-col items-center">
              <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                    mr: 2,
                    ml: 2,
                    pr: 5,
                    py: 2,
                    flexGrow: 1,
                    display: { xs: "none", sm: "block" },
                    fontFamily: "Dancing Script",
                    fontOpticalSizing: "auto",
                    fontSize: 84,
                    fontWeight: "bold",
                    letterSpacing: ".1rem",
                    color: "white",
                    textDecoration: "none",
                  }}
                >
                  Anna Seva
                </Typography>
                <h1 class="text-white title-font lg:text-5xl text-4xl pb-2 mb-4 font-medium text-gray-900">
                  Transforming Surplus Food
                  {/* <br class="hidden lg:inline-block" /> */}
                </h1>
                <h1 class="text-white title-font lg:text-5xl text-4xl pb-2 mb-4 font-medium text-gray-900">
                  {/* <br class="hidden lg:inline-block" /> */}
                  into Hope!
                </h1>

                <p class="text-white  text-xl mb-8 leading-relaxed">
                  Every year, millions of tons of food go to waste while
                  millions of people go hungry. AnnaSeva transforms this surplus
                  food into a beacon of hope by connecting restaurants with
                  NGOs, ensuring that no meal goes to waste and no one goes
                  hungry.
                </p>
                <div class="flex justify-center">
                  {/* <button class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                    Button
                  </button> */}

                  <div className="flex justify-center">
                    <Link
                      to="/aboutus"
                      className="inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
                    >
                      What We Do
                    </Link>
                  </div>
                </div>
              </div>
              <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                {/* <img
                  class="object-cover object-center rounded"
                  alt="hero"
                  src={Gif}
                /> */}
              </div>
            </div>
          </section>
          {/* <div
            style={{
              //   border: "1px solid white",
              width: "600px",
              height: "400px",
              marginLeft: "100px",
            }}
          >
            <Typography variant="h2" style={{ color: "white" }}>
              Transforming Surplus Food into Hope!
            </Typography>
            <div style={{ width: "800px" }}>
              <Typography
                variant="h6"
                style={{ color: "white", padding: "30px" }}
              >
                Every year, millions of tons of food go to waste while millions
                of people go hungry. AnnaSeva transforms this surplus food into
                a beacon of hope by connecting restaurants with NGOs, ensuring
                that no meal goes to waste and no one goes hungry.
              </Typography>
            </div>
            <Button
              className="mx-4"
              style={{
                backgroundColor: "white",
                color: "black",
                margin: "30px",
                width: "200px",
                borderRadius: "40px",
              }}
            >
              What we do
            </Button>
          </div> */}
        </div>

        {/* Second div */}
        <Section2 />
        <Section3 />
        <Section4 />
        <Footer />
      </div>
    </>
  );
}

export default LandingPage;
