const mongoose = require('mongoose');
const { Schema } = mongoose;

const donationSchema = new Schema({
  type: { type: String },
  name: { type: String },
  description: { type: String },
  category: { type: String },
  quantity: { type: Number },
  expiry: { type: Date },
  idealfor: { type: String },
  availableAt: { type: Date },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point', required: true },
    coordinates: { type: [Number], required: true }
  },
  transportation: { type: String },
  uploadPhoto: { type: String },
  requests: [{ type: Schema.Types.ObjectId, ref: 'Request' }],
  contactPerson: { type: String },
  donationStatus: { type: String, enum: ['Available', 'Pending', 'Claimed'], default: 'Available' },
  pickupInstructions: { type: String },
  hotel: { type: Schema.Types.ObjectId, ref: 'Hotel' },
  isUsable: { type: Boolean, default: true },
  reports: [{ type: Schema.Types.ObjectId, ref: 'Report' }],
  acceptedByVolunteer: { type: Schema.Types.ObjectId, ref: 'Volunteer' },
  autoAssignStatus: { type: String, enum: ['Pending', 'Processed'], default: 'Pending' },
  shipmentStatus: { type: String, enum: ['Pending', 'Shipped', 'Delivered'], default: 'Pending' }, // New field for shipment status
  qrCode: { type: String },
  hotelCoversTransport: { type: Boolean, default: false }, // Indicates whether the hotel covers transport cost
  platformManagesTransport: { type: Boolean, default: false }
}, { timestamps: true });

donationSchema.index({ location: '2dsphere' });

const Donation = mongoose.model('Donation', donationSchema);
module.exports = Donation;
