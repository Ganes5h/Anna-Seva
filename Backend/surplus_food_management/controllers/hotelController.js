const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Hotel = require("../models/hotelModel");
const Donation = require("../models/donationModel");
const NGO = require("../models/ngoModel");
const Report = require("../models/reportModel");
const geolib = require("geolib");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const Volunteer = require("../models/volunteerModel");

// Set up multer for file uploads
// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'signatureImage') {
      cb(null, 'public/signatures');
    } else {
      cb(null, 'public/kycDocuments');
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Controller to register a new hotel
exports.registerHotel = [
  upload.fields([
    { name: 'kycDocuments', maxCount: 5 },
    { name: 'signatureImage', maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const {
        name,
        email,
        password,
        address,
        locationType,
        locationCoordinates,
        city,
        state,
        pincode,
        contactPerson,
        contactNumber,
        termsVersion,
      } = req.body;

      // Ensure location data is provided in the correct format
      let location;
      if (
        Array.isArray(locationCoordinates) &&
        locationCoordinates.length === 2 &&
        locationCoordinates.every(isFinite)
      ) {
        location = {
          type: locationType,
          coordinates: locationCoordinates,
        };
      } else {
        return res.status(400).json({
          success: false,
          message: 'Invalid location coordinates provided',
        });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Get KYC document paths
      const kycDocuments = req.files['kycDocuments'].map((file) => file.path);

      // Get signature image path
      const signatureImage = req.files['signatureImage'][0].path;

      // Prepare terms acceptance data
      const termsAcceptance = {
        acceptedAt: new Date(),
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
        signatureImage: signatureImage,
        acceptedTermsVersion: termsVersion,
        isAccepted: true
      };

      const hotel = await Hotel.create({
        name,
        email,
        password: hashedPassword,
        address,
        location,
        city,
        state,
        pincode,
        contactPerson,
        contactNumber,
        kycDocuments,
        isVerified: false,
        termsAcceptance
      });

      res.status(201).json({ success: true, hotel });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
];

// Controller to get all non-verified hotels
exports.getNonVerifiedHotels = async (req, res) => {
  try {
    const nonVerifiedHotels = await Hotel.find({ isVerified: false });
    res.status(200).json({ success: true, nonVerifiedHotels });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller to verify a hotel
// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "annaseva.org@gmail.com",
    pass: "cfsoabwwgsodwsvw",
  },
});

// Verify NGO or Hotel
exports.verifyEntity = async (req, res) => {
  try {
    const { entityType, entityId } = req.params;

    let entity;
    switch (entityType) {
      case "ngo":
        entity = await NGO.findById(entityId);
        break;
      case "hotel":
        entity = await Hotel.findById(entityId);
        break;
      case "volunteer":
        entity = await Volunteer.findById(entityId);
        break;
      default:
        return res
          .status(400)
          .json({ success: false, message: "Invalid entity type" });
    }

    if (!entity) {
      return res
        .status(404)
        .json({ success: false, message: "Entity not found" });
    }

    entity.isVerified = true;
    await entity.save();

    // Send verification email
    await sendVerificationEmail(entityType, entity);

    res.status(200).json({
      success: true,
      message: `${entityType} verified successfully`,
      entity,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Helper function to send verification email
async function sendVerificationEmail(entityType, entity) {
  const mailOptions = {
    from: "annaseva.org@gmail.com",
    to: entity.email,
    subject: `${entityType.toUpperCase()} Verified`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${entityType.toUpperCase()} Verified</title>
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
            <h1>${entityType.toUpperCase()} Verified</h1>
          </div>
          <div class="content">
            <p>Your ${entityType} account has been verified successfully.</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 Anna Seva Developed by Tech Elites. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(
      `${entityType.toUpperCase()} verification email sent to ${entity.email}`
    );

    // Create an in-app notification
    const notification = new Notification({
      recipient: entity._id,
      message: `${entityType.toUpperCase()} verified successfully`,
      type: "Verification",
      metadata: { entityId: entity._id },
    });
    await notification.save();
  } catch (error) {
    console.error(
      `Error sending ${entityType.toUpperCase()} verification email to ${
        entity.email
      }: ${error.message}`
    );
  }
}

// // Controller to register a new hotel
// exports.registerHotel = async (req, res) => {
//   try {
//     const { name, email, password, address,locationType,locationCoordinates, city, state, pincode, contactPerson, contactNumber } = req.body;
//      // Ensure location data is provided in the correct format
//      let location;
//      if (Array.isArray(locationCoordinates) && locationCoordinates.length === 2 && locationCoordinates.every(isFinite)) {
//        location = {
//          type: locationType,
//          coordinates: locationCoordinates
//        };
//      } else {
//        // Return an error response if location coordinates are invalid
//        return res.status(400).json({ success: false, message: "Invalid location coordinates provided" });
//      }
//     // Hash the password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const hotel = await Hotel.create({
//       name,
//       email,
//       password: hashedPassword, // Store the hashed password
//       address,
//       location,
//       city,
//       state,
//       pincode,
//       contactPerson,
//       contactNumber,
//     });

//     res.status(201).json({ success: true, hotel });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

//  Controller for hotel login
// exports.loginHotel = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find the hotel by email
//     const hotel = await Hotel.findOne({ email });

//     // If hotel not found
//     if (!hotel) {
//       return res.status(401).json({ success: false, message: 'Invalid email or password' });
//     }

//     // Compare the provided password with the stored hashed password
//     const isPasswordValid = await bcrypt.compare(password, hotel.password);

//     // If password is incorrect
//     if (!isPasswordValid) {
//       return res.status(401).json({ success: false, message: 'Invalid email or password' });
//     }

//     // Generate a JSON Web Token
//     const token = jwt.sign({ id: hotel._id }, process.env.JWT_SECRET, {
//       expiresIn: '1h', // Token expiration time
//     });

//     res.status(200).json({ success: true, token });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// Controller to get all hotels
exports.getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json({ success: true, hotels });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller to get a hotel by ID
exports.getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res
        .status(404)
        .json({ success: false, message: "Hotel not found" });
    }
    res.status(200).json({ success: true, hotel });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller to update a hotel
exports.updateHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!hotel) {
      return res
        .status(404)
        .json({ success: false, message: "Hotel not found" });
    }
    res.status(200).json({ success: true, hotel });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller to delete a hotel
exports.deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!hotel) {
      return res
        .status(404)
        .json({ success: false, message: "Hotel not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Hotel deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller for Hotel Dashboard
exports.hotelDashboard = async (req, res) => {
  try {
    const hotelId = req.query.id;
    // Find donations made by this hotel
    const donations = await Donation.find({ hotelId });
    // Find pending requests for donations made by this hotel
    const pendingRequests = donations.filter(
      (donation) => donation.requests.length > 0
    );
    res.status(200).json({
      success: true,
      data: { donations, pendingRequests, donationCount: donations.length },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Total Donations by Hotel
exports.getTotalDonationsByHotel = async (req, res) => {
  try {
    const { hotelId } = req.params;
    const totalDonations = await Donation.countDocuments({ hotel: hotelId });
    res.status(200).json({ totalDonations });
  } catch (error) {
    console.error("Error fetching total donations by hotel:", error);
    res
      .status(500)
      .json({ message: "Error fetching total donations by hotel" });
  }
};

// Donations by Status
exports.getDonationsByStatus = async (req, res) => {
  try {
    const { hotelId } = req.params;
    const donationsByStatus = await Donation.aggregate([
      { $match: { hotel: new mongoose.Types.ObjectId(hotelId) } },
      { $group: { _id: "$donationStatus", count: { $sum: 1 } } },
    ]);
    res.status(200).json({ donationsByStatus });
  } catch (error) {
    console.error("Error fetching donations by status:", error);
    res.status(500).json({ message: "Error fetching donations by status" });
  }
};

// Monthly Donations
exports.getMonthlyDonations = async (req, res) => {
  try {
    const { hotelId } = req.params;
    const monthlyDonations = await Donation.aggregate([
      { $match: { hotel: new mongoose.Types.ObjectId(hotelId) } },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);
    res.status(200).json({ monthlyDonations });
  } catch (error) {
    console.error("Error fetching monthly donations:", error);
    res.status(500).json({ message: "Error fetching monthly donations" });
  }
};

// Donations by Category
exports.getDonationsByCategory = async (req, res) => {
  try {
    const { hotelId } = req.params;
    const donationsByCategory = await Donation.aggregate([
      { $match: { hotel: new mongoose.Types.ObjectId(hotelId) } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);
    res.status(200).json({ donationsByCategory });
  } catch (error) {
    console.error("Error fetching donations by category:", error);
    res.status(500).json({ message: "Error fetching donations by category" });
  }
};

exports.getStatistics = async (req, res) => {
  try {
    const { hotelId } = req.params;
    const { startDate, endDate, type } = req.query;

    const matchCriteria = { hotel: new mongoose.Types.ObjectId(hotelId) };
    if (startDate || endDate) {
      matchCriteria.createdAt = {};
      if (startDate) {
        matchCriteria.createdAt.$gte = Date(startDate);
      }
      if (endDate) {
        matchCriteria.createdAt.$lte = Date(endDate);
      }
    }

    let result;
    switch (type) {
      case "total":
        result = await Donation.countDocuments(matchCriteria);
        res.status(200).json({ totalDonations: result });
        break;

      case "status":
        result = await Donation.aggregate([
          { $match: matchCriteria },
          { $group: { _id: "$donationStatus", count: { $sum: 1 } } },
        ]);
        res.status(200).json({ donationsByStatus: result });
        break;

      case "monthly":
        result = await Donation.aggregate([
          { $match: matchCriteria },
          {
            $group: {
              _id: {
                month: { $month: "$createdAt" },
                year: { $year: "$createdAt" },
              },
              count: { $sum: 1 },
            },
          },
          { $sort: { "_id.year": 1, "_id.month": 1 } },
        ]);
        res.status(200).json({ monthlyDonations: result });
        break;

      case "category":
        result = await Donation.aggregate([
          { $match: matchCriteria },
          { $group: { _id: "$category", count: { $sum: 1 } } },
        ]);
        res.status(200).json({ donationsByCategory: result });
        break;

      default:
        res.status(400).json({ message: "Invalid statistics type specified" });
    }
  } catch (error) {
    console.error("Error fetching statistics:", error);
    res.status(500).json({ message: "Error fetching statistics" });
  }
};
