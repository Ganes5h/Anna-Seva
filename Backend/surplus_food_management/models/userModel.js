const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobileNo: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  city: { type: String },
  pincode: { type: String },
  profilePicture: { type: String },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true }
  },
  donations: [{ type: Schema.Types.ObjectId, ref: 'Donation' }],
  events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

// Add indexes for fields that are frequently queried
userSchema.index({ email: 1 });
userSchema.index({ mobileNo: 1 });

const User = mongoose.model('User', userSchema);

module.exports = User;
