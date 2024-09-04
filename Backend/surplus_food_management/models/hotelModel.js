const mongoose = require('mongoose');
const { Schema } = mongoose;

const hotelSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point', required: true },
    coordinates: { type: [Number], required: true }
  },
  contactPerson: { type: String, required: true },
  contactNumber: { type: String, required: true },
  donations: [{ type: Schema.Types.ObjectId, ref: 'Donation' }],
  isDeleted: { type: Boolean, default: false },
  kycDocuments: { type: [String], required: true }, // Array of file paths or URLs
  isVerified: { type: Boolean, default: false }, // Verification status
  termsAcceptance: {
    acceptedAt: { type: Date },
    ipAddress: { type: String },
    userAgent: { type: String },
    signatureImage: { type: String }, // URL or path to the signature image
    acceptedTermsVersion: { type: String }, // Version of the terms accepted
    isAccepted: { type: Boolean, default: false }
  }
}, { timestamps: true });

const Hotel = mongoose.model('Hotel', hotelSchema);
module.exports = Hotel;