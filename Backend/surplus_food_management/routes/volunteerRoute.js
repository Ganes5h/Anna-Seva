const express = require('express');
const router = express.Router();
const volunteerController = require('../controllers/volunteerController');

// Register a new volunteer
router.post('/register', volunteerController.registerVolunteer);

// Login a volunteer
router.post('/login', volunteerController.loginVolunteer);

// Update a volunteer
router.put('/update/:volunteerId', volunteerController.updateVolunteer);

// Get a volunteer by ID
router.get('/:volunteerId', volunteerController.getVolunteerById);

// Delete a volunteer
router.delete('/delete/:volunteerId', volunteerController.deleteVolunteer);

// Get volunteers by city
router.get('/city/:city', volunteerController.getVolunteersByCity);

// Route for volunteers to upload distribution photos for donations
router.post('/donations/upload-photos', volunteerController.uploadDistributionPhotos);

// Add the new routes
router.get('/volunteers/non-verified', volunteerController.getNonVerifiedVolunteers);

// router.put('/volunteers/verify/:volunteerId', volunteerController.verifyVolunteer);

router.get('/',volunteerController.listAvailableDonations)

router.put('/claimDonation',volunteerController.claimDonation)


module.exports = router
