const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();


router.post('/register', userController.createUser);
router.post('/login', userController.login);
router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/:id/uploadProfilePicture', userController.uploadProfilePicture);
router.post('/:userId/donations/:donationId/uploadPhoto', userController.uploadDonationPhoto);
// router.post('/:userId/donations', userController.createDonation);
router.get('/:userId/donations/:donationId', userController.getDonationById);
router.post('/:userId/events', userController.createEvent);
router.get('/:userId/events/:eventId', userController.getEventById);

router.post('/:userId/createDonationforuser',userController.createDonation)

module.exports = router;
