const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  title: { type: String, require: true },
  image:{type:String,require:true},
  date:{type:Date,require:true},
  description: { type: String, required: true },
  participants: { type: String, required: true },
  url: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Activity', activitySchema);
