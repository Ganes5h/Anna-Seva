import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import Logo from "../../Images/Logo.svg";
// import FooterLogoSVG from "/images/NavLogo.png";

function Footer() {
  const navigation = ["About", "Resources", "Contact", "Donate"];
  const legal = ["Terms", "Privacy", "Legal"];
  return (
    <div style={{ fontFamily: "Poppins" }} className="relative bg-[#000000]">
      <div>
        <div className="grid max-w-screen-xl grid-cols-1 gap-10 pt-10 mx-auto border-t border-gray-100 dark:border-trueGray-700 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div>
              {" "}
              <div className="flex items-center justify-center space-x-2 text-2xl font-medium text-white dark:text-gray-100">
                <img
                  src={Logo}
                  alt="N"
                  width={60}
                  //   width="32"
                  height="32"
                  //   className="w-8"
                />
                {/* <FooterLogoSVG /> */}
                <h1
                  style={{
                    color: "white",
                    fontSize: "60px",
                    // paddingLeft: "40px",
                    fontFamily: "Dancing Script",
                    fontOpticalSizing: "auto",
                  }}
                >
                  Anna Seva
                </h1>
              </div>
            </div>

            <div className=" flex items-start justify-center flex-col max-w-md mt-8 mx-4 text-white ">
              <p>88/89 Peter Odili Road, Port Harcourt, Rivers State.</p>
              <p>+91 1234567890</p>
              {/* <p>
                You can also reach us by phone during business hours for
                immediate assistance.
              </p> */}
              <button className="bg-gray-800 inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-700 mt-4 focus:outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-6 h-6 text-white"
                  viewBox="0 0 512 512"
                >
                  <path d="M99.617 8.057a50.191 50.191 0 00-38.815-6.713l230.932 230.933 74.846-74.846L99.617 8.057zM32.139 20.116c-6.441 8.563-10.148 19.077-10.148 30.199v411.358c0 11.123 3.708 21.636 10.148 30.199l235.877-235.877L32.139 20.116zM464.261 212.087l-67.266-37.637-81.544 81.544 81.548 81.548 67.273-37.64c16.117-9.03 25.738-25.442 25.738-43.908s-9.621-34.877-25.749-43.907zM291.733 279.711L60.815 510.629c3.786.891 7.639 1.371 11.492 1.371a50.275 50.275 0 0027.31-8.07l266.965-149.372-74.849-74.847z"></path>
                </svg>
                <span className="ml-4 flex items-start flex-col leading-none">
                  <span className="text-xs text-gray-400 mb-1">GET IT ON</span>
                  <span className="title-font font-medium text-white">
                    Google Play
                  </span>
                </span>
              </button>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-center text-center mt-8  flex-wrap w-full -mt-2 -ml-3 lg:ml-0">
              {navigation.map((item, index) => (
                <div
                  key={index}
                  className="w-full px-4 py-2 text-white rounded-md "
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-center  text-center mt-8 flex-wrap w-full -mt-2 -ml-3 lg:ml-0">
              {legal.map((item, index) => (
                <div
                  key={index}
                  className="w-full px-4 py-2 text-white rounded-md "
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className=" flex items-center justify-center  text-center text-white">
            {/* <div>Follow us</div> */}
            <div className="flex mt-5 space-x-5 text-white ">
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener"
                className="hover:relative hover:top-[-3px] hover:transition-[top] hover:duration-300 hover:ease-in-out"
              >
                <TwitterIcon className="cursor-pointer" fontSize="large" />
              </a>

              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener"
                className="hover:relative hover:top-[-3px] hover:transition-[top] hover:duration-300 hover:ease-in-out"
              >
                <FacebookIcon className="cursor-pointer" fontSize="large" />
              </a>

              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener"
                className="hover:relative hover:top-[-3px] hover:transition-[top] hover:duration-300 hover:ease-in-out"
              >
                <InstagramIcon className="cursor-pointer" fontSize="large" />
              </a>

              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener"
                className="hover:relative hover:top-[-3px] hover:transition-[top] hover:duration-300 hover:ease-in-out"
              >
                <LinkedInIcon className="cursor-pointer" fontSize="large" />
              </a>
              {/* </a> */}
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 text-sm text-center text-white dark:text-gray-400">
          Copyright © {new Date().getFullYear()}. Made with ♥ by {""}
          <a href="/" target="_blank" rel="noopener">
            Team Tech Elites
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
