const bcrypt = require('bcrypt');
const Volunteer = require('../models/volunteerModel');
const multer = require('multer')
const Donation = require('../models/donationModel')
const Request = require('../models/requestModel')
const Hotel = require('../models/hotelModel')
const moment = require('moment')
// Set up multer storage configuration
// Multer configuration for KYC documents and signature image
const kycStorage = multer.diskStorage({
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

const uploadKycDocuments = multer({ storage: kycStorage });

// Controller to register a new Volunteer
exports.registerVolunteer = [
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
        contactNumber,
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

      // Check if the volunteer already exists
      const existingVolunteer = await Volunteer.findOne({ email });
      if (existingVolunteer) {
        return res.status(400).json({ success: false, message: 'Volunteer already exists' });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Get KYC document paths
      const kycDocuments = req.files.kycDocuments.map(file => file.path);

      // Get the signature image path
      const signatureImage = req.files.signatureImage ? req.files.signatureImage[0].path : null;

      // Create a new volunteer
      const volunteer = new Volunteer({
        name,
        email,
        password: hashedPassword,
        address,
        city,
        state,
        pincode,
        contactNumber,
        location,
        kycDocuments, // Store KYC documents paths
        isVerified: false, // Initial verification status
        termsAcceptance: {
          acceptedAt: new Date(),
          ipAddress,
          userAgent,
          signatureImage, // Store the signature image path
          acceptedTermsVersion,
          isAccepted: true
        }
      });

      // Save the volunteer to the database
      await volunteer.save();

      res.status(201).json({ success: true, message: 'Volunteer registered successfully', volunteer });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  }
];

// Controller to get all non-verified Volunteers
exports.getNonVerifiedVolunteers = async (req, res) => {
  try {
    const nonVerifiedVolunteers = await Volunteer.find({ isVerified: false });
    res.status(200).json({ success: true, nonVerifiedVolunteers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// // Controller to verify a Volunteer
// exports.verifyVolunteer = async (req, res) => {
//   try {
//     const { volunteerId } = req.params;

//     const volunteer = await Volunteer.findById(volunteerId);
//     if (!volunteer) {
//       return res.status(404).json({ success: false, message: 'Volunteer not found' });
//     }

//     volunteer.isVerified = true;
//     await volunteer.save();

//     res.status(200).json({ success: true, message: 'Volunteer verified successfully', volunteer });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// Login a volunteer
exports.loginVolunteer = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the volunteer by email
    const volunteer = await Volunteer.findOne({ email });
    if (!volunteer) {
      return res.status(404).json({ success: false, message: 'Volunteer not found' });
    }

    // Check the password
    const isPasswordValid = await bcrypt.compare(password, volunteer.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }

    res.status(200).json({ success: true, message: 'Login successful', volunteer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Update a volunteer
exports.updateVolunteer = async (req, res) => {
  try {
    const { volunteerId } = req.params;
    const { name, address, city, state, pincode, contactNumber, location } = req.body;

    // Find the volunteer by ID
    const volunteer = await Volunteer.findById(volunteerId);
    if (!volunteer) {
      return res.status(404).json({ success: false, message: 'Volunteer not found' });
    }

    // Update the volunteer details
    volunteer.name = name || volunteer.name;
    volunteer.address = address || volunteer.address;
    volunteer.city = city || volunteer.city;
    volunteer.state = state || volunteer.state;
    volunteer.pincode = pincode || volunteer.pincode;
    volunteer.contactNumber = contactNumber || volunteer.contactNumber;
    volunteer.location = location || volunteer.location;

    // Save the updated volunteer
    await volunteer.save();

    res.status(200).json({ success: true, message: 'Volunteer updated successfully', volunteer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Get a volunteer by ID
exports.getVolunteerById = async (req, res) => {
  try {
    const { volunteerId } = req.params;

    // Find the volunteer by ID
    const volunteer = await Volunteer.findById(volunteerId);
    if (!volunteer) {
      return res.status(404).json({ success: false, message: 'Volunteer not found' });
    }

    res.status(200).json({ success: true, volunteer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Delete a volunteer
exports.deleteVolunteer = async (req, res) => {
  try {
    const { volunteerId } = req.params;

    // Find and delete the volunteer by ID
    const deletedVolunteer = await Volunteer.findByIdAndDelete(volunteerId);
    if (!deletedVolunteer) {
      return res.status(404).json({ success: false, message: 'Volunteer not found' });
    }

    res.status(200).json({ success: true, message: 'Volunteer deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Get volunteers by city
exports.getVolunteersByCity = async (req, res) => {
  try {
    const { city } = req.params;

    // Find volunteers by city
    const volunteers = await Volunteer.find({ city });

    res.status(200).json({ success: true, volunteers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Get volunteers within a specified range
exports.getVolunteersWithinRange = async (req, res) => {
  try {
    const { latitude, longitude, radius } = req.params;

    // Convert latitude and longitude to numbers
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    const radiusInMeters = parseFloat(radius) * 1000; // Convert radius from km to meters

    // Find volunteers within the specified range
    const volunteers = await Volunteer.find({
      location: {
        $geoWithin: {
          $centerSphere: [[lon, lat], radiusInMeters / 6378.1] // Earth's radius in km
        }
      }
    });

    res.status(200).json({ success: true, volunteers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Controller for volunteers to upload distribution photos for donations
exports.uploadDistributionPhotos = async (req, res) => {
  try {
    const { donationId } = req.body;
    const volunteerId = req.user.id; 

    // Find the donation and volunteer
    const donation = await Donation.findById(donationId);
    const volunteer = await Volunteer.findById(volunteerId);

    if (!donation || !volunteer) {
      return res.status(404).json({ success: false, message: 'Donation or Volunteer not found' });
    }

    // Check if the volunteer has already uploaded photos for this donation
    if (volunteer.receivedDonations.includes(donationId)) {
      return res.status(400).json({ success: false, message: 'Photos already uploaded for this donation' });
    }

    // Upload the photo using multer middleware
    upload.single('photo')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ success: false, message: 'Failed to upload photo', error: err.message });
      }

      // Save the uploaded photo URL to the volunteer's distributionPhotos array
      const photoUrl = req.file.path; // Assuming multer saves the file path in req.file.path
      volunteer.distributionPhotos.push(photoUrl);

      // Update the volunteer record
      volunteer.receivedDonations.push(donationId);
      await volunteer.save();

      res.status(200).json({ success: true, message: 'Photo uploaded successfully' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


exports.listAvailableDonations = async (req, res) => {
  try {
    // Calculate the date 8 hours from now
    const expiryThreshold = moment().add(8, 'hours').toDate();

    // Query for donations that are available and have expiry less than 8 hours from now
    const availableDonations = await Donation.find({
      donationStatus: 'Available',
      expiry: { $lte: expiryThreshold }
    }).populate('hotel'); // Populate the 'hotel' field to get the hotel details

    // Handle case where no donations are found
    if (!availableDonations || availableDonations.length === 0) {
      return res.status(404).json({ success: false, message: 'No available donations found' });
    }

    res.status(200).json({ success: true, donations: availableDonations });
  } catch (error) {
    console.error('Error listing available donations:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

exports.claimDonation = async (req, res) => {
  try {
    const { donationId, volunteerId } = req.params;

    // Update the donation with the volunteer who claimed it
    const updatedDonation = await Donation.findByIdAndUpdate(
      donationId,
      { donationStatus: 'Claimed', acceptedByVolunteer: volunteerId },
      { new: true }
    );

    if (!updatedDonation) {
      return res.status(404).json({ success: false, message: 'Donation not found' });
    }

    res.status(200).json({ success: true, message: 'Donation claimed successfully', donation: updatedDonation });
  } catch (error) {
    console.error('Error claiming donation:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};