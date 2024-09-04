const mongoose = require("mongoose");
const { Schema } = mongoose;

const volunteerSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    contactNumber: { type: String, required: true },
    location: {
      type: { type: String, enum: ["Point"], required: true },
      coordinates: { type: [Number], required: true },
    },
    receivedDonations: [{ type: Schema.Types.ObjectId, ref: "Donation" }],
    distributionPhotos: [{ type: String }],
    isVerified: { type: Boolean, default: false },
    kycDocuments: { type: [String] },
    teamSize: { type: Number, default: 1 },
    termsAcceptance: {
      acceptedAt: { type: Date },
      ipAddress: { type: String },
      userAgent: { type: String },
      signatureImage: { type: String },
      acceptedTermsVersion: { type: String },
      isAccepted: { type: Boolean, default: false }
    }
  },
  { timestamps: true }
);

volunteerSchema.index({ location: "2dsphere" });

const Volunteer = mongoose.model("Volunteer", volunteerSchema);
module.exports = Volunteer;