const Donation = require('../models/donationModel');
const Volunteer = require('../models/volunteerModel');
const Notification = require('../models/notificationModel');
const nodemailer = require('nodemailer');

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'annaseva.org@gmail.com',
    pass: 'cfsoabwwgsodwsvw' // Replace with your actual password
  }
});

const calculatePriority = (donation, location) => {
  const distance = Math.sqrt(
    Math.pow(donation.location.coordinates[0] - location.coordinates[0], 2) +
    Math.pow(donation.location.coordinates[1] - location.coordinates[1], 2)
  );
  return 1 / distance; // Higher priority for shorter distances
};

exports.offerDonationsToVolunteers = async () => {
  try {
    const eligibleDonations = await Donation.find({
      donationStatus: 'Available',
      createdAt: { $lte: new Date(Date.now() - 3 * 60 * 60 * 1000) },
      expiry: { $lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }
    });

    console.log(eligibleDonations);

    for (const donation of eligibleDonations) {
      console.log(`Processing donation: ${donation._id}`);
      if (!donation.location || !donation.location.coordinates || donation.location.coordinates.length !== 2) {
        console.error(`Invalid donation location for donation ID: ${donation._id}`);
        continue;
      }

      const nearbyVolunteers = await Volunteer.find({
        location: {
          $near: {
            $geometry: { type: 'Point', coordinates: donation.location.coordinates },
            $maxDistance: 50000 // 50km
          }
        }
      });

      for (const volunteer of nearbyVolunteers) {
        if (!volunteer.location || !volunteer.location.coordinates || volunteer.location.coordinates.length !== 2) {
          console.error(`Invalid volunteer location for volunteer ID: ${volunteer._id}`);
          continue;
        }

        // Check if notification already sent for this donation and volunteer
        const existingNotification = await Notification.findOne({
          recipient: volunteer._id,
          type: 'DonationAvailable',
          'metadata.donationId': donation._id
        });

        if (!existingNotification) {
          // Send notification
          const notification = new Notification({
            recipient: volunteer._id,
            message: `New donation available: ${donation.name}`,
            type: 'DonationAvailable',
            metadata: { donationId: donation._id }
          });
          await notification.save();

          // Send email
          const mailOptions = {
            from: 'annaseva.org@gmail.com',
            to: volunteer.email,
            subject: 'New Donation Available',
            html: `
              <div style="font-family: Arial, sans-serif; color: #333;">
                <h2 style="color: #4CAF50;">New Donation Available</h2>
                <p>Dear <strong>${volunteer.name}</strong>,</p>
                <p>A new donation is available for you to claim: <strong>${donation.type}</strong>.</p>
                <p>Please review the details and take the necessary action.</p>
                <p style="margin-top: 20px;">Thank you,</p>
                <footer>
                  <p>© 2024 Anna Seva Developed by Tech Elites. All rights reserved.</p>
                </footer>
                <hr style="border: 0; border-top: 1px solid #ccc; margin-top: 20px; margin-bottom: 20px;">
                <p style="font-size: 0.9em; color: #999;">This is an automated message, please do not reply.</p>
              </div>
            `
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log('Error sending email:', error);
            } else {
              console.log('Email sent:', info.response);
            }
          });
        }
      }
    }
  } catch (error) {
    console.error('Error offering donations to volunteers:', error);
  }
};
