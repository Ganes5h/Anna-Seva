import React from "react";
import { Link } from "react-router-dom";
import "./Title.css";

function Title({ title }) {
  return (
    <div
      className="py-4 text-white font-bold"
      style={{
        // background: "linear-gradient(to right, #09C6F9, #045DE9)",
        background:
          "linear-gradient(107deg, rgb(255, 67, 5) 11.1%, rgb(245, 135, 0) 95.3%)",
        borderRadius: "8px",
        width: "100%",
      }}
    >
      <div className="px-4 max-w-7xl  flex justify-start items-center">
        <Link to="/admin">
          <div className=" button bbo">
            <div className=" button-box ">
              <span className="button-elem">
                <svg viewBox="0 0 46 40" xmlns="http://www.w3.org/2000/svg">
                  <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"></path>
                </svg>
              </span>
              <span className="button-elem">
                <svg viewBox="0 0 46 40">
                  <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"></path>
                </svg>
              </span>
            </div>
          </div>
        </Link>

        {/* <button className=" text-white font-semibold mx-2 py-2 px-4 rounded inline-flex items-center border border-white mr-4">
          <Link to="/admin">←</Link>
        </button> */}

        {/* <img src="/logo2.png" alt="Logo" className="h-12 w-auto" /> */}

        <h1 className="text-3xl ml-4">{title}</h1>
      </div>
    </div>
  );
}

export default Title;
