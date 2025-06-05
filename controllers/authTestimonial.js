const Testimonial = require('../models/Testimonial.js');


exports.add = async (req, res) => {
  try {
    const newTestimonial = new Testimonial(req.body);
    const savedTestimonial = await newTestimonial.save(); 
    res.status(201).json(savedTestimonial);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// Delete doctor
exports.remove = async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ message: 'Testimonial deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all doctors
exports.fetch = async (req, res) => {
  try {
    const testimonial = await Testimonial.find();
    res.json(testimonial);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedTestimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTestimonial);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
