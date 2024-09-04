const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
const NGO = require('../models/ngoModel');
const Donation = require('../models/donationModel');
const Hotel = require('../models/donationModel')
const multer = require('multer')
const path = require('path')
// Set up multer for file upload
// Multer configuration for KYC documents and signature image
// Multer configuration for KYC documents and signature image
const kycStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'signatureImage') {
      cb(null, 'public/signatures'); // Destination folder for signature images
    } else {
      cb(null, 'public/kycDocuments'); // Destination folder for KYC documents
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Unique filename
  },
});

const uploadKycDocuments = multer({ storage: kycStorage });

exports.registerNGO = [
  uploadKycDocuments.fields([
    { name: 'kycDocuments', maxCount: 5 },
    { name: 'signatureImage', maxCount: 1 }
  ]), // Allow up to 5 KYC documents and 1 signature image
  async (req, res) => {
    try {
      const {
        name,
        email,
        password,
        address,
        city,
        state,
        pincode,
        contactPerson,
        contactNumber,
        position,
        locationType,
        locationCoordinates,
        acceptedTermsVersion,
        userAgent,
        ipAddress
      } = req.body;

      // Ensure location data is provided in the correct format
      let location;
      if (Array.isArray(locationCoordinates) && locationCoordinates.length === 2 && locationCoordinates.every(coord => !isNaN(coord))) {
        location = {
          type: locationType,
          coordinates: locationCoordinates.map(Number)
        };
      } else {
        return res.status(400).json({ success: false, message: 'Invalid location coordinates provided' });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Get KYC document paths
      const kycDocuments = req.files.kycDocuments.map(file => file.path);

      // Get the signature image path
      const signatureImage = req.files.signatureImage ? req.files.signatureImage[0].path : null;

      // Create a new NGO
      const ngo = new NGO({
        name,
        email,
        password: hashedPassword, // Store the hashed password
        address,
        city,
        state,
        pincode,
        contactPerson,
        contactNumber,
        position,
        location,
        kycDocuments, // Store KYC documents paths
        isVerified: false, // Initial verification status
        termsAcceptance: {
          acceptedAt: new Date(),
          ipAddress,
          userAgent,
          signatureImage, // Store the signature image path
          acceptedTermsVersion,
          isAccepted: true,
          representativeName: contactPerson,
          representativePosition: position,
        }
      });

      // Save the NGO to the database
      await ngo.save();

      res.status(201).json({ success: true, message: 'NGO registered successfully', ngo });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  }
];
// Controller to get all non-verified NGOs
exports.getNonVerifiedNGOs = async (req, res) => {
  try {
    const nonVerifiedNGOs = await NGO.find({ isVerified: false });
    res.status(200).json({ success: true, nonVerifiedNGOs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller to verify an NGO
// exports.verifyNGO = async (req, res) => {
//   try {
//     const { ngoId } = req.params;

//     const ngo = await NGO.findById(ngoId);
//     if (!ngo) {
//       return res.status(404).json({ success: false, message: 'NGO not found' });
//     }

//     ngo.isVerified = true;
//     await ngo.save();

//     res.status(200).json({ success: true, message: 'NGO verified successfully', ngo });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// Controller for NGO login
// exports.loginNGO = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find the NGO by email
//     const ngo = await NGO.findOne({ email });

//     // If NGO not found
//     if (!ngo) {
//       return res.status(401).json({ success: false, message: 'Invalid email or password' });
//     }

//     // Compare the provided password with the stored hashed password
//     const isPasswordValid = await bcrypt.compare(password, ngo.password);

//     // If password is incorrect
//     if (!isPasswordValid) {
//       return res.status(401).json({ success: false, message: 'Invalid email or password' });
//     }

//     // Generate a JSON Web Token
//     const token = jwt.sign({ id: ngo._id }, process.env.JWT_SECRET, {
//       expiresIn: '1h', // Token expiration time
//     });

//     res.status(200).json({ success: true, token });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// Controller to get all NGOs
exports.getAllNGOs = async (req, res) => {
  try {
    const ngos = await NGO.find();
    res.status(200).json({ success: true, ngos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller to get an NGO by ID
exports.getNGOById = async (req, res) => {
  try {
    const ngo = await NGO.findById(req.params.id);
    if (!ngo) {
      return res.status(404).json({ success: false, message: 'NGO not found' });
    }
    res.status(200).json({ success: true, ngo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller to update an NGO
exports.updateNGO = async (req, res) => {
  try {
    const ngo = await NGO.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!ngo) {
      return res.status(404).json({ success: false, message: 'NGO not found' });
    }
    res.status(200).json({ success: true, ngo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller to delete an NGO
exports.deleteNGO = async (req, res) => {
  try {
    const ngo = await NGO.findByIdAndDelete(req.params.id);
    if (!ngo) {
      return res.status(404).json({ success: false, message: 'NGO not found' });
    }
    res.status(200).json({ success: true, message: 'NGO deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller to request a donation from a hotel
exports.requestDonation = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const { donationId } = req.body;
      const ngoId = req.query.id;
  
      if (!mongoose.Types.ObjectId.isValid(donationId)) {
        return res.status(400).json({ success: false, message: 'Invalid donation ID' });
      }
  
      const donation = await Donation.findById(donationId).session(session);
      if (!donation) {
        return res.status(404).json({ success: false, message: 'Donation not found' });
      }
  
      // Check if the NGO has already requested this donation
      if (donation.requests.includes(ngoId)) {
        return res.status(400).json({ success: false, message: 'Donation already requested' });
      }
  
      donation.requests.push(ngoId);
      await donation.save({ session });
  
      const ngo = await NGO.findByIdAndUpdate(ngoId, { $push: { requestedDonations: donationId } }, { new: true, session });
  
      await session.commitTransaction();
      session.endSession();
  
      res.status(200).json({ success: true, ngo });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      res.status(500).json({ success: false, message: error.message });
    }
  };

  // Controller for NGO Dashboard
exports.ngoDashboard = async (req, res) => {
    try {
      const ngoId = req.query.id; 
  
      // Find the NGO's details
      const ngo = await NGO.findById(ngoId).populate('requestedDonations');
  
      // Find donations approved for this NGO
      const approvedDonations = await Donation.find({ approvedNgo: ngoId });
  
      res.status(200).json({ 
        success: true, 
        data: {
          requestedDonations: ngo.requestedDonations,
          approvedDonations,
          requestedDonationCount: ngo.requestedDonations.length,
          approvedDonationCount: approvedDonations.length
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  exports.getStatistics = async (req, res) => {
    try {
      const { hotelId, ngoId, startDate, endDate } = req.query;
      console.log(hotelId)
      const matchCriteria = {};
  
      // Adding hotelId to match criteria if provided
      if (hotelId) {
        matchCriteria.hotel = mongoose.Types.ObjectId(hotelId);
      }
  
      // Adding ngoId to match criteria if provided
      if (ngoId) {
        matchCriteria.ngo = mongoose.Types.ObjectId(ngoId);
      }
  
      // Adding date range to match criteria if provided
      if (startDate || endDate) {
        matchCriteria.createdAt = {};
        if (startDate) {
          matchCriteria.createdAt.$gte = new Date(startDate);
        }
        if (endDate) {
          matchCriteria.createdAt.$lte = new Date(endDate);
        }
      }
  
      // Counting total donations matching the criteria
      const totalDonations = await Donation.countDocuments(matchCriteria);
  
      // Grouping donations by status
      const donationsByStatus = await Donation.aggregate([
        { $match: matchCriteria },
        { $group: { _id: "$donationStatus", count: { $sum: 1 } } }
      ]);
  
      // Grouping donations by month and year
      const monthlyDonations = await Donation.aggregate([
        { $match: matchCriteria },
        {
          $group: {
            _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } },
            count: { $sum: 1 }
          }
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } }
      ]);
  
      // Grouping donations by category
      const donationsByCategory = await Donation.aggregate([
        { $match: matchCriteria },
        { $group: { _id: "$category", count: { $sum: 1 } } }
      ]);
  
      res.status(200).json({
        totalDonations,
        donationsByStatus,
        monthlyDonations,
        donationsByCategory
      });
    } catch (error) {
      console.error("Error fetching statistics:", error);
      res.status(500).json({ message: 'Error fetching statistics' });
    }
  };