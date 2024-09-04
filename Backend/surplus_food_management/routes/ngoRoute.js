const express = require('express');
const router = express.Router();
const ngoController = require('../controllers/ngoController');

// Register a new NGO
router.post('/register', ngoController.registerNGO);

// Get all NGOs
router.get('/', ngoController.getAllNGOs);

// Get an NGO by ID
router.get('/:id', ngoController.getNGOById);

// Update an NGO
router.put('/:id', ngoController.updateNGO);

// Delete an NGO
router.delete('/:id', ngoController.deleteNGO);

// Request a donation from a hotel
router.post('/request-donation', ngoController.requestDonation);


router.get('/dashboard',ngoController.ngoDashboard)

// router.post('/login',ngoController.loginNGO)

router.get('/statstics',ngoController.getStatistics)

router.get('/ngos/non-verified', ngoController.getNonVerifiedNGOs);

// router.put('/ngos/verify/:ngoId', ngoController.verifyNGO);

module.exports = router;
