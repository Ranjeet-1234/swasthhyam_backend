const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');

router.post('/login', authController.login);
router.post('/register', authController.register); // Protect in production
router.get('/', auth(['admin']), authController.getDoctors);
router.delete('/:id', auth(['admin']), authController.deleteDoctor);

module.exports = router;
