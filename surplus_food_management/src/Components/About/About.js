import React from "react";

// import annaSevaImage from "../../Images/Section-4.svg";
// import missionImage from "../../Images/Section-4.svg";
// import visionImage from "../../Images/Section-4.svg";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import About1 from "../../Images/about1.svg";
import About2 from "../../Images/about2.svg";
import { Typography } from "@mui/material";
const About = () => {
  return (
    <>
      <Navbar />
      <div className="">
        <div className="aboutus container bg-black text-white mt-2 min-h-screen text-center">
          <h1 className="py-8 text-4xl text-[#37ffc0] font-bold">ABOUT US</h1>
          <div className="container grid grid-cols-6 gap-4">
            <div className="col-start-1 text-lg  col-span-4 lg:col-span-3">
              AnnaSeva aims to eliminate food waste and fight hunger by
              connecting surplus food from restaurants to NGOs. Our mission is
              to create a sustainable food system where no meal goes to waste
              and every individual has access to nutritious food. We envision a
              world where every meal is shared and no one goes hungry. By
              fostering collaboration between restaurants and NGOs, AnnaSeva
              strives to build a community that values sustainability and
              compassion.
            </div>

            <div className="col-start-3 text-lg  col-end-7 lg:ml-44">
              Our platform is designed to be user-friendly and efficient.
              Restaurants can quickly list their surplus food items, providing
              details about the type and quantity available. This information is
              immediately accessible to registered NGOs, who can browse the
              listings and request the food they need. Our system uses smart
              algorithms to ensure fair distribution, prioritizing requests
              based on urgency and proximity to maximize impact.
            </div>

            <div className="col-start-1 text-lg col-span-4 lg:col-span-3">
              AnnaSeva is more than just a technological solution; it's about
              fostering a community of sustainability and generosity. We
              collaborate with local businesses, community organizations, and
              volunteers to promote our mission. Real-time notifications keep
              everyone informed, and integrated mapping features help NGOs
              locate the nearest participating restaurants, making the logistics
              of food redistribution seamless and efficient.
            </div>
          </div>
        </div>

        <div className="container mt-8 ">
          <div className="min-h-screen grid grid-cols-5">
            <div className="col-start-1 col-span-3 px-20">
              <h1 className="my-4 text-3xl text-[#20B486] font-bold ">
                Our Vision
              </h1>
              <p className="text-lg ">
                We envision a world where every meal is shared and no one goes
                hungry. By fostering collaboration between restaurants and NGOs,
                AnnaSeva strives to build a community that values sustainability
                and compassion.AnnaSeva aims to eliminate food waste and fight
                hunger by connecting surplus food from restaurants to NGOs. Our
                mission is to create a sustainable food system where no meal
                goes to waste and every individual has access to nutritious
                food.
              </p>
            </div>
            <div className="col-start-4 col-span-2">
              <img
                src={About1}
                alt=""
                className="w-[300px] h-auto max-w-sm mx-auto"
              />
            </div>
            <div className="col-start-1 col-span-2">
              <img
                src={About2}
                alt=""
                className="w-[300px] h-auto max-w-sm mx-auto"
              />
            </div>
            <div className="col-start-3 col-span-4 px-20">
              <h1 className="my-4 text-3xl text-[#20B486] font-bold">
                Our Mission
              </h1>

              <p className="text-lg ">
                AnnaSeva aims to eliminate food waste and fight hunger by
                connecting surplus food from restaurants to NGOs. Our mission is
                to create a sustainable food system where no meal goes to waste
                and every individual has access to nutritious food. We envision
                a world where every meal is shared and no one goes hungry. By
                fostering collaboration between restaurants and NGOs, AnnaSeva
                strives to build a community that values sustainability and
                compassion.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
