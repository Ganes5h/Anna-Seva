import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  ThemeProvider,
  createTheme,
  Modal,
  Box,
} from "@mui/material";
import { useForm } from "react-hook-form";
import contactImage from "../../logo.svg";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

function Contact() {
  const { register, handleSubmit, reset } = useForm();
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#1F0954", // Your primary color
      },
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        "https://projectarthabackend.ajinkyatechnologies.com/api/contact/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        setSuccessModalOpen(true);
        reset(); // Reset form fields on successful submission
      } else {
        console.error("Failed to submit contact form:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to submit contact form:", error);
    }
  };

  const handleCloseSuccessModal = () => {
    setSuccessModalOpen(false);
  };

  return (
    <>
      <Navbar />
      {/* <ThemeProvider theme={theme}> */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Poppins",
          padding: "30px",
          //   height: "90vh",
        }}
        className=" bg-white shadow-md max-lg:h-auto"
      >
        {/* <div className="container mx-auto p-8 bg-[#] rounded-lg"> */}
        {/* <Typography
          variant="h3"
          sx={{ fontWeight: "bold", mb: 5 }}
          className="text-center"
        >
          Contact Us
        </Typography> */}

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          style={{
            width: "85%",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          }}
        >
          <div className="bg-white p-6 rounded-lg ">
            <h2 className="text-2xl font-bold mb-4">Contact Form</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                margin="normal"
                {...register("name")}
                InputProps={{
                  className: "contact-input",
                }}
              />
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                {...register("email")}
                InputProps={{
                  className: "contact-input",
                }}
              />
              <TextField
                fullWidth
                label="Message"
                variant="outlined"
                margin="normal"
                multiline
                rows={4}
                {...register("message")}
                InputProps={{
                  className: "contact-input",
                }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 2,
                  backgroundColor: "#1F0954",
                  color: "#ffffff",
                  "&:hover": { backgroundColor: "#260B6D" },
                }}
              >
                Submit
              </Button>
            </form>
          </div>
          <div className="bg-white p-6 rounded-lg ">
            <h2 className="text-2xl font-bold mb-4">Find more ways to Help!</h2>
            <p className="text-lg text-gray-700 mb-8">
              Weekend UX B 37/3 Ground Floor Double StoryRamesh Nagar , Near
              Raja Garden Chowk.Delhi: 110015
            </p>
            <p className="mb-8">Mobile No : +91 9599272754</p>
            {/* <div className="flex justify-center mb-8">
              <div
                style={{ display: "flex", justifyContent: "center" }}
                class=" text-center mt-5 wrapper"
              >
                <a className="ab">
                  <span>Get In Touch!</span>
                </a>
              </div>
            </div> */}
            {/* <p className="text-lg text-gray-700 mb-8">
              There are many ways to join us and support our mission. Contact us
              to find out more about volunteer opportunities, fundraising
              events, and ways that you can get our message to your friends and
              family.
            </p> */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15355.128836213824!2d74.47715720944824!3d15.815433798950721!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbf65c556d2f08f%3A0xcbbcbb73e1286392!2sKLS%20Gogte%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1716058943650!5m2!1sen!2sin"
              width="500"
              height="200"
              //   style="border:0;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        {/* </div> */}
      </div>

      {/* Success Modal */}
      <Modal
        open={successModalOpen}
        onClose={handleCloseSuccessModal}
        aria-labelledby="success-modal-title"
        aria-describedby="success-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            variant="h6"
            id="success-modal-title"
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            Success!
          </Typography>
          <Typography variant="body1" id="success-modal-description">
            Your message has been sent successfully.
          </Typography>
        </Box>
      </Modal>
      {/* </ThemeProvider> */}
      <Footer />
    </>
  );
}

export default Contact;

// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { Typography, TextField, Button, Modal, Box } from "@mui/material";
// import Navbar from "../Navbar/Navbar";
// import Footer from "../Footer/Footer";

// function Contact() {
//   const { register, handleSubmit, reset } = useForm();
//   const [successModalOpen, setSuccessModalOpen] = useState(false);

//   const onSubmit = async (data) => {
//     try {
//       const response = await fetch(
//         "https://projectarthabackend.ajinkyatechnologies.com/api/contact/contact",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(data),
//         }
//       );

//       if (response.ok) {
//         setSuccessModalOpen(true);
//         reset();
//       } else {
//         console.error("Failed to submit contact form:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Failed to submit contact form:", error);
//     }
//   };

//   const handleCloseSuccessModal = () => {
//     setSuccessModalOpen(false);
//   };

//   return (
//     <>
//       <Navbar />
//       <section
//         className="text-gray-600 body-font relative mt-2 mx-12 max-xl:mx-0"
//         style={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}
//       >
//         <div className="container px-5 py-16 mx-auto flex sm:flex-nowrap flex-wrap">
//           <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0 max-xl:m-0 m-8">
//             <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
//               Contact
//             </h2>
//             <p className="leading-relaxed mb-5 text-gray-600">
//               {/* Post-ironic portland shabby chic echo park, banjo fashion axe */}
//             </p>
//             <form onSubmit={handleSubmit(onSubmit)}>
//               <div className="relative mb-4">
//                 <label
//                   htmlFor="name"
//                   className="leading-7 text-sm text-gray-600"
//                 >
//                   Name
//                 </label>
//                 <TextField
//                   fullWidth
//                   id="name"
//                   name="name"
//                   variant="outlined"
//                   margin="normal"
//                   {...register("name")}
//                 />
//               </div>
//               <div className="relative mb-4">
//                 <label
//                   htmlFor="email"
//                   className="leading-7 text-sm text-gray-600"
//                 >
//                   Email
//                 </label>
//                 <TextField
//                   fullWidth
//                   id="email"
//                   name="email"
//                   variant="outlined"
//                   margin="normal"
//                   {...register("email")}
//                 />
//               </div>
//               <div className="relative mb-4">
//                 <label
//                   htmlFor="message"
//                   className="leading-7 text-sm text-gray-600"
//                 >
//                   Message
//                 </label>
//                 <TextField
//                   fullWidth
//                   id="message"
//                   name="message"
//                   variant="outlined"
//                   margin="normal"
//                   multiline
//                   rows={4}
//                   {...register("message")}
//                 />
//               </div>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 sx={{
//                   mt: 2,
//                   backgroundColor: "#1F0954",
//                   color: "#ffffff",
//                   "&:hover": { backgroundColor: "#260B6D" },
//                 }}
//               >
//                 Submit
//               </Button>
//             </form>
//             <p className="text-xs text-gray-500 mt-3">
//               Chicharrones blog helvetica normcore iceland tousled brook viral
//               artisan.
//             </p>
//           </div>
//           <div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
//             <iframe
//               width="100%"
//               height="100%"
//               className="absolute inset-0"
//               frameBorder="0"
//               title="map"
//               marginHeight="0"
//               marginWidth="0"
//               scrolling="no"
//               src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15355.128836213824!2d74.47715720944824!3d15.815433798950721!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbf65c556d2f08f%3A0xcbbcbb73e1286392!2sKLS%20Gogte%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1716058943650!5m2!1sen!2sin"
//               style={{ filter: "contrast(1.2) opacity(0.8)" }}
//             ></iframe>
//             <div className="bg-white relative flex flex-wrap py-6 rounded shadow-md">
//               <div className="lg:w-1/2 px-6">
//                 <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
//                   ADDRESS
//                 </h2>
//                 <p className="mt-1">
//                   Photo booth tattooed prism, portland taiyaki hoodie neutra
//                   typewriter
//                 </p>
//               </div>
//               <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
//                 <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
//                   EMAIL
//                 </h2>
//                 <a className="text-indigo-500 leading-relaxed">
//                   example@email.com
//                 </a>
//                 <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">
//                   PHONE
//                 </h2>
//                 <p className="leading-relaxed">123-456-7890</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <Modal
//         open={successModalOpen}
//         onClose={handleCloseSuccessModal}
//         aria-labelledby="success-modal-title"
//         aria-describedby="success-modal-description"
//       >
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             bgcolor: "white",
//             border: "2px solid #000",
//             boxShadow: 24,
//             p: 4,
//           }}
//         >
//           <Typography
//             variant="h6"
//             id="success-modal-title"
//             sx={{ fontWeight: "bold", mb: 2 }}
//           >
//             Success!
//           </Typography>
//           <Typography variant="body1" id="success-modal-description">
//             Your message has been sent successfully.
//           </Typography>
//         </Box>
//       </Modal>
//       <Footer />
//     </>
//   );
// }

// export default Contact;
