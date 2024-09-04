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
import Title from "../Title/Title1";

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
      <Title title="Help and Support "></Title>
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
                <Typography variant="h6">How can I register my NGO?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  To register your NGO, go to the "Register" section in the
                  menu, fill out the required details, and submit the form. Our
                  team will review your application and get back to you within
                  24 hours.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">
                  How do I request surplus food?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Once you have registered and logged in, navigate to the
                  "Available Surplus" section. Here, you can browse the
                  available surplus food and request the items you need by
                  clicking the "Request" button and filling out the necessary
                  details.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">
                  How do I know if my request has been approved?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  You will receive a notification in your account and an email
                  once your request has been approved. You can also check the
                  status of your requests in the "My Requests" section.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">
                  What if I need to cancel a request?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  If you need to cancel a request, go to the "My Requests"
                  section, find the request you want to cancel, and click the
                  "Cancel" button. You will receive a confirmation email once
                  the request has been canceled.
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
          <Button
            sx={{
              backgroundColor: "#20B486",
              "&:hover": {
                backgroundColor: "#1A946D ",
              },
              mt: 2,
            }}
            variant="contained"
          >
            Contact Support
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default HelpAndSupport;
