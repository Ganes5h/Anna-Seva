const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');

// Multer setup for file uploads
const multer = require('multer');
const path = require('path');

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

// Routes for donation operations
//Create Donation Will be done by hotel integrate at surplus food 
router.post('/donations', upload.single('uploadPhoto'), donationController.createDonation);

// To request For Donation
router.put('/donations/request', donationController.handleDonationRequest);

//To Report For Donation
router.post('/donations/:donationId/report', donationController.reportDonation);


// Get count of unread notifications
router.get(
  "/notificationsCount/:userId",
  donationController.getNotificationsCount
);

//Get Donation By Id
router.get('/getDonationById',donationController.getDonationById)


//To get all Donations
router.get('/donations', donationController.getAllDonations);

//To Get Particular By Id
router.get('/donationsbyhotel', donationController.getDonationsByHotelId);

//Get Donations Request on Dashboard
router.get('/donations/:id/requests', donationController.getRequestsForDashboard);

//Get the list of Donations on Dashboard
router.get('/ngos/:ngoId/donations', donationController.listAvailableDonations);

//Handle The Donation Status Accepted or Rejected
router.post('/request/status', donationController.handleRequestStatus);

//Get Notifications 
router.get('/notifications/:userId', donationController.getNotifications);

//Mark as read
router.post('/notifications/mark-as-read', donationController.markAsRead);

//Get all donations
router.get('/getallrequests/:hotelId',donationController.getAllDonations);

//Get Donations By City
router.get('/bycity/:city',donationController.getDonationsByCity)

//Route to Accept the donation by volunteer
router.post('/accept-donation-by-volunteer', donationController.acceptDonationByVolunteer);

//Route to select the Transport Option

router.put('/donations/:donationId/transport',donationController.updateTransportOptions)


//Download Order Invoice
router.get('/downloadOrderInvoice/:requestId', donationController.downloadOrderInvoice);

//Route to get the NGO Name List
router.get('/getNgoName',donationController.showNgoName)


//Route to get the NGO Name List Mobile App
router.get('/getNgoNameMobile',donationController.showNgoNameMobileApp)

//Get the Accepted Request Details 

router.get('/acceptedDetails',donationController.getAcceptedRequestDetails)

//list of sucessful donation from Hotel
router.get('/getReceivedDonationForNgo',donationController.getReceivedDonationForNgo)

router.get('/getAcceptedRequestsByHotel',donationController.getAcceptedRequestsByHotel)

router.get('/getDonationForVolunteer', donationController.getDonationsForVolunteer);


router.get('/getRequestByVolunteer',donationController.getAcceptedRequestsByVolunteer)
module.exports = router;
