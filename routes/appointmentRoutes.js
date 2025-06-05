const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const auth = require('../middleware/authMiddleware');

router.post('/', appointmentController.createAppointment);
router.get('/', auth(['admin', 'doctor']), appointmentController.getAllAppointments);
router.patch('/:id/status', auth(['admin', 'doctor']), appointmentController.updateAppointmentStatus);
// router.get('/', auth(['admin', 'doctor']), appointmentController.getAppointments);
router.get('/:id', auth(['admin', 'doctor']), appointmentController.getAppointments);



module.exports = router
