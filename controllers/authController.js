const User = require('../models/User');
const Doctor = require('../models/Doctor');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'yoursecret';

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    if (email !== 'admin@gmail.com'){
      const doctor = await Doctor.findOne({email:email});
      res.status(200).json({ token, user: { id: doctor._id, role: user.role } });
    }
    else{
      res.status(200).json({ token, user: { id: user._id, role: user.role } });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Optional: Admin can register doctors
exports.register = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({email, password: hashed, role });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


// GET all doctors
exports.getDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: 'doctor' }, '-password');
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching doctors' });
  }
};


// DELETE a doctor
exports.deleteDoctor = async (req, res) => {
  const { id } = req.params;

  try {
    const doctor = await User.findByIdAndDelete(id);

    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

    res.json({ message: 'Doctor deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting doctor' });
  }
};
