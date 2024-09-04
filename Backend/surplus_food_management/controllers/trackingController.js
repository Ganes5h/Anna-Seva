const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const Tracking = require('../models/trackingModel');
const Donation = require('../models/donationModel');
const Notification = require('../models/notificationModel');
const Hotel = require('../models/hotelModel');
const NGO = require('../models/ngoModel');
const nodemailer = require('nodemailer');
const Request = require('../models/requestModel');

// Create transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'annaseva.org@gmail.com',
    pass: 'cfsoabwwgsodwsvw'
  }
});

// Function to update tracking status when scanned by hotel
exports.scanByHotel = async (req, res) => {
  const { hotelId, location, agencyName, deliveryPersonName, deliveryPersonContact, percentageReached } = req.body;
  const trackingId = req.query.id;

  try {
    // Find the tracking record
    const tracking = await Tracking.findById(trackingId);
    if (!tracking) {
      return res.status(404).json({ message: 'Tracking record not found' });
    }

    // Prevent updating if the current status is 'Shipped' or 'Delivered'
    if (tracking.status === 'Shipped' || tracking.status === 'Delivered') {
      return res.status(400).json({ message: `Cannot update. Current status is ${tracking.status}.` });
    }

    // Update tracking status
    tracking.status = 'Shipped';
    tracking.scannedBy = hotelId;
    tracking.scannedByModel = 'Hotel';
    tracking.agencyName = agencyName;
    tracking.deliveryPersonName = deliveryPersonName;
    tracking.deliveryPersonContact = deliveryPersonContact;
    tracking.trackingDetails.push({
      location: location,
      percentageReached: percentageReached,
      timestamp: Date.now()
    });
    tracking.updatedAt = Date.now();

    await tracking.save();

    // Update donation shipment status
    const donation = await Donation.findById(tracking.donation);
    donation.shipmentStatus = 'Shipped';
    await donation.save();

    // Find request and send notifications
    const request = await Request.findOne({ 'donation': tracking.donation });

    // Send notifications to hotel and NGO
    const notificationToHotel = new Notification({
      recipient: hotelId,
      message: 'Your shipment has been marked as shipped.',
      type: 'Shipped',
      metadata: { trackingId: tracking._id, donationId: donation._id }
    });
    await notificationToHotel.save();

    const notificationToNGO = new Notification({
      recipient: request.ngo,
      message: `The shipment for your donation has been marked as shipped by ${agencyName}.`,
      type: 'Shipped',
      metadata: { trackingId: tracking._id, donationId: donation._id }
    });
    await notificationToNGO.save();

    // Send email notifications to hotel and NGO
    const hotel = await Hotel.findById(donation.hotel);
    const ngo = await NGO.findById(request.ngo);

    const mailOptionsHotel = {
      from: 'annaseva.org@gmail.com',
      to: hotel.email,
      subject: 'Shipment Marked as Shipped',
      html: `
        <p>Dear ${hotel.name},</p>
        <p>Your shipment has been marked as shipped.</p>
        <p>Thank you,</p>
        <p>Anna Seva</p>
      `
    };
    transporter.sendMail(mailOptionsHotel);

    const mailOptionsNGO = {
      from: 'annaseva.org@gmail.com',
      to: ngo.email,
      subject: 'Shipment Marked as Shipped',
      html: `
        <p>Dear ${ngo.name},</p>
        <p>The shipment for your donation has been marked as shipped by ${agencyName}.</p>
        <p>Thank you,</p>
        <p>Anna Seva</p>
      `
    };
    transporter.sendMail(mailOptionsNGO);

    res.json({ message: 'Donation status updated to Shipped' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

exports.scanByNGO = async (req, res) => {
  const { ngoId, location, percentageReached } = req.body;
  const id = req.query.id;

  try {
    const tracking = await Tracking.findById(id);
    if (!tracking) {
      return res.status(404).json({ message: 'Tracking record not found' });
    }

    // Prevent updating if the current status is 'Delivered'
    if (tracking.status === 'Delivered') {
      return res.status(400).json({ message: 'Cannot update. Current status is Delivered.' });
    }

    // Ensure the status is 'Shipped' before changing to 'Delivered'
    if (tracking.status !== 'Shipped') {
      return res.status(400).json({ message: 'Cannot mark as Delivered. The current status is not Shipped.' });
    }

    tracking.status = 'Delivered';
    tracking.scannedBy = ngoId;
    tracking.scannedByModel = 'NGO';
    tracking.trackingDetails.push({
      location: location,
      percentageReached: percentageReached,
      timestamp: Date.now()
    });
    tracking.updatedAt = Date.now();

    await tracking.save();

    // Update the shipment status in the donation document
    const donation = await Donation.findById(tracking.donation);
    donation.shipmentStatus = 'Delivered';
    await donation.save();

    // Send notifications to hotel and NGO
    const notificationToHotel = new Notification({
      recipient: donation.hotel,
      message: 'Your shipment has been marked as delivered.',
      type: 'Delivered',
      metadata: { trackingId: tracking._id, donationId: donation._id }
    });
    await notificationToHotel.save();

    const notificationToNGO = new Notification({
      recipient: ngoId,
      message: 'The shipment for your donation has been marked as delivered.',
      type: 'Delivered',
      metadata: { trackingId: tracking._id, donationId: donation._id }
    });
    await notificationToNGO.save();

    res.json({ message: 'Donation status updated to Delivered' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

//Get Tracking By Id
exports.getTrackingById = async (req, res) => {
  const { id } = req.params;

  try {
    const tracking = await Tracking.findById(id)
      .populate({
        path: 'donation',
        populate: {
          path: 'hotel ngo',
          select: 'name email'
        }
      })
      .populate('scannedBy', 'name email');

    if (!tracking) {
      return res.status(404).json({ message: 'Tracking record not found' });
    }

    res.json({ success: true, tracking });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

//Get Tracking By Donation Id
exports.getTrackingByDonationId = async (req, res) => {
  const donationId  = req.query.id;

  try {
    const trackingRecords = await Tracking.find({ donation: donationId })
    .populate({
      path: 'donation',
      populate: {
        path: 'hotel',
        select: 'name email'
      }
    })
    
      .populate('scannedBy', 'name email');

    if (!trackingRecords || trackingRecords.length === 0) {
      return res.status(404).json({ message: 'No tracking records found for this donation' });
    }

    res.json({ success: true, trackingRecords });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};
