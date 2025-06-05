const Activity = require('../models/Activity.js');


exports.add = async (req, res) => {
  try {
    const newActivity = new Activity(req.body);
    const savedActivity = await newActivity.save(); 
    res.status(201).json(savedActivity);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// Delete doctor
exports.remove = async (req, res) => {
  try {
    await Activity.findByIdAndDelete(req.params.id);
    res.json({ message: 'Activity deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all doctors
exports.fetch = async (req, res) => {
  try {
    const activity = await Activity.find();
    res.json(activity);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedActivity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedActivity);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
