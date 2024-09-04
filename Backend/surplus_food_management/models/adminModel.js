const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Ensure this is hashed before storing
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['superadmin', 'admin'], default: 'admin' },
  isVerified:{type:Boolean,default:false}
}, { timestamps: true });

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
