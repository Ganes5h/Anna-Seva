// import React, { useState, useRef } from "react";
// import SignatureCanvas from "react-signature-canvas";
// import {
//   Box,
//   Typography,
//   TextField,
//   Checkbox,
//   Button,
//   FormControlLabel,
//   Paper,
// } from "@mui/material";

// function TermsAndAgreement({ open, onClose, onSubmit }) {
//   const [agreed, setAgreed] = useState(false);
//   const [name, setName] = useState("");
//   const [position, setPosition] = useState("");
//   const [signatureImage, setSignatureImage] = useState(null);
//   const signatureRef = useRef();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!agreed || !name || !position || !signatureImage) {
//       alert("Please fill all fields and sign the agreement");
//       return;
//     }
//     onSubmit({ name, position, signatureImage });
//   };

//   const handleClear = () => {
//     signatureRef.current.clear();
//     setSignatureImage(null);
//   };

//   const handleSave = () => {
//     setSignatureImage(signatureRef.current.toDataURL());
//   };

//   return (
//     <Paper elevation={3} sx={{ p: 3, maxWidth: 800, mx: "auto", my: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         Terms of Service and Data Usage Agreement for Anna Seva
//       </Typography>

//       <Box
//         sx={{
//           mb: 2,
//           height: 200,
//           overflowY: "scroll",
//           border: "1px solid #ccc",
//           p: 2,
//         }}
//       >
//         <Typography variant="body2">
//           1. Purpose This agreement outlines the terms and conditions for
//           participation in the Anna Seva food donation program. 2. Compliance
//           with Regulations 2.1 The Hotel agrees to comply with all applicable
//           food safety regulations, including but not limited to the Food Safety
//           and Standards (Recovery and distribution of surplus food) Regulations,
//           2017. 2.2 The Hotel confirms it possesses a valid food safety license
//           under the FSS Act, 2006. 3. Food Donation Guidelines 3.1 The Hotel
//           will only donate surplus food that is safe for human consumption. 3.2
//           All donated food will be properly labeled, including name, source,
//           preparation date, and expiration date. 3.3 The Hotel will ensure
//           proper storage and handling of surplus food prior to donation. 4. Use
//           of Platform 4.1 The Hotel agrees to use Anna Seva solely for the
//           purpose of facilitating food donations. 4.2 The Hotel will not misuse
//           the platform or attempt to circumvent its intended functionality. 5.
//           Record Keeping 5.1 The Hotel will maintain accurate records of all
//           donations made through the platform. 5.2 These records will be made
//           available to Anna Seva or relevant authorities upon request. 6.
//           Liability 6.1 The Hotel acknowledges that it is donating food in good
//           faith and is protected from liability as per applicable laws. 6.2 The
//           Hotel agrees to indemnify and hold harmless Anna Seva from any claims
//           arising from the Hotel's use of the service. 7. Data Privacy 7.1 The
//           Hotel consents to the collection and processing of its data as
//           necessary for the operation of Anna Seva. 7.2 Anna Seva commits to
//           protecting the Hotel's data in accordance with applicable data
//           protection laws. 8. Termination 8.1 Either party may terminate this
//           agreement with written notice. 8.2 Anna Seva reserves the right to
//           suspend or terminate the Hotel's access in case of violation of these
//           terms. 9. Amendments 9.1 Anna Seva may amend these terms from time to
//           time, with notice provided to the Hotel.
//         </Typography>
//       </Box>

//       <form onSubmit={handleSubmit}>
//         <TextField
//           fullWidth
//           label="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           margin="normal"
//           required
//         />
//         <TextField
//           fullWidth
//           label="Position"
//           value={position}
//           onChange={(e) => setPosition(e.target.value)}
//           margin="normal"
//           required
//         />

//         <Box sx={{ my: 2 }}>
//           <Typography variant="subtitle1">Digital Signature:</Typography>
//           <SignatureCanvas
//             ref={signatureRef}
//             canvasProps={{
//               width: 500,
//               height: 200,
//               className: "signature-canvas",
//             }}
//             backgroundColor="rgb(240,240,240)"
//           />
//           <Box sx={{ mt: 1 }}>
//             <Button variant="outlined" onClick={handleClear} sx={{ mr: 1 }}>
//               Clear
//             </Button>
//             <Button variant="contained" onClick={handleSave}>
//               Save Signature
//             </Button>
//           </Box>
//         </Box>

//         <FormControlLabel
//           control={
//             <Checkbox
//               checked={agreed}
//               onChange={(e) => setAgreed(e.target.checked)}
//             />
//           }
//           label="I agree to the terms and privacy policy"
//         />

//         <Box sx={{ mt: 2 }}>
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             disabled={!agreed || !signatureImage}
//           >
//             Submit
//           </Button>
//         </Box>
//       </form>
//     </Paper>
//   );
// }

// export default TermsAndAgreement;



import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const TermsAndAgreement = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    signatureImage: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          signatureImage: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Terms and Conditions</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Position"
          name="position"
          value={formData.position}
          onChange={handleInputChange}
          margin="normal"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ margin: "16px 0" }}
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TermsAndAgreement;
