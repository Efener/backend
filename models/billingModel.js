const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema({
  subscriberNo: {
    type: String,
    required: true,
  },
  month: {
    type: Number, // 1-12
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  phoneUsageMinutes: {
    type: Number,
    default: 0,
  },
  internetUsageGB: {
    type: Number,
    default: 0,
  },
  totalAmount: {
    type: Number,
    default: 0,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model('Bill', BillSchema);
