const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  rationCardNumber: {
    type: String,
    required: true,
    unique: true
  },
  familyMembers: {
    type: Number,
    required: true,
    default: 1
  },
  rationQuota: {
    rice: { type: Number, default: 0 },
    wheat: { type: Number, default: 0 },
    sugar: { type: Number, default: 0 }
  },
  issuedRation: {
    rice: { type: Number, default: 0 },
    wheat: { type: Number, default: 0 },
    sugar: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);