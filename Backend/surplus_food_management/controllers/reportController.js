const multer = require('multer');
const path = require('path');
const nodemailer = require('nodemailer');
const Report = require('../models/reportModel');
const Donation = require('../models/donationModel');
const Hotel = require('../models/hotelModel');
const NGO = require('../models/ngoModel');
const Notification = require('../models/notificationModel');

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'annaseva.org@gmail.com',
    pass: 'cfsoabwwgsodwsvw'
  }
});

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/reports'); // Set the destination folder for reports
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, 'report-' + uniqueSuffix + extension); // Set the filename for the report file
  }
});

const upload = multer({ storage: storage });

// Controller to create a new report by an NGO
exports.createReport = async (req, res) => {
  try {
    const { donationId, reason } = req.body;
    const reportedBy = req.query.id; 
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const report = await Report.create({
      donation: donationId,
      reason,
      reportedBy,
      reportFile: req.file.path 
    });

    // Find the hotel associated with the reported donation
    const donation = await Donation.findById(donationId).populate('hotel');

    // Notify the hotel about the new report
    if (donation && donation.hotel) {
      sendNotificationToHotel(donation.hotel, report);
    }

    res.status(201).json({ success: true, report });
  } catch (error) {
    console.error('Error creating report:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Helper function to send notifications to hotel
async function sendNotificationToHotel(hotel, report) {
  const mailOptions = {
    from: 'annaseva.org@gmail.com',
    to: hotel.email,
    subject: 'Report on Donation',
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Report on Donation</title>
        <style>
          body, h1, p {
            margin: 0;
            padding: 0;
          }
          .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
            font-family: Arial, sans-serif;
          }
          .header {
            background-color: #4CAF50;
            color: white;
            padding: 10px;
            text-align: center;
          }
          .content {
            padding: 20px;
            background-color: white;
            border-radius: 5px;
            margin-top: 20px;
          }
          .details {
            margin-bottom: 20px;
          }
          .details p {
            margin-bottom: 10px;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Report on Donation</h1>
          </div>
          <div class="content">
            <div class="details">
              <p><strong>Reported By:</strong> NGO</p>
              <p><strong>Reason:</strong> ${report.reason}</p>
            </div>
            <div class="footer">
              <p>&copy; 2024 Anna Seva Developed by Tech Elites. All rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Notification sent to ${hotel.email}`);

    // Create an in-app notification for the hotel
    const notification = new Notification({
      recipient: hotel._id,
      message: `New report on donation: ${report.donation}`,
      type: 'NewReport',
      metadata: { reportId: report._id }
    });
    await notification.save();

  } catch (error) {
    console.error(`Error sending notification to ${hotel.email}: ${error.message}`);
  }
}
