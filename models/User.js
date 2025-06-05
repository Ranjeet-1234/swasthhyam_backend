const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['admin', 'doctor'], required: true }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
