const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, require: true },
  icon: String,
  category:{type:String,require:true},
  img:{type:String,require:true},
  description: { type: String, required: true },
  url: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
