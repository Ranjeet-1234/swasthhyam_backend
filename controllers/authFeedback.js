const Feedback = require('../models/Feedback.js');


exports.add = async (req, res) => {
  try {
    const newFeedback = new Feedback(req.body);
    const savedFeedback = await newFeedback.save(); 
    res.status(201).json(savedFeedback);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// Delete doctor
exports.remove = async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.json({ message: 'Feedback deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all doctors
exports.fetch = async (req, res) => {
  try {
    const feedback = await Feedback.find();
    res.json(feedback);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
