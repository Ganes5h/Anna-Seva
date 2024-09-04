const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// User search route
router.get('/users/search', searchController.searchUsers);

// Request search route
router.get('/requests/search', searchController.searchRequests);

// Report search route
router.get('/reports/search', searchController.searchReports);

// NGO search route
router.get('/ngos/search', searchController.searchNGOs);

// Hotel search route
router.get('/hotels/search', searchController.searchHotels);

// Donation search route
router.get('/donations/search', searchController.searchDonations);

module.exports = router;
