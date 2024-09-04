const mongoose = require('mongoose');
const { Schema } = mongoose;

const reportSchema = new Schema({
  donation: { type: Schema.Types.ObjectId, ref: 'Donation', required: true },
  reason: { type: String, required: true },
  reportedBy: { type: Schema.Types.ObjectId, ref: 'NGO', required: true },
  reportFile: {type:String}
}, { timestamps: true });

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
