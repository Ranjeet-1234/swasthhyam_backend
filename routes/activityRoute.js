const express = require('express');
const router = express.Router();
const authActivity = require('../controllers/authActivity');
const auth = require('../middleware/authMiddleware');

router.post('/add', auth(['admin']), authActivity.add);
router.delete('/:id', auth(['admin']), authActivity.remove);
router.put('/:id', auth(['admin']), authActivity.update);
router.get('/', authActivity.fetch);

module.exports = router;
