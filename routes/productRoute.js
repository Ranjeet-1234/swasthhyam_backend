const express = require('express');
const router = express.Router();
const authProduct = require('../controllers/authProduct');
const auth = require('../middleware/authMiddleware');

router.post('/add', auth(['admin']), authProduct.add);
router.delete('/:id', auth(['admin']), authProduct.remove);
router.put('/:id', auth(['admin']), authProduct.update);
router.get('/', authProduct.fetch);

module.exports = router;
