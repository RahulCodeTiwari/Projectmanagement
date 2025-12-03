const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const upload = require('../middleware/uploadMiddleware.js');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

// single or multiple: field name 'files' (array)
router.post('/upload', upload.array('files', 10), fileController.uploadFiles);
router.get('/', fileController.getFiles);
router.post('/attach', fileController.attachToTask);
router.delete('/:id', fileController.deleteFile);

module.exports = router;
