const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'public/reports' }); 

const reportController = require('../controllers/reportController');

// Route to create a report with file upload
router.post('/reports/create', upload.single('reportFile'), reportController.createReport);

module.exports = router;
