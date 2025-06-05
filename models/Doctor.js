const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  bio: { type: String },
  specialties: [{ type: String }],
  experience: { type: String },
  patients: { type: String },
  quote: { type: String },
  phone: { type: String, },
  email: { type: String, },
  address: { type: String,},
  socials: {
    facebook: { type: String, default: null },
    linkedin: { type: String, default: null },
    instagram: { type: String, default: null }
  },
  main:{type:Boolean,default:false}
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);
