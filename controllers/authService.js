const Service = require('../models/Service.js');


exports.add = async (req, res) => {
  try {
    const newService = new Service(req.body);
    const savedService = await newService.save(); 
    res.status(201).json(savedService);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// Delete doctor
exports.remove = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'Service deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all doctors
exports.fetch = async (req, res) => {
  try {
    const service = await Service.find();
    res.json(service);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedservice = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedservice);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
