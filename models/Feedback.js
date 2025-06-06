const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  feedback: { type: String, required: true },
  rating: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);
