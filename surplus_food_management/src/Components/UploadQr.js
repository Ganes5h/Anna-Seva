import React, { useRef, useState } from "react";
import { QrReader } from "react-qr-reader";

const QRCodeScanner = () => {
  const qrRef = useRef(null);
  const [result, setResult] = useState("");

  const handleScan = (result) => {
    if (result) {
      setResult(result?.text || "No result");
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  const openDialog = () => {
    if (qrRef.current) {
      qrRef.current.openImageDialog();
    }
  };

  return (
    <div>
      <h2>QR Code Scanner</h2>
      <button onClick={openDialog}>Select File</button>
      <QrReader
        ref={qrRef}
        delay={300}
        onError={handleError}
        onResult={handleScan}
        legacyMode={true}
      />
      {result && <p>Scan Result: {result}</p>}
    </div>
  );
};

export default QRCodeScanner;
