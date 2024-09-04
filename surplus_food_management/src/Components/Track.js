import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  Button,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import "./Track.css";

const steps = [
  "Order Placed",
  "Processing",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];

function DeliveryTracking() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const ColorlibConnector = () => {
    return <StepConnector className="connector" />;
  };

  const ColorlibStepIcon = ({ active, completed, label }) => {
    return (
      <div className={`stepContainer ${completed ? "completedStep" : ""}`}>
        <div
          className={`icon ${active ? "activeIcon" : ""} ${
            completed ? "completedIcon" : ""
          }`}
        >
          {completed ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
        </div>
        <div className="stepText">{label}</div>
      </div>
    );
  };

  return (
    <div className="deliveryTrackingContainer">
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {steps.map((label) => (
          <Step key={label} className="step">
            <StepLabel
              StepIconComponent={(props) => (
                <ColorlibStepIcon {...props} label={label} />
              )}
            />
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length ? (
        <div className="deliveryCompleteContainer">
          <Typography variant="h5" gutterBottom>
            Delivery Completed!
          </Typography>
          <Button onClick={handleReset}>Reset</Button>
        </div>
      ) : (
        <div className="buttonContainer">
          <Button variant="contained" color="primary" onClick={handleNext}>
            {activeStep === steps.length - 1 ? "Complete Delivery" : "Next"}
          </Button>
        </div>
      )}
    </div>
  );
}

export default DeliveryTracking;
