import React, { useState } from "react";
import backGroundImage from "../../Images/BackgroundImage.svg";
import {
  Button,
  Box,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { toast } from "sonner";
import logo from "../../Images/Logo.svg";
import ReCAPTCHA from "react-google-recaptcha";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth/authSlice";

import { useRef } from "react";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "admin",
  });
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const recaptchaRef = React.useRef();

  const handleRecaptchaChange = (value) => {
    if (value) {
      setIsVerified(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.email) {
      toast.error("Email is required");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Email is invalid");
      return false;
    }
    if (!formData.password) {
      toast.error("Password is required");
      return false;
    }
    return true;
  };

  const handleCaptchaChange = (value) => {
    setIsVerified(!!value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!isVerified) {
      toast.error("Please complete the reCAPTCHA verification.");
      return;
    }

    dispatch(login(formData)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Login Successful");

        // Redirect based on user role
        navigate("/admin_select_type");
      } else {
        toast.error(
          `Login failed: ${
            result.payload ? result.payload.message : "Unknown error"
          }`
        );
      }
    });
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backGroundImage})`,
        height: "100vh",
        width: "100%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box display="flex" justifyContent="flex-end">
        <Box
          width="100%"
          height="50px"
          borderRadius="50px"
          display="flex"
          alignItems="center"
          justifyContent="end"
          padding="10px"
        >
          <Link to="/register">
            <Button
              variant="contained"
              color="success"
              sx={{
                borderRadius: "50px",
                backgroundColor: "#20B486",
                "&:hover": {
                  backgroundColor: "#1A946D ",
                },
              }}
            >
              Register
            </Button>
          </Link>
        </Box>
      </Box>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={logo} width={70} alt="logo" />
          <h1
            style={{
              color: "white",
              fontSize: "60px",
              paddingLeft: "20px",
              fontFamily: "Dancing Script",
              fontOpticalSizing: "auto",
            }}
          >
            Anna Seva
          </h1>
        </div>
        <h1
          style={{
            color: "white",
            fontSize: "40px",
            fontWeight: "bold",
            py: 8,
          }}
        >
          Login
        </h1>
        <form
          style={{
            maxWidth: "600px",
            padding: "20px",
            border: "1px solid white",
            borderRadius: "10px",
          }}
          onSubmit={handleSubmit}
        >
          <TextField
            name="email"
            placeholder="Enter your Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleInputChange}
            required
            InputProps={{
              startAdornment: (
                <EmailIcon sx={{ color: "black", marginRight: "10px" }} />
              ),
              sx: { borderRadius: "20px", backgroundColor: "white" },
            }}
          />
          <TextField
            name="password"
            placeholder="Enter your Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleInputChange}
            required
            InputProps={{
              startAdornment: (
                <LockIcon sx={{ color: "black", marginRight: "10px" }} />
              ),
              sx: { borderRadius: "20px", backgroundColor: "white" },
            }}
          />
          {/* <FormControl component="fieldset" margin="normal" fullWidth>
            <RadioGroup
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              row
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FormControlLabel
                value="user"
                control={<Radio style={{ color: "white" }} />}
                label={<Typography style={{ color: "white" }}>User</Typography>}
              />
              <FormControlLabel
                value="hotel"
                control={<Radio style={{ color: "white" }} />}
                label={
                  <Typography style={{ color: "white" }}>Hotel</Typography>
                }
              />
              <FormControlLabel
                value="ngo"
                control={<Radio style={{ color: "white" }} />}
                label={<Typography style={{ color: "white" }}>NGO</Typography>}
              />
              <FormControlLabel
                value="volunteer"
                control={<Radio style={{ color: "white" }} />}
                label={
                  <Typography style={{ color: "white" }}>Volunteer</Typography>
                }
              />
            </RadioGroup>
          </FormControl> */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="6LedhYQpAAAAAPjssU5QXcYcacOWUWgN36HAW4iy"
              onChange={handleRecaptchaChange}
            />{" "}
          </div>
          <p
            style={{
              color: "white",
              alignItems: "center",
              textAlign: "center",
              fontSize: "12px",
              padding: "10px",
            }}
          >
            By signing in to Anna Seva, you agree to our Terms and Privacy
            Policy.
          </p>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              height: "50px",
              borderRadius: "20px",
              backgroundColor: "#20B486",
              "&:hover": {
                backgroundColor: "#1A946D ",
              },
            }}
          >
            Login
          </Button>
          {/* {error && (
            <Typography color="error" align="center">
              {error}
            </Typography>
          )} */}
          <div style={{ marginTop: "40px" }}>
            <p
              style={{
                color: "white",
                alignItems: "center",
                textAlign: "center",
                fontSize: "12px",
              }}
            >
              This site is protected by reCAPTCHA Enterprise and the Google
              Privacy Policy and Terms of Service apply.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
