const mongoose = require('mongoose');
const { Schema } = mongoose;

const trackingDetailsSchema = new Schema({
    location: { type: String },
    percentageReached: { type: Number }
}, { timestamps: true });

const trackingSchema = new Schema({
    donation: { type: Schema.Types.ObjectId, ref: 'Donation', required: true },
    status: { type: String, enum: ['Accepted', 'Shipped', 'Delivered'], default: 'Accepted' },
    qrCode: { type: String },
    scannedBy: { type: Schema.Types.ObjectId, refPath: 'scannedByModel' },
    scannedByModel: { type: String, enum: ['Hotel', 'NGO'] },
    agencyName: { type: String },
    deliveryPersonName: { type: String },
    deliveryPersonContact: { type: String },
    trackingDetails: [trackingDetailsSchema],
    invoicePath: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Tracking = mongoose.model('Tracking', trackingSchema);
module.exports = Tracking;
