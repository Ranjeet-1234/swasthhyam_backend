const Doctor = require('../models/Doctor.js');

// Add new doctor
exports.add = async (req, res) => {
  try {
    const newDoctor = new Doctor(req.body);
    const savedDoctor = await newDoctor.save(); // Don't forget to save!
    res.status(201).json(savedDoctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update existing doctor
exports.update = async (req, res) => {
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedDoctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete doctor
exports.remove = async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.json({ message: 'Doctor deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all doctors
exports.fetch = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
