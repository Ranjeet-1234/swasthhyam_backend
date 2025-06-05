const express = require('express');
const router = express.Router();
const authTestimonial = require('../controllers/authTestimonial');
const auth = require('../middleware/authMiddleware');

router.post('/add', auth(['admin']), authTestimonial.add);
router.delete('/:id', auth(['admin']), authTestimonial.remove);
router.put('/:id', auth(['admin']), authTestimonial.update);
router.get('/', authTestimonial.fetch);

module.exports = router;
