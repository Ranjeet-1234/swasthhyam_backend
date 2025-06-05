const express = require('express');
const router = express.Router();
const authDoc = require('../controllers/authdoctor');
const auth = require('../middleware/authMiddleware');

router.post('/add', auth(['admin', 'doctor']), authDoc.add);
router.put('/update/:id', auth(['admin', 'doctor']), authDoc.update);
router.delete('/delete/:id', auth(['admin', 'doctor']), authDoc.remove);
router.get('/', authDoc.fetch);

module.exports = router;
