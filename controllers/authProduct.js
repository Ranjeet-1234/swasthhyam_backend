const Product = require('../models/Product.js');


exports.add = async (req, res) => {
  try {
    const {image,name,reference} = req.body;
    const newProduct = new Product({name:name,img:image,url:reference});
    const savedProduct = await newProduct.save(); 
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// Delete doctor
exports.remove = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Service deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all doctors
exports.fetch = async (req, res) => {
  try {
    const product = await Product.find();
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedproduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedproduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
