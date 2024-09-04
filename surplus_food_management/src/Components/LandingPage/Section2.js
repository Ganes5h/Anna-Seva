import React from "react";
import Box1 from "../../Images/Three-box-1.svg";
import Box2 from "../../Images/Three-box-2.svg";
import Box3 from "../../Images/Three-box-3.svg";
function Section2() {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "80%",
            // height: "100px",
            //   marginLeft: "30px",
            padding: "30px",
            //   border: "1px solid red",
          }}
        >
          <h1
            style={{ color: "#009944", fontSize: "40px", fontWeight: "bold" }}
          >
            Connecting restaurants with NGOs to eliminate food waste and fight
            hunger.
          </h1>
          <p className="pt-4">
            Our platform simplifies the process of donating surplus food, making
            it easier for restaurants to contribute to their communities and for
            NGOs to receive the resources they need to combat hunger
            effectively.
          </p>
        </div>
      </div>
      <div
        className="max-xl:flex-col"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "30px",
          // flexDirection: "column",
          // height: "100vh",
        }}
      >
        <div
          style={{
            position: "relative",
            border: "1px solid black",
            height: "400px",
            width: "400px",
            margin: "20px",
            borderRadius: "20px",

            display: "flex",
            backgroundImage: `url(${Box1})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            overflow: "hidden",
            //   alignItems: "center",
          }}
        >
          <div
            style={{
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the opacity as needed
              borderRadius: "20px",
              color: "white",
            }}
          >
            <h1 className="pt-24 px-8 lg:text-3xl text-2xl font-semibold">
              Mission Smile: <br />
              1k meals for Orphans
            </h1>
            <p className="px-8 pt-8">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam
              obcaecati impedit eum, aspernatur architecto mollitia officia
              consequatur earum sint sit!
            </p>
          </div>
        </div>
        <div
          style={{
            position: "relative",
            border: "1px solid black",
            height: "400px",
            width: "400px",
            margin: "20px",
            borderRadius: "20px",

            display: "flex",
            backgroundImage: `url(${Box2})`,

            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the opacity as needed
              borderRadius: "20px",
              color: "white",
            }}
          >
            <h1 className="pt-24 px-8 lg:text-3xl text-2xl font-semibold">
              Weekly excursions <br />
            </h1>
            <p className="px-8 pt-8">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam
              obcaecati impedit eum, aspernatur architecto mollitia officia
              consequatur earum sint sit!
            </p>
          </div>
        </div>
        <div
          style={{
            position: "relative",
            border: "1px solid black",
            height: "400px",
            width: "400px",
            margin: "20px",
            borderRadius: "20px",

            display: "flex",
            backgroundImage: `url(${Box3})`,

            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the opacity as needed
              borderRadius: "20px",
              color: "white",
            }}
          >
            {" "}
            <h1 className="pt-24 px-8 lg:text-3xl text-2xl font-semibold">
              Monthly public awareness
              <br />
            </h1>
            <p className="px-8 pt-8">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam
              obcaecati impedit eum, aspernatur architecto mollitia officia
              consequatur earum sint sit!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Section2;
