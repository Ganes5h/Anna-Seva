const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');

// Register a new hotel
router.post('/register', hotelController.registerHotel);

// Get all hotels
router.get('/', hotelController.getAllHotels);

// Get a hotel by ID
router.get('/:id', hotelController.getHotelById);

// Update a hotel
router.put('/:id', hotelController.updateHotel);

// Delete a hotel
router.delete('/:id', hotelController.deleteHotel);

router.get('/dashboard',hotelController.hotelDashboard);

// router.post('/login',hotelController.loginHotel)


router.get('/statistics/:hotelId', hotelController.getStatistics);

router.get('/statistics/total-donations/:hotelId',  hotelController.getTotalDonationsByHotel);

router.get('/statistics/donations-by-status/:hotelId',  hotelController.getDonationsByStatus);

router.get('/statistics/monthly-donations/:hotelId',  hotelController.getMonthlyDonations);

router.get('/statistics/donations-by-category/:hotelId',  hotelController.getDonationsByCategory);

router.get('/hotels/non-verified', hotelController.getNonVerifiedHotels);

router.put('/verify/:entityType/:entityId',hotelController.verifyEntity)

module.exports = router;
