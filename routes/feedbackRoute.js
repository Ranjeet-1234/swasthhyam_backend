const express = require('express');
const router = express.Router();
const authFeedback = require('../controllers/authFeedback');
const auth = require('../middleware/authMiddleware');

router.post('/add', authFeedback.add);
router.delete('/:id', auth(['admin']), authFeedback.remove);
router.get('/',auth(['admin']), authFeedback.fetch);

module.exports = router;
