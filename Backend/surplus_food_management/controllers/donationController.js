const Hotel = require('../models/hotelModel');
const Donation = require('../models/donationModel');
const NGO = require('../models/ngoModel');
const Report = require('../models/reportModel');
const geolib = require('geolib');
const nodemailer = require('nodemailer');
const qrcode = require('qrcode');
const multer = require('multer');
const Notification = require('../models/notificationModel')
const path = require('path');
const fs = require('fs');
const Request = require('../models/requestModel')
const PDFDocument = require('pdfkit');
const Volunteer = require('../models/volunteerModel')
const Tracking = require('../models/trackingModel')
const generateQRCode = require('../utils/qrCodeGenerator');
const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');
// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/donations');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });
exports.upload = upload.single('uploadPhoto');

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'annaseva.org@gmail.com',
    pass: 'cfsoabwwgsodwsvw'
  }
});
//cfsoabwwgsodwsvw
// Controller to create a new donation by a hotel
exports.createDonation = async (req, res) => {
  try {
    const {
      type,
      name,
      description,
      category,
      quantity,
      expiry,
      idealfor,
      availableAt,
      transportation,
      contactPerson,
      pickupInstructions,
      locationType,
      locationCoordinates
    } = req.body;

    console.log('Received request body:', req.body);

    const hotelId = req.query.id;
    let uploadPhoto = null;

    if (req.file) {
      uploadPhoto = req.file.path;
    }

    console.log('Location Type:', locationType);
    console.log('Location Coordinates:', locationCoordinates);

    // Ensure location data is provided in the correct format
    let location;
    if (Array.isArray(locationCoordinates) && locationCoordinates.length === 2 && locationCoordinates.every(coord => !isNaN(coord))) {
      location = {
        type: locationType,
        coordinates: locationCoordinates.map(Number) // Ensure coordinates are numbers
      };
    } else {
      console.error('Invalid location coordinates:', locationCoordinates);
      // Return an error response if location coordinates are invalid
      return res.status(400).json({ success: false, message: "Invalid location coordinates provided" });
    }

    const donation = await Donation.create({
      type,
      name,
      description,
      category,
      quantity,
      expiry,
      idealfor,
      availableAt,
      location,
      transportation,
      uploadPhoto,
      contactPerson,
      pickupInstructions,
      hotel: hotelId
    });

    // Update hotel donations
    const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, { $push: { donations: donation._id } }, { new: true });

    // Notify NGOs within 50km radius
    const hotelDetails = await Hotel.findById(hotelId);
    const nearbyNGOs = await NGO.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: hotelDetails.location.coordinates
          },
          $maxDistance: 50000
        }
      }
    });
    sendNotifications(nearbyNGOs, donation);

    res.status(201).json({ success: true, donation, updatedHotel });
  } catch (error) {
    console.error('Error creating donation:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
// Helper function to send notifications
async function sendNotifications(ngos, donation) {
  for (const ngo of ngos) {
    const mailOptions = {
      from: 'annaseva.org@gmail.com',
      to: ngo.email,
      subject: 'New Donation Available',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Donation Available</title>
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
              <h1>New Donation Available</h1>
            </div>
            <div class="content">
              <div class="details">
                <p><strong>Type:</strong> ${donation.type}</p>
                <p><strong>Dish Name:</strong> ${donation.name}</p>
                <p><strong>More Detail:</strong> ${donation.description}</p>
                <p><strong>Category:</strong> ${donation.category}</p>
                <p><strong>Quantity:</strong> ${donation.quantity}</p>
                <p><strong>Expiry:</strong> ${donation.expiry}</p>
                <p><strong>Available At:</strong> ${donation.availableAt}</p>
                <p><strong>Transportation:</strong> ${donation.transportation}</p>
                <p><strong>Ideal For:</strong> ${donation.idealfor}</p>
                <p><strong>Contact Person:</strong> ${donation.contactPerson}</p>
                <p><strong>Pick Up Instructions:</strong> ${donation.pickupInstructions}</p>
              </div>
            </div>
            <div class="footer">
              <p>&copy; 2024 Anna Seva Developed by Tech Elites. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`Notification sent to ${ngo.email}`);

      // Create an in-app notification
      const notification = new Notification({
        recipient: ngo._id,
        message: `New donation available: ${donation.name}`,
        type: 'NewDonation',
        metadata: { donationId: donation._id }
      });
      await notification.save();

    } catch (error) {
      console.error(`Error sending notification to ${ngo.email}: ${error.message}`);
    }
  }
}
// Helper function to send notifications
async function sendNotifications(ngos, donation) {
  for (const ngo of ngos) {
    const mailOptions = {
      from: 'annaseva.org@gmail.com',
      to: ngo.email,
      subject: 'New Donation Available',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Donation Available</title>
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
              <h1>New Donation Available</h1>
            </div>
            <div class="content">
              <div class="details">
                <p><strong>Type:</strong> ${donation.type}</p>
                <p><strong>Dish Name:</strong> ${donation.name}</p>
                <p><strong>More Detail:</strong> ${donation.description}</p>
                <p><strong>Category:</strong> ${donation.category}</p>
                <p><strong>Quantity:</strong> ${donation.quantity}</p>
                <p><strong>Expiry:</strong> ${donation.expiry}</p>
                <p><strong>Available At:</strong> ${donation.availableAt}</p>
                <p><strong>Transportation:</strong> ${donation.transportation}</p>
                <p><strong>Ideal For:</strong> ${donation.idealfor}</p>
                <p><strong>Contact Person:</strong> ${donation.contactPerson}</p>
                <p><strong>Pick Up Instructions:</strong> ${donation.pickupInstructions}</p>
              </div>
            </div>
            <div class="footer">
              <p>&copy; 2024 Anna Seva Developed by Tech Elites. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`Notification sent to ${ngo.email}`);

      // Create an in-app notification
      const notification = new Notification({
        recipient: ngo._id,
        message: `New donation available: ${donation.name}`,
        type: 'NewDonation',
        metadata: { donationId: donation._id }
      });
      await notification.save();

    } catch (error) {
      console.error(`Error sending notification to ${ngo.email}: ${error.message}`);
    }
  }
}

//Get Donation By Id
exports.getDonationById = async (req,res)=>{
  const donationId = req.query.id;
  try{
    const donation = await Donation.findById(donationId)
    res.status(200).json({
      status:true,
      donation
    })
  }catch(error){
    return res.status(500).json({
      status:false,
      message:'Internal Server Error'
    })
  }
}


// Helper function to calculate priority based on proximity
const calculatePriority = (donation, ngo) => {
  if (!donation.location || !donation.location.coordinates || donation.location.coordinates.length < 2) {
    throw new Error('Invalid donation location coordinates');
  }
  if (!ngo.location || !ngo.location.coordinates || ngo.location.coordinates.length < 2) {
    throw new Error('Invalid NGO location coordinates');
  }

  const distance = Math.sqrt(
    Math.pow(donation.location.coordinates[0] - ngo.location.coordinates[0], 2) +
    Math.pow(donation.location.coordinates[1] - ngo.location.coordinates[1], 2)
  );

  // Higher priority for shorter distances
  return 1 / distance;
};


// Controller to handle donation requests BY NGO
exports.handleDonationRequest = async (req, res) => {
  try {
    const { donationId, ngoId } = req.body;

    if (!donationId || !ngoId) {
      return res.status(400).json({ success: false, message: 'Donation ID and NGO ID are required' });
    }

    // Find donation and populate requests
    const donation = await Donation.findById(donationId).populate('requests');
    if (!donation) {
      return res.status(404).json({ success: false, message: 'Donation not found' });
    }
    
    // Find NGO
    const ngo = await NGO.findById(ngoId);
    if (!ngo) {
      return res.status(404).json({ success: false, message: 'NGO not found' });
    }

    // Validate NGO location coordinates
    if (!ngo.location || !ngo.location.coordinates || ngo.location.coordinates.length !== 2) {
      console.log('Invalid NGO location coordinates:', ngo.location); // Debugging log
      return res.status(400).json({ success: false, message: 'Invalid NGO location coordinates' });
    }

    // Logging coordinates for debugging
    console.log('NGO coordinates:', ngo.location.coordinates);

    // Find Hotel
    const hotel = await Hotel.findById(donation.hotel);
    if (!hotel) {
      return res.status(404).json({ success: false, message: 'Hotel not found' });
    }

    // Check if request already exists
    const existingRequest = donation.requests.find(request => request.ngo.toString() === ngoId);
    if (existingRequest) {
      return res.status(400).json({ success: false, message: 'Request already exists' });
    }

    const acceptedRequest = donation.requests.find(request => request.status === "Accepted" || donation.donationStatus === "Claimed");
    if (acceptedRequest) {
      return res.status(400).json({ success: false, message: 'The Donation is already distributed' });
    }

    // Calculate the priority score
    let priority;
    try {
      priority = calculatePriority(donation, ngo);
    } catch (error) {
      console.error('Error calculating priority:', error);
      return res.status(400).json({ success: false, message: 'Error calculating priority' });
    }

    // Create new request
    const newRequest = new Request({ donation: donationId, ngo: ngoId, status: 'Pending', priority });
    await newRequest.save();

    // Add request to donation
    donation.requests.push(newRequest);
    await donation.save();


    // // Generate QR code and save it to the uploads/qrcodes folder
    // const qrCodeFilePath = `public/qrcodes/${donation._id}.png`;
    // const qrCodeData = donation._id.toString();
    // await qrcode.toFile(path.join(__dirname, '../', qrCodeFilePath), qrCodeData);

    // // Create tracking entry
    // const tracking = new Tracking({ donation: donationId, qrCode: qrCodeFilePath });
    // await tracking.save();

    // Create a notification for the hotel
    const notification = new Notification({
      recipient: hotel._id,
      message: `New donation request for ${donation.name} from ${ngo.name} `,
      type: 'DonationRequested',
      metadata: { donationId: donation._id, ngoId: ngo._id }
    });
    await notification.save();

    // Send email to the hotel
    const mailOptions = {
      from: 'annaseva.org@gmail.com',
      to: hotel.email,
      subject: 'New Donation Request',
      html: `
        <p>New Donation Request</p>
        <p>Dear ${hotel.name},</p>
        <p>You have received a new donation request from ${ngo.name} for the donation: ${donation.type}.</p>
        <p>Please review the request and take the necessary action.</p>
        <p>Thank you,</p>
        <p>© 2024 Anna Seva Developed by Tech Elites. All rights reserved.</p>
        <p>This is an automated message, please do not reply.</p>
      `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.status(200).json({ success: true, message: 'Request created successfully', request: newRequest });
  } catch (error) {
    console.error('Error in handleDonationRequest:', error); // Log the error for debugging
    res.status(500).json({ success: false, message: error.message });
  }
};



// Controller to get donation requests for a hotel dashboard
exports.getRequestsForDashboard = async (req, res) => {
  try {
    const { donationId } = req.params;
    const donation = await Donation.findById(donationId).populate({
      path: 'requests',
      populate: {
        path: 'ngo'
      }
    });

    if (!donation) {
      return res.status(404).json({ success: false, message: 'Donation not found' });
    }

    // Sort requests by priority in descending order
    const sortedRequests = donation.requests.sort((a, b) => b.priority - a.priority);

    res.status(200).json({ success: true, requests: sortedRequests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller to list available donations for an NGO
exports.listAvailableDonations = async (req, res) => {
  try {
    const { ngoId } = req.params;
    const ngo = await NGO.findById(ngoId);

    if (!ngo) {
      return res.status(404).json({ success: false, message: 'NGO not found' });
    }

    // List available donations and donations requested by the current NGO
    const donations = await Donation.find({
      donationStatus: 'Available',
      isUsable: true,
      $or: [
        { 'requests.status': { $ne: 'Accepted' }, 'requests.ngo': { $ne: ngoId } },
        { 'requests.ngo': ngoId }
      ]
    })
    .populate('hotel')
    .populate({
      path: 'requests',
      match: { ngo: ngoId },
      select: 'status'
    });

    // Map the donations to include the request status for donations requested by the NGO
    const donationsWithRequestStatus = donations.map(donation => {
      const requestForNgo = donation.requests.find(request => request.ngo && request.ngo.toString() === ngoId);
      const requestStatus = requestForNgo ? requestForNgo.status : null;
      return { ...donation.toObject(), requestStatus };
    });

    res.status(200).json({ success: true, donations: donationsWithRequestStatus });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller: donationController.js
exports.acceptDonationByVolunteer = async (req, res) => {
  try {
    const { donationId, volunteerId } = req.body;

    // Find the donation and volunteer
    const donation = await Donation.findById(donationId);
    const volunteer = await Volunteer.findById(volunteerId);

    if (!donation || !volunteer) {
      return res.status(404).json({ success: false, message: 'Donation or Volunteer not found' });
    }
    
    if(donation.donationStatus === "Claimed"){
      return res.status(404).json({success:false,message:'Sorry this donation is already claimed by someone'})
    }

    // Update the donation record
    donation.donationStatus = 'Claimed';
    donation.acceptedByVolunteer = volunteer._id;
    
    await donation.save();

    const newRequest = new Request({ donation: donationId, volunteer: volunteerId, status: 'Accepted' });
    await newRequest.save();

    // Update the volunteer record
    volunteer.receivedDonations.push(donation._id);
    await volunteer.save();

    // Send notification to the volunteer
    const notification = new Notification({
      recipient: volunteer._id,
      message: `You have claimed the donation: ${donation.name}`,
      type: 'DonationClaimed',
      metadata: { donationId: donation._id }
    });
    await notification.save();

    // Send email to the volunteer
    const mailOptions = {
      from: 'annaseva.org@gmail.com',
      to: volunteer.email,
      subject: 'Donation Claimed Successfully',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #4CAF50;">Donation Claimed Successfully</h2>
          <p>Dear <strong>${volunteer.name}</strong>,</p>
          <p>You have successfully claimed the donation: <strong>${donation.name}</strong>.</p>
          <p>Please follow the instructions to pick up the donation.</p>
          <p style="margin-top: 20px;">Thank you,</p>
          <footer>
            <p>© 2024 Anna Seva Developed by Tech Elites. All rights reserved.</p>
          </footer>
          <hr style="border: 0; border-top: 1px solid #ccc; margin-top: 20px; margin-bottom: 20px;">
          <p style="font-size: 0.9em; color: #999;">This is an automated message, please do not reply.</p>
        </div>
      `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    // Generate QR code and save it to the uploads/qrcodes folder
    const qrCodeData = donation._id.toString();
    const qrCodeFilePath = path.join(__dirname, '../public/qrcodes', `${donation._id}.png`);
    await qrcode.toFile(qrCodeFilePath, qrCodeData);

    // Create a new tracking record
    const tracking = new Tracking({
      donation: donation._id,
      qrCode: qrCodeFilePath
    });
    await tracking.save();

    // Send notification about QR code creation (optional)
    const qrNotification = new Notification({
      recipient: volunteer._id,
      message: `A QR code has been generated for the donation: ${donation.name}`,
      type: 'QrCodeCreated',
      metadata: { donationId: donationId, qrCodePath: qrCodeFilePath } // Include path for reference
    });
    await qrNotification.save();

    res.status(200).json({ success: true, message: 'Donation claimed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


// Controller to handle donation request status updates
exports.handleRequestStatus = async (req, res) => {
  try {
    const { requestId, status } = req.body;

    if (!requestId || !status) {
      return res.status(400).json({
        success: false,
        message: "Request ID and status are required",
      });
    }

    if (!["Accepted", "Rejected"].includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status value" });
    }

    const request = await Request.findById(requestId).populate("donation ngo");
    if (!request) {
      return res
        .status(404)
        .json({ success: false, message: "Request not found" });
    }

    if (request.status === "Accepted") {
      return res.status(404).json({
        success: false,
        message: "Request is already Accepted",
      });
    }

    request.status = status;
    await request.save();

    const hotel = await Hotel.findById(request.donation.hotel);

    // Create a notification for the NGO
    const notification = new Notification({
      recipient: request.ngo._id,
      message: `Your donation request for ${
        request.donation.type
      } has been ${status.toLowerCase()}`,
      type: `Donation${status}`,
      metadata: { donationId: request.donation._id, requestId: request._id },
    });
    await notification.save();

    // Send email to the NGO
    const mailOptions = {
      from: "annaseva.org@gmail.com",
      to: request.ngo.email,
      subject: `Donation Request ${status}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #4CAF50;">Donation Request ${status}</h2>
          <p>Dear <strong>${request.ngo.name}</strong>,</p>
          <p>Your donation request for <strong>${
            request.donation.type
          }</strong> has been <strong>${status.toLowerCase()}</strong>.</p>
          <p style="margin-top: 20px;">Thank you,</p>
          <footer>
          <p>&copy; 2024 Anna Seva Developed by Tech Elites. All rights reserved.</p>
          </footer>
          <hr style="border: 0; border-top: 1px solid #ccc; margin-top: 20px; margin-bottom: 20px;">
          <p style="font-size: 0.9em; color: #999;">This is an automated message, please do not reply.</p>
        </div>
      `,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    // If status is 'Accepted', send order receipt to the hotel
    if (status === "Accepted") {
      // Update the donation status to 'Claimed'
      request.donation.donationStatus = "Claimed";
      await request.donation.save();

      // Combine request ID and tracking ID
      const trackingId = new mongoose.Types.ObjectId().toString(); // Generate a new tracking ID
      // const qrCodeData = JSON(trackingId);
      const qrCodeData = trackingId.toString();

      // Generate QR code and save it to the uploads/qrcodes folder
      const qrCodeFilePath = path.join(
        __dirname,
        "../public/qrcodes",
        `${request._id}.png`
      );
      await qrcode.toFile(qrCodeFilePath, qrCodeData);

      // Create a new tracking record
      const tracking = new Tracking({
        _id: trackingId,
        donation: request.donation._id,
        // Save the tracking ID to the database
      });
      await tracking.save();
      console.log(trackingId);
      // Send order receipt email to the hotel
      const orderReceiptMailOptions = {
        from: "annaseva.org@gmail.com",
        to: hotel.email,
        subject: "Order Receipt for Accepted Donation",
        html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #4CAF50;">Order Receipt</h2>
          <p>Dear <strong>${hotel.name}</strong>,</p>
          <p>Thank you for accepting the donation. Here are the details of your donation:</p>
          <p><strong>Type:</strong> ${request.donation.type}</p>
          <p><strong>Description:</strong> ${request.donation.description}</p>
          <p><strong>Quantity:</strong> ${request.donation.quantity}</p>
          <p><strong>QR Code:</strong></p>
          <img src="cid:qrCodeImage" alt="QR Code" />
          <p>Please use the QR code to track the donation status.</p>
          <p style="margin-top: 20px;">Thank you,</p>
          <footer>
            <p>&copy; 2024 Anna Seva Developed by Tech Elites. All rights reserved.</p>
          </footer>
          <hr style="border: 0; border-top: 1px solid #ccc; margin-top: 20px; margin-bottom: 20px;">
          <p style="font-size: 0.9em; color: #999;">This is an automated message, please do not reply.</p>
        </div>
      `,
        attachments: [
          {
            filename: "qrcode.png",
            path: qrCodeFilePath,
            cid: "qrCodeImage",
          },
        ],
      };
      transporter.sendMail(orderReceiptMailOptions, (error, info) => {
        if (error) {
          console.log("Error sending order receipt email:", error);
        } else {
          console.log("Order receipt email sent:", info.response);
        }
      });
    }

    res.status(200).json({
      success: true,
      message: `Request ${status.toLowerCase()} successfully`,
      request,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// Route to download order invoice as PDF
exports.downloadOrderInvoice = async (req, res) => {
  try {
    const { requestId } = req.params;
    const request = await Request.findById(requestId).populate('donation ngo');
    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    const hotel = await Hotel.findById(request.donation.hotel);
    const doc = new PDFDocument({ margin: 50 });
    const filePath = path.join(__dirname, '../public/invoices', `${request._id}.pdf`);
    doc.pipe(fs.createWriteStream(filePath));

    // Header
    doc.fillColor('#4CAF50').fontSize(20).text('Order Receipt', { align: 'center' }).moveDown();

    // Hotel details
    doc.fillColor('#333').fontSize(14).text(`Dear ${hotel.name},`).moveDown().fontSize(12)
      .text('Thank you for accepting the donation. Here are the details of your donation:', { align: 'left' })
      .moveDown();

    // Donation details
    doc.fillColor('#000').text(`Type: ${request.donation.type}`, { align: 'left' }).moveDown()
      .text(`Description: ${request.donation.description}`, { align: 'left' }).moveDown()
      .text(`Quantity: ${request.donation.quantity}`, { align: 'left' }).moveDown();

    // Save the current position
    const yPosition = doc.y;

    // Add QR code image on the right
    const qrCodeFilePath = path.join(__dirname, '../public/qrcodes', `${request._id}.png`);
    if (fs.existsSync(qrCodeFilePath)) {
      doc.image(qrCodeFilePath, doc.page.width - 150, yPosition - 20, { width: 100, height: 100 });
    } else {
      doc.text('QR Code not found', doc.page.width - 150, yPosition - 20);
    }

    // Add more text below the QR code
    doc.moveDown(4).text('Please use the QR code to track the donation status.', { align: 'left' })
      .moveDown(2).fillColor('#333').text('Thank you,', { align: 'left' }).moveDown()
      .text('Anna Seva', { align: 'left' });

    // Footer
    doc.fillColor('#999').fontSize(10).text('© 2024 Anna Seva Developed by Tech Elites. All rights reserved.', {
      align: 'center', baseline: 'bottom'
    });

    doc.end();

    // Wait for the PDF file to be written and then initiate download
    doc.on('end', () => {
      // Set response headers to trigger download in the browser
      res.setHeader('Content-disposition', `attachment; filename=${request._id}.pdf`);
      res.setHeader('Content-type', 'application/pdf');

      // Send the PDF file as response
      const stream = fs.createReadStream(filePath);
      stream.pipe(res);
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller to get notifications for a user
exports.getNotifications = async (req, res) => {
  try {
    const userId = req.params.userId;

    const notifications = await Notification.find({ recipient: userId }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Get Donations By City
exports.getDonationsByCity = async (req, res) => {
  try {
    const cityName = req.params.city;
    console.log(cityName)
    // Find hotels in the specified city
    const hotels = await Hotel.find({ city: cityName });
    console.log(hotels)

    // Find donations associated with the hotels in the city
    const donations = await Donation.find({ hotel: { $in: hotels.map(hotel => hotel._id) } })
    
      .populate({
        path: 'requests',
        populate: {
          path: 'ngo',
          model: 'NGO',
          select: 'name' 
        }
      })
      .populate('hotel');
      console.log(donations)
    res.status(200).json({ success: true, donations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Controller to mark notifications as read
exports.markAsRead = async (req, res) => {
  try {
    const { notificationIds } = req.body;

    await Notification.updateMany({ _id: { $in: notificationIds } }, { read: true });

    res.status(200).json({ success: true, message: 'Notifications marked as read' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller to get all requests for a hotel's donations
exports.getAllRequestsForHotel = async (req, res) => {
  try {
    const hotelId = req.params.hotelId;

    const donations = await Donation.find({ hotel: hotelId }).populate({
      path: 'requests',
      populate: { path: 'ngo' }
    });

    const allRequests = donations.reduce((requests, donation) => {
      return requests.concat(donation.requests);
    }, []);

    res.status(200).json({ success: true, requests: allRequests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller to report a donation as unusable
exports.reportDonation = async (req, res) => {
  try {
      const { donationId, reason } = req.body;
      const ngoId = req.user.id; // Assuming authenticated user's NGO ID is available in req.user.id

      const report = await Report.create({
          donation: donationId,
          reason,
          reportedBy: ngoId
      });

      const donation = await Donation.findByIdAndUpdate(
          donationId,
          { $push: { reports: report._id }, isUsable: false },
          { new: true }
      );

      // Notify the hotel about the report
      const hotel = await Hotel.findById(donation.hotel);
      if (hotel) {
          const mailOptions = {
              from: 'your-email@gmail.com', // Sender address
              to: hotel.email, // List of recipients
              subject: 'Donation Reported as Unusable', // Subject line
              html: `
                  <h3>Donation Reported:</h3>
                  <p>Donation ID: ${donation._id}</p>
                  <p>Reason: ${reason}</p>
                  <!-- Add other relevant details -->
              `
          };

          try {
              await transporter.sendMail(mailOptions);
              console.log(`Notification sent to ${hotel.email}`);
          } catch (error) {
              console.error(`Error sending notification to ${hotel.email}: ${error.message}`);
          }
      }

      res.status(200).json({ success: true, report, donation });
  } catch (error) {
      res.status(500).json({ success: false, message: error.message });
  }
};

// Controller to retrieve all donations
exports.getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find({status:{$ne:"Claimed"}}).populate('hotel');
    res.status(200).json({ success: true, donations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller to retrieve a specific donation by ID

exports.getDonationsByHotelId = async (req, res) => {
  const hotelId  = req.query.id;
  console.log(hotelId)

  try {
    const donations = await Donation.find({ hotel: hotelId,donationStatus:{$ne:"Claimed"} });
    console.log(donations)

    if (!donations) {
      return res.status(404).json({ message: 'No donations found for this hotel' });
    }

    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Controller to update external transport options for a donation
exports.updateTransportOptions = async (req, res) => {
  const { donationId } = req.params;
  const { hotelCoversTransport, platformManagesTransport } = req.body;

  try {
    // Find the donation by ID
    const donation = await Donation.findById(donationId);
    if (!donation) {
      return res.status(404).json({ success: false, message: 'Donation not found' });
    }

    // Update external transport options
    donation.hotelCoversTransport = hotelCoversTransport;
    donation.platformManagesTransport = platformManagesTransport;

    // Save the updated donation
    await donation.save();

    res.status(200).json({ success: true, message: 'External transport options updated successfully', donation });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};

exports.showNgoName = async (req, res) => {
  const donationId = req.query.id;

  try {
    // Find the donation by ID
    const donation = await Donation.findById(donationId);

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    // Find all requests associated with this donation
    const requests = await Request.find({ donation: donationId }).populate('ngo');

    if (!requests.length) {
      return res.status(404).json({ message: 'No requests found for this donation' });
    }

    // Extract the NGOs from the requests
    const ngos = requests.map(request => request.ngo);

    // Return the donation details and the list of NGOs
    res.status(200).json({
      // donation,
      ngos,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.showNgoNameMobileApp = async (req, res) => {
  const donationId = req.query.id;

  try {
    // Find the donation by ID
    const donation = await Donation.findById(donationId);

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    // Find all requests associated with this donation
    const requests = await Request.find({ donation: donationId }).populate('ngo');

    if (!requests.length) {
      return res.status(404).json({ message: 'No requests found for this donation' });
    }

    // Extract the NGOs from the requests
    const ngos = requests.map(request => request.ngo);

    // Return the donation details and the list of NGOs
    res.status(200).json({
      // donation,
      ngos,
      requests
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


//Get Accpeted Request Details 

exports.getAcceptedRequestDetails = async (req, res) => {
  try {
    const donationId = req.query.donationId;

    // Find the donation with the provided ID
    const donation = await Donation.findById(donationId)
      .populate('hotel', 'name')
      .populate({
        path: 'requests',
        populate: {
          path: 'ngo',
          model: 'NGO',
          select: 'name',
        },
      });

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    const acceptedRequests = donation.requests.filter(
      (request) => request.status === 'Accepted'
    );

    const requestDetails = acceptedRequests.map((request) => ({
      requestId: request._id,
      ngoName: request.ngo.name,
      hotelName: donation.hotel.name,
    }));

    res.status(200).json({ requestDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


//Get the list of sucessful donation from Hotel
exports.getReceivedDonationForNgo = async (req, res) => {
  const ngoId = req.query.id;

  try {
    // Find the requests related to the NGO
    const requests = await Request.find({ ngo: ngoId }).populate('ngo').exec();

    console.log('Requests:', requests);

    const claimedDonationsWithDetails = await Promise.all(requests.map(async (request) => {
      if (request.status === 'Accepted') {
        console.log('Processing request:', request);

        // Fetch the donation details explicitly
        const donation = await Donation.findById(request.donation).exec();
        console.log('Donation:', donation);

        const ngo = request.ngo;
        return {
          requestId: request._id,
          ngoName: ngo ? ngo.name : null,
          donationDetails: donation,
        };
      } else {
        return null;
      }
    }));

    // Filter out any null results from the mapping process
    const filteredResults = claimedDonationsWithDetails.filter(item => item !== null);

    return res.status(200).json({ success: true, claimedDonationsWithDetails: filteredResults });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false });
  }
};

//Get Accepted Request by hotel
exports.getAcceptedRequestsByHotel = async (req, res) => {
  try {
    const hotelId = req.query.hotelId;

    // Find donations where the hotel ID matches and populate the requests field
    const donations = await Donation.find({ hotel: hotelId })
      .populate({
        path: 'requests',
        match: { status: 'Accepted' }, // Only include accepted requests
        populate: {
          path: 'ngo',
          model: 'NGO',
          select: 'name', // Only include the NGO name
        },
      })
      .lean(); // Use lean() to get plain JavaScript objects

    // Extract the accepted requests from the donations
    const acceptedRequests = donations.reduce((acc, donation) => {
      const requestsForDonation = donation.requests.map(async (request) => {
        const tracking = await Tracking.findOne({ donation: donation._id });
        return {
          requestId: request._id,
          ngoName: request.ngo.name,
          donationId: donation._id,
          tracking,
        };
      });
      return [...acc, ...requestsForDonation];
    }, []);

    const resolvedAcceptedRequests = await Promise.all(acceptedRequests);

    res.status(200).json({ acceptedRequests: resolvedAcceptedRequests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getDonationsForVolunteer = async (req, res) => {
  try {
    const volunteerId = req.query.id;
    console.log(volunteerId)
    // Ensure the volunteerId is valid
    // if (!mongoose.Types.ObjectId.isValid(volunteerId)) {
    //   return res.status(400).json({ message: 'Invalid volunteer ID' });
    // }

    // Find the volunteer to get their location
    const volunteer = await Volunteer.findById(volunteerId);
    if (!volunteer) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }

    const volunteerLocation = volunteer.location.coordinates;

    // Calculate time thresholds
    const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000);
    const eightDaysFromNow = new Date(Date.now() + 8 * 24 * 60 * 60 * 1000);

    // Find donations within 50km of the volunteer's location, created more than 3 hours ago and expiring in less than 8 days
    const donations = await Donation.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: volunteerLocation
          },
          $maxDistance: 50000 // 50km in meters
        }
      },
      donationStatus: 'Available',
      createdAt: { $lte: threeHoursAgo },
      expiry: { $lte: eightDaysFromNow }
    });

    res.status(200).json(donations);
  } catch (error) {
    console.error('Error fetching donations for volunteer:', error);
    res.status(500).json({ message: 'An error occurred while fetching donations' });
  }
};

exports.getAcceptedRequestsByVolunteer = async (req, res) => {
  try {
    const volunteerId = req.query.id;
    
    // Fetch accepted requests by volunteer ID
    const acceptedRequests = await Request.find({ volunteer: volunteerId, status: 'Accepted' });

    res.status(200).json({ success: true, acceptedRequests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

exports.getNotificationsCount = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find all notifications for the user
    const notifications = await Notification.find({ recipient: userId }).sort({
      createdAt: -1,
    });

    // Count unread notifications
    const unreadCount = notifications.filter(
      (notification) => !notification.read
    ).length;

    res.status(200).json({ success: true,  unreadCount });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Helper function to calculate priority based on proximity const calculatePriority = (donation, location) => { const distance = Math.sqrt( Math.pow(donation.location.coordinates[0] - location.coordinates[0], 2) + Math.pow(donation.location.coordinates[1] - location.coordinates[1], 2) ); // Higher priority for shorter distances return 1 / distance; }; // Controller to handle food donation requests exports.handleFoodDonation = async (req, res) => { try { const { donationId } = req.body; // Find the donation const donation = await Donation.findById(donationId); if (!donation) { return res.status(404).json({ success: false, message: 'Donation not found' }); } // Find nearby NGOs within 50km radius const nearbyNGOs = await NGO.find({ location: { $near: { $geometry: { type: 'Point', coordinates: donation.location.coordinates }, $maxDistance: 50000 // 50km } } }); // Calculate priority scores for NGOs and sort based on priority const prioritizedNGOs = nearbyNGOs.map(ngo => ({ ...ngo.toObject(), priority: calculatePriority(donation, ngo.location) })).sort((a, b) => b.priority - a.priority); // Offer donation to prioritized NGOs for (const ngo of prioritizedNGOs) { // TODO: Implement logic to offer donation to NGO // If NGO accepts, update donation and NGO records } // If no NGO accepts, offer donation to nearby volunteers if (prioritizedNGOs.length === 0) { const nearbyVolunteers = await Volunteer.find({ location: { $near: { $geometry: { type: 'Point', coordinates: donation.location.coordinates }, $maxDistance: 50000 // 50km } } }); // Calculate priority scores for volunteers and sort based on priority const prioritizedVolunteers = nearbyVolunteers.map(volunteer => ({ ...volunteer.toObject(), priority: calculatePriority(donation, volunteer.location) })).sort((a, b) => b.priority - a.priority); // Offer donation to prioritized volunteers for (const volunteer of prioritizedVolunteers) { // TODO: Implement logic to offer donation to volunteer // If volunteer accepts, update donation and volunteer records break; // Break loop after first volunteer accepts } } res.status(200).json({ success: true, message: 'Food donation handled successfully' }); } catch (error) { console.error(error); res.status(500).json({ success: false, message: 'Internal Server Error' }); } };