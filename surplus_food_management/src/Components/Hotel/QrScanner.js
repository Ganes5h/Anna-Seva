// import React, { useState } from "react";
// import { QrReader } from "react-qr-reader";
// import { useDropzone } from "react-dropzone";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { BrowserQRCodeReader } from "@zxing/library"; // Import the library
// import {
//   Button,
//   TextField,
//   Container,
//   Paper,
//   Typography,
//   Grid,
// } from "@mui/material";

// const QrScanner = () => {
//   const { user } = useSelector((state) => state.auth);
//   const [scanMethod, setScanMethod] = useState("webcam");
//   const [scannedResult, setScannedResult] = useState("");
//   const [error, setError] = useState("");
//   const [agencyName, setAgencyName] = useState("");
//   const [deliveryPersonName, setDeliveryPersonName] = useState("");
//   const [deliveryPersonContact, setDeliveryPersonContact] = useState("");

//   const handleImageDrop = (acceptedFiles) => {
//     if (acceptedFiles.length) {
//       const file = acceptedFiles[0];
//       const reader = new FileReader();
//       reader.onload = () => {
//         const qrCodeReader = new BrowserQRCodeReader(); // Initialize the reader
//         qrCodeReader
//           .decodeFromImageUrl(reader.result)
//           .then((result) => {
//             setScannedResult(result.text);
//           })
//           .catch((err) => {
//             setError(err.message);
//           });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const { getRootProps, getInputProps, open } = useDropzone({
//     accept: "image/*",
//     onDrop: handleImageDrop,
//   });

//   const handleScan = (result) => {
//     if (result) {
//       setScannedResult(result.text);
//     }
//   };

//   const handleError = (err) => {
//     setError(err.message);
//   };

//   const copyToClipboard = () => {
//     if (scannedResult) {
//       navigator.clipboard.writeText(scannedResult);
//     }
//   };

//   const sendRequestToAPI = async () => {
//     if (scannedResult) {
//       try {
//         const requestData = {
//           hotelId: user._id,
//           location: user.location,
//           agencyName,
//           deliveryPersonName,
//           deliveryPersonContact,
//           percentageReached: 0,
//         };

//         const response = await axios.post(
//           `http://localhost:5000/api/tracking/scan/hotel?id=${scannedResult}`,
//           requestData
//         );
//         // Handle the API response
//         console.log(response.data);
//       } catch (error) {
//         setError(error.message);
//       }
//     }
//   };

//   return (
//     <Container>
//       <Grid container spacing={3}>
//         <Grid item xs={12}>
//           <Paper elevation={3}>
//             <Typography variant="h5" align="center">
//               QR Scanner
//             </Typography>
//             <div style={{ textAlign: "center", margin: "20px" }}>
//               <Button
//                 variant="contained"
//                 onClick={() => setScanMethod("webcam")}
//               >
//                 Use Webcam
//               </Button>{" "}
//               <Button variant="contained" onClick={open}>
//                 Upload Image
//               </Button>
//             </div>
//           </Paper>
//         </Grid>
//         <Grid item xs={12}>
//           {scanMethod === "webcam" ? (
//             <QrReader
//               delay={300}
//               onResult={handleScan}
//               onError={handleError}
//               style={{ width: "100%" }}
//               constraints={{ facingMode: "user" }}
//             />
//           ) : (
//             <div {...getRootProps()}>
//               <input {...getInputProps()} />
//               <Paper elevation={3}>
//                 <Typography align="center" style={{ margin: "10px" }}>
//                   Drag and drop an image or click to select a file
//                 </Typography>
//               </Paper>
//             </div>
//           )}
//         </Grid>
//         {error && (
//           <Grid item xs={12}>
//             <Paper elevation={3}>
//               <Typography variant="body1" align="center" color="error">
//                 {error}
//               </Typography>
//             </Paper>
//           </Grid>
//         )}
//         {scannedResult && (
//           <Grid item xs={12}>
//             <Paper elevation={3}>
//               <Typography variant="body1" align="center">
//                 Scanned Result: {scannedResult}
//               </Typography>
//               <div style={{ textAlign: "center", margin: "20px" }}>
//                 <Button variant="contained" onClick={copyToClipboard}>
//                   Copy Result
//                 </Button>{" "}
//                 <TextField
//                   label="Agency Name"
//                   value={agencyName}
//                   onChange={(e) => setAgencyName(e.target.value)}
//                   style={{ marginRight: "10px" }}
//                 />
//                 <TextField
//                   label="Delivery Person Name"
//                   value={deliveryPersonName}
//                   onChange={(e) => setDeliveryPersonName(e.target.value)}
//                   style={{ marginRight: "10px" }}
//                 />
//                 <TextField
//                   label="Delivery Person Contact"
//                   value={deliveryPersonContact}
//                   onChange={(e) => setDeliveryPersonContact(e.target.value)}
//                   style={{ marginRight: "10px" }}
//                 />
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={sendRequestToAPI}
//                 >
//                   Send Request to API
//                 </Button>
//               </div>
//             </Paper>
//           </Grid>
//         )}
//       </Grid>
//     </Container>
//   );
// };

// export default QrScanner;

import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useSelector } from "react-redux";
import { BrowserQRCodeReader } from "@zxing/library"; // Import the library
import {
  Button,
  TextField,
  Container,
  Paper,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import { toast } from "sonner";

const QrScanner = () => {
  const { user } = useSelector((state) => state.auth);
  const [scanMethod, setScanMethod] = useState("webcam");
  const [scannedResult, setScannedResult] = useState("");
  const [error, setError] = useState("");
  const [agencyName, setAgencyName] = useState("");
  const [deliveryPersonName, setDeliveryPersonName] = useState("");
  const [deliveryPersonContact, setDeliveryPersonContact] = useState("");

  const handleImageDrop = (acceptedFiles) => {
    if (acceptedFiles.length) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = () => {
        const qrCodeReader = new BrowserQRCodeReader(); // Initialize the reader
        qrCodeReader
          .decodeFromImageUrl(reader.result)
          .then((result) => {
            setScannedResult(result.text);
          })
          .catch((err) => {
            setError(err.message);
          });
      };
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: "image/*",
    onDrop: handleImageDrop,
  });

  const handleScan = (result) => {
    if (result) {
      setScannedResult(result.text);
    }
  };

  const handleError = (err) => {
    setError(err.message);
  };

  const sendRequestToAPI = async () => {
    if (scannedResult) {
      try {
        const requestData = {
          hotelId: user._id,
          // location: user.location.coordinates,
          agencyName,
          deliveryPersonName,
          deliveryPersonContact,
          percentageReached: 0,
        };

        const response = await axios.post(
          `http://localhost:5000/api/tracking/scan/hotel?id=${scannedResult}`,
          requestData
        );
        // Handle the API response
        console.log(response.data);
        toast.success("Status changed to shippted");
      } catch (error) {
        setError(error.message);
        toast.success("Status changed to shippted");
      }
    }
  };

  return (
    <Container>
      <Grid container justifyContent="center">
        <Grid>
          <Paper style={{ maxWidth: "md" }}>
            <Typography variant="h5" align="center" gutterBottom>
              QR Scanner
            </Typography>
            {!scannedResult ? (
              <Box textAlign="center" mb={2}>
                <Button
                  variant="contained"
                  onClick={() => setScanMethod("webcam")}
                  disabled={scanMethod === "webcam"}
                  style={{ margin: "10px" }}
                >
                  Use Webcam
                </Button>
                <Button
                  variant="contained"
                  onClick={open}
                  disabled={scanMethod === "image"}
                  style={{ margin: "10px" }}
                >
                  Upload Image
                </Button>
              </Box>
            ) : (
              <Typography variant="h6" align="center" gutterBottom>
                Scan successful! Please fill out the details below.
              </Typography>
            )}
            {scanMethod === "webcam" && !scannedResult ? (
              <QrReader
                delay={300}
                onResult={handleScan}
                onError={handleError}
                style={{ width: "100%" }}
                constraints={{ facingMode: "user" }}
              />
            ) : scanMethod === "image" && !scannedResult ? (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <Paper>
                  <Typography align="center">
                    Drag and drop an image or click to select a file
                  </Typography>
                </Paper>
              </div>
            ) : null}
            {error && (
              <Typography variant="body1" align="center" color="error" mt={2}>
                {error}
              </Typography>
            )}
            {scannedResult && (
              <Box mt={3}>
                <TextField
                  label="Scanned Result"
                  value={scannedResult}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  label="Agency Name"
                  value={agencyName}
                  onChange={(e) => setAgencyName(e.target.value)}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  label="Delivery Person Name"
                  value={deliveryPersonName}
                  onChange={(e) => setDeliveryPersonName(e.target.value)}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  label="Delivery Person Contact"
                  value={deliveryPersonContact}
                  onChange={(e) => setDeliveryPersonContact(e.target.value)}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
                <Box textAlign="center" mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={sendRequestToAPI}
                  >
                    Send Request to API
                  </Button>
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default QrScanner;
