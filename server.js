const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

mongoose.connect(process.env.MONGO_URI);

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));
app.use('/api/doctors', require('./routes/docRoute'));
app.use('/api/services', require('./routes/serviceRoute'));
app.use('/api/products', require('./routes/productRoute'));
app.use('/api/activities', require('./routes/activityRoute'));
app.use('/api/testimonials', require('./routes/testimonialRoute'));
app.use('/api/feedback', require('./routes/feedbackRoute'));
app.get('/',(req,res)=>{
  res.send("welcome to Swasthhyam")
})

app.listen(process.env.PORT , () => {
  console.log(`Server running... ${process.env.PORT}`);
});
