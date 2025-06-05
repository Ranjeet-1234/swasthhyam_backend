const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, require: true },
  img:{type:String,require:true},
  url: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
