const User = require('../models/userModel');
const Request = require('../models/requestModel');
const Report = require('../models/reportModel');
const NGO = require('../models/ngoModel');
const Hotel = require('../models/hotelModel');
const Donation = require('../models/donationModel');

// User Search Controller
exports.searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    const users = await User.find(searchCriteria(User, query));
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Request Search Controller
exports.searchRequests = async (req, res) => {
  try {
    const { query } = req.query;
    const requests = await Request.find(searchCriteria(Request, query));
    res.status(200).json({ success: true, data: requests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Report Search Controller
exports.searchReports = async (req, res) => {
  try {
    const { query } = req.query;
    const reports = await Report.find(searchCriteria(Report, query));
    res.status(200).json({ success: true, data: reports });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// NGO Search Controller
exports.searchNGOs = async (req, res) => {
  try {
    const { query } = req.query;
    const ngos = await NGO.find(searchCriteria(NGO, query));
    res.status(200).json({ success: true, data: ngos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Hotel Search Controller
exports.searchHotels = async (req, res) => {
  try {
    const { query } = req.query;
    const hotels = await Hotel.find(searchCriteria(Hotel, query));
    res.status(200).json({ success: true, data: hotels });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Donation Search Controller
exports.searchDonations = async (req, res) => {
  try {
    const { query } = req.query;
    const donations = await Donation.find(searchCriteria(Donation, query));
    res.status(200).json({ success: true, data: donations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Define search criteria
function searchCriteria(Model, query) {
  const fields = Object.keys(Model.schema.obj);
  const searchQuery = { $or: [] };
  fields.forEach(field => {
    searchQuery.$or.push({ [field]: { $regex: query, $options: 'i' } });
  });
  return searchQuery;
}
