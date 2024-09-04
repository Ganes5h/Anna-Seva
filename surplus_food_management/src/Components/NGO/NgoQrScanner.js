import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useSelector } from "react-redux";
import { BrowserQRCodeReader } from "@zxing/library";
import {
  Button,
  Container,
  Paper,
  Typography,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";
import { toast } from "sonner";

const QrScanner = ({ donationId }) => {
  const { user } = useSelector((state) => state.auth);
  const [scanMethod, setScanMethod] = useState("webcam");
  const [scannedResult, setScannedResult] = useState("");
  const [error, setError] = useState("");
  const [showSendButton, setShowSendButton] = useState(false); // State to control button visibility
  const [loading, setLoading] = useState(false); // State to control loading state

  const handleImageDrop = (acceptedFiles) => {
    if (acceptedFiles.length) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = () => {
        const qrCodeReader = new BrowserQRCodeReader();
        qrCodeReader
          .decodeFromImageUrl(reader.result)
          .then((result) => {
            setScannedResult(result.text);
            setShowSendButton(true); // Show button after successful scan
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

  const handleScan = async (result) => {
    if (result) {
      setScannedResult(result.text);
      setShowSendButton(true); // Show button after successful scan
    }
  };

  const handleError = (err) => {
    setError(err.message);
  };

  const sendRequestToAPI = async () => {
    if (scannedResult) {
      setLoading(true); // Show loading indicator
      try {
        // Fetch tracking id using scanned result
        const response = await axios.get(
          `http://annaseva.ajinkyatechnologies.in/api/tracking/tracking/donation?id=${donationId}`
        );

        // Extract trackingId from the response data
        const trackingId = response.data.trackingRecords[0]._id;

        // Make POST request to update status to NGO
        const ngoResponse = await axios.post(
          `http://annaseva.ajinkyatechnologies.in/api/tracking/scan/ngo?id=${trackingId}`
        );

        toast.success("Status updated to NGO successfully.");
      } catch (error) {
        setError(error.message);
        toast.error("Failed to update status to NGO.");
      } finally {
        setLoading(false); // Hide loading indicator
      }
    }
  };

  return (
    <Container>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8} lg={12}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h5" align="center" gutterBottom>
              QR Scanner
            </Typography>
            {!scannedResult && (
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
                  color="secondary"
                >
                  Upload Image
                </Button>
              </Box>
            )}
            {scanMethod === "webcam" && !scannedResult && (
              <QrReader
                delay={300}
                onResult={handleScan}
                onError={handleError}
                style={{ width: "100%" }}
                constraints={{ facingMode: "user" }}
              />
            )}
            {scanMethod === "image" && !scannedResult && (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <Paper>
                  <Typography align="center">
                    Drag and drop an image or click to select a file
                  </Typography>
                </Paper>
              </div>
            )}
            {error && (
              <Typography variant="body1" align="center" color="error" mt={2}>
                {error}
              </Typography>
            )}
            {scannedResult && (
              <Box mt={3} textAlign="center">
                <Typography variant="body1">
                  Scanned Result: {scannedResult}
                </Typography>
                {showSendButton && ( // Conditionally render the button
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={sendRequestToAPI}
                    style={{ marginTop: "10px" }}
                    disabled={loading}
                  >
                    {loading ? (
                      <CircularProgress size={24} />
                    ) : (
                      "Check Donation"
                    )}
                  </Button>
                )}
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default QrScanner;
