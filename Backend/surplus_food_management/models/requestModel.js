const mongoose = require('mongoose');
const { Schema } = mongoose;

const requestSchema = new Schema({
  donation: { type: Schema.Types.ObjectId, ref: 'Donation', required: true },
  ngo: { type: Schema.Types.ObjectId, ref: 'NGO' },
  volunteer:{type:Schema.Types.ObjectId, ref:'Volunteer'},
  status: { type: String, default: 'Pending' }, // 'Pending', 'Accepted', 'Rejected'
  priority: { type: Number, default: 0 }, 
  createdAt: { type: Date, default: Date.now }
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
