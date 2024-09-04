const mongoose = require('mongoose');
const { Schema } = mongoose;

const ngoSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  contactPerson: { type: String, required: true },
  contactNumber: { type: String, required: true },
  requestedDonations: [{ type: Schema.Types.ObjectId, ref: 'Donation' }],
  isDeleted: { type: Boolean, default: false },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number] }
  },
  kycDocuments: { type: [String] },
  isVerified: { type: Boolean, default: false },
  termsAcceptance: {
    acceptedAt: { type: Date },
    ipAddress: { type: String },
    userAgent: { type: String },
    signatureImage: { type: String },
    acceptedTermsVersion: { type: String },
    isAccepted: { type: Boolean, default: false },
    representativeName: { type: String },
    representativePosition: { type: String }
  }
}, { timestamps: true });

ngoSchema.index({ location: '2dsphere' });

const NGO = mongoose.model('NGO', ngoSchema);
module.exports = NGO;