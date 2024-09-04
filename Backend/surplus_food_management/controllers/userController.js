const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config(); 
const Hotel = require('../models/hotelModel');
const NGO = require('../models/ngoModel');
const multer = require('multer');
const path = require('path');
const Volunteer = require('../models/volunteerModel');
const Donation = require('../models/donationModel');
const Admin = require('../models/adminModel')
const nodemailer = require('nodemailer');

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'profilePicture') {
      cb(null, './public/profilePictures');
    } else if (file.fieldname === 'uploadPhoto') {
      cb(null, './public/donations');
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { fullName, email, mobileNo, password, city, pincode } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      mobileNo,
      password: hashedPassword,
      city,
      pincode,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller for login
exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    let user;
    switch (role) {
      case 'hotel':
        user = await Hotel.findOne({ email });
        break;
      case 'ngo':
        user = await NGO.findOne({ email });
        break;
      case 'user':
        user = await User.findOne({ email });
        break;
      case 'volunteer':
        user = await Volunteer.findOne({ email });
        break;
      case 'admin':
        user = await Admin.findOne({email})
        break;
      default:
        return res.status(400).json({ success: false, message: 'Invalid role' });
    }

    // If user not found
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // If user is not verified
    if (!user.isVerified) {
      return res.status(403).json({ success: false, message: 'Your account is not verified yet' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If password is incorrect
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Generate a JSON Web Token
    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token expiration time
    });

    res.status(200).json({ success: true, token, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Get user profile
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user profile
exports.updateUser = async (req, res) => {
  try {
    const updatedData = req.body;
    if (updatedData.password) {
      updatedData.password = await bcrypt.hash(updatedData.password, 10);
    }
    const user = await User.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete user profile
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Upload profile picture
exports.uploadProfilePicture = upload.single('profilePicture'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    console.log(path)
    user.profilePicture = req.file.path;

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Upload donation photo
exports.uploadDonationPhoto = upload.single('uploadPhoto'), async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const donation = user.donations.id(req.params.donationId);
    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }
    donation.uploadPhoto = req.file.path;
    await user.save();
    res.json(donation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a donation
exports.createDonation = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newDonation = {
      type: req.body.type,
      category: req.body.category,
      quantity: req.body.quantity,
      expiry: req.body.expiry,
      idealFor: req.body.idealFor,
      availableAt: req.body.availableAt,
      location: req.body.location,
      transportation: req.body.transportation,
      contactPerson: req.body.contactPerson,
      uploadPhoto: req.file ? req.file.path : ''
    };

    user.donations.push(newDonation);
    await user.save();

    // Notify NGOs within 50km radius
    const userDetails = await User.findById(req.params.userId);
    const nearbyNGOs = await NGO.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: userDetails.location.coordinates
          },
          $maxDistance: 50000
        }
      }
    });
    sendNotifications(nearbyNGOs, newDonation);

    res.status(201).json(newDonation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get donation by ID
exports.getDonationById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const donation = user.donations.id(req.params.donationId);
    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }
    res.json(donation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create an event
exports.createEvent = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newEvent = {
      date: req.body.date,
      location: req.body.location,
      type: req.body.type,
      photos: req.files.map(file => file.path)
    };

    user.events.push(newEvent);
    await user.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get event by ID
exports.getEventById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const event = user.events.id(req.params.eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get donations by user ID
exports.getDonationsByUserId = async (req, res) => {
  const userId = req.params.userId;

  try {
    const donations = await Donation.find({ user: userId });
    if (!donations) {
      return res.status(404).json({ message: 'No donations found for this user' });
    }
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Helper function to send notifications
async function sendNotifications(ngos, donation) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'annaseva.org@gmail.com',
      pass: 'cfsoabwwgsodwsvw'
    }
  });

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
                <p><strong>Category:</strong> ${donation.category}</p>
                <p><strong>Quantity:</strong> ${donation.quantity}</p>
                <p><strong>Expiry:</strong> ${donation.expiry}</p>
                <p><strong>Ideal For:</strong> ${donation.idealFor}</p>
                <p><strong>Available At:</strong> ${donation.availableAt}</p>
                <p><strong>Location:</strong> ${donation.location}</p>
                <p><strong>Transportation:</strong> ${donation.transportation}</p>
                <p><strong>Contact Person:</strong> ${donation.contactPerson}</p>
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
    } catch (error) {
      console.error(`Error sending notification to ${ngo.email}: ${error.message}`);
    }
  }
}
