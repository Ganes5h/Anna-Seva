import React, { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";

function Qr() {
  const [webCamResult, setWebCamResult] = useState("No result");
  const [isReaderActive, setIsReaderActive] = useState(true);

  useEffect(() => {
    return () => {
      setIsReaderActive(false);
    };
  }, []);

  const handleScan = (result) => {
    if (result) {
      setWebCamResult(result?.text);
    }
  };

  const handleError = (error) => {
    if (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div style={{ width: "500px", height: "500px" }}>
        {/* {isReaderActive && ( */}
        <QrReader
          delay={300}
          onResult={(result, error) => {
            if (result) {
              handleScan(result);
            }
            if (error) {
              handleError(error);
            }
          }}
          style={{ width: "100%" }}
          constraints={{ facingMode: "user" }}
        />
        {/* )} */}
      </div>
      <div>
        <h6>WebCam Result: {webCamResult}</h6>
      </div>
    </div>
  );
}

export default Qr;
