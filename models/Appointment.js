const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  PatientEmail: { type: String, required: true },
  patientPhone: Number,
  patientAge: Number,
  PatientGender: { type: String, required: true },
  PatientService: { type: String, required: true },
  PatientAddress: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' }
}, { timestamps: true });
 
module.exports = mongoose.model('Appointment', appointmentSchema);