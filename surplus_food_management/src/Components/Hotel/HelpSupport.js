import React from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import Title from "../Title/Title";
const HelpAndSupport = () => {
  return (
    <Box
      sx={{
        maxWidth: "1000px",
        margin: "auto",
        padding: 3,
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
        borderRadius: 2,
        backgroundColor: "white",
      }}
    >
      <Title title="Help and Support"></Title>
      {/* <Typography variant="h4" component="h1" gutterBottom>
        Help and Support
      </Typography> */}
      <Typography variant="body1" gutterBottom style={{ paddingTop: "10px" }}>
        If you have any questions or need further assistance, please check out
        the FAQs below or contact our support team.
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h6" gutterBottom>
              FAQs
            </Typography>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">
                  How can I register my restaurant?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  To register your restaurant, go to the "Register" section in
                  the menu, fill out the required details, and submit the form.
                  Our team will review your application and get back to you
                  within 24 hours.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">
                  How do I notify NGOs about available surplus food?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Once you have registered and logged in, navigate to the
                  "Surplus Food" section. Here, you can add details about the
                  available surplus food, and it will be automatically notified
                  to the registered NGOs in your area.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">
                  How do NGOs request surplus food?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  NGOs can browse the available surplus food in the "Available
                  Surplus" section. They can then request the food by clicking
                  the "Request" button next to the listing and filling out the
                  necessary details.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">
                  What if multiple NGOs request the same surplus food?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  In case of multiple requests for the same surplus food, the
                  system will allocate the food based on the time of request and
                  the needs specified by the NGOs. Priority will be given to the
                  NGO with the most urgent need.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <PhoneIcon />
                </ListItemIcon>
                <ListItemText primary="Phone" secondary="+91-12345-67890" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <EmailIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Email"
                  secondary="support@surplustoserve.com"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <SupportAgentIcon />
                </ListItemIcon>
                <ListItemText primary="Live Chat" secondary="Available 24/7" />
              </ListItem>
            </List>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Need More Help?
          </Typography>
          <Typography variant="body1" gutterBottom>
            If you need further assistance, please do not hesitate to reach out
            to our support team. We are here to help you 24/7.
          </Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            Contact Support
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default HelpAndSupport;
