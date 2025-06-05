const express = require('express');
const router = express.Router();
const authService = require('../controllers/authService');
const auth = require('../middleware/authMiddleware');

router.post('/add', auth(['admin']), authService.add);
router.delete('/:id', auth(['admin']), authService.remove);
router.put('/:id', auth(['admin']), authService.update);
router.get('/', authService.fetch);

module.exports = router;
