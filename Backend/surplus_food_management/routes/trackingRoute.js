const express = require('express')
const router = express.Router()
const TrackingController = require('../controllers/trackingController')

router.post('/scan/hotel', TrackingController.scanByHotel);

// Route for NGO to scan QR code
router.post('/scan/ngo', TrackingController.scanByNGO);

// Route to get tracking by donation ID
router.get('/tracking/donation', TrackingController.getTrackingByDonationId);

// Route to get tracking by ID
router.get('/tracking/:id', TrackingController.getTrackingById);

// router.post('/scanQRCode', TrackingController.scanQRCode);

module.exports = router