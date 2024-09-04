const express = require('express');
const app = express();
const connectToMongo = require('./config/db');
const cors = require('cors');
const cron = require('node-cron');
const bodyParser = require('body-parser'); // Use the correct name
const volunteerController = require('./helpers/volunteerCron');

require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
// Connect to MongoDB
connectToMongo();

app.use(express.static('public'));

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); 

// Schedule the cron job to run every hour
// cron.schedule('*/1 * * * *', async () => {
//   console.log('Offering donations to volunteers...');
//   await volunteerController.offerDonationsToVolunteers();
// });

app.use('/api/user', require('./routes/userRoute'));
app.use('/api/hotel', require('./routes/hotelRoute'));
app.use('/api/donation', require('./routes/donationRoute'));
app.use('/api/ngo', require('./routes/ngoRoute'));
app.use('/api/search', require('./routes/searchRoute'));
app.use('/api/volunteer', require('./routes/volunteerRoute'));
app.use('/api/tracking', require('./routes/trackingRoute'));
app.use('/api/admin',require('./routes/adminRoute'))
// Start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
