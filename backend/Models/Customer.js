const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  orderValue: {
    type: Number,
    default: 0
  },
  totalOrders: {
    type: Number,
    default: 0
  },
  visits: {
    type: String,
    default: 'Not Available'
  },
  lastSeen: {
    type: String,
    default: 'Not Available'
  },
  tag: {
    type: String,
    default: 'At Risk' // Default to At Risk
  }
}, {
  timestamps: true
});

// Pre-save hook to determine tag based on orderValue
customerSchema.pre('save', function (next) {
  if (this.orderValue > 90000) {
    this.tag = 'VIP';
  } else if (this.orderValue > 30000) {
    this.tag = 'High Value';
  } else {
    this.tag = 'At Risk';
  }
  next();
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
