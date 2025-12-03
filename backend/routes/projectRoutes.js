const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// all protected
router.use(protect);

router.post('/', projectController.createProject);
router.get('/', projectController.getProjects);
router.get('/:id', projectController.getProjectById);
router.put('/:id', projectController.updateProject);
router.delete('/:id', authorizeRoles('admin'), projectController.deleteProject);

module.exports = router;
