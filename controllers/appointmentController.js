const Appointment = require('../models/Appointment');
const mongoose = require('mongoose');
const Doctor = require("../models/Doctor")
const nodemailer = require('nodemailer');

exports.createAppointment = async (req, res) => {
  const { fullName, email, mobile, age, gender, service, address, date, timeSlot, doctor } = req.body;
  try {
    const doctorData = await Doctor.findOne({ name: doctor });
    const appointment = new Appointment({
      patientName: fullName, PatientEmail: email, patientPhone: mobile, patientAge: age, PatientGender: gender,
      PatientService: service, PatientAddress: address, date: date, time: timeSlot, doctor: doctorData
    });
    await appointment.save();
    res.status(201).json({ message: 'Appointment booked successfully', appointment });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Error booking appointment' });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const { id } = req.params;
    const now = new Date();
    const startOfTodayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    const appointments = await Appointment.find({
      doctor: new mongoose.Types.ObjectId(id),
      date: { $gte: startOfTodayUTC }
    }).populate('doctor', 'name email');
  
    res.status(200).json(appointments);
  } catch (err) {
    console.error("Error fetching appointments:", err);
    res.status(500).json({ message: 'Error fetching appointments' });
  }
};

exports.updateAppointmentStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ['pending', 'confirmed', 'cancelled'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  try {
    const updated = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate('doctor', 'name email'); // only doctor is a reference

    if (!updated) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Send confirmation email
    if (status === 'confirmed' && updated.PatientEmail) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user:"swasthhyam@gmail.com",
          pass:"vrqu ezdu rfzn hcdm",
        },
      });

      const mailOptions = {
        from: "swasthhyam@gmail.com",
        to: updated.PatientEmail,
        subject: 'Appointment Confirmed - Swasthhyam Ayurveda',
        html: `
          <p>Dear ${updated.patientName},</p>
          <p>Your appointment with Dr. ${updated.doctor.name} has been <strong>confirmed</strong>.</p>
          <p><strong>Date:</strong> ${new Date(updated.date).toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${updated.time}</p>
          <p>Thank you for choosing Swasthhyam Ayurveda.</p>
          <p>Warm regards,<br/>Swasthhyam Clinic Team</p>
        `,
      };

      await transporter.sendMail(mailOptions);
    }

    res.json({ message: 'Appointment status updated', appointment: updated });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Error updating appointment status' });
  }
};


exports.getAllAppointments = async (req, res) => {
  try {
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    const appointments = await Appointment.find({
      createdAt: { $gte: threeMonthsAgo }
    }).populate('doctor', 'name email');

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching appointments' });
  }
};
