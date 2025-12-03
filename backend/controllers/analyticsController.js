const Project = require('../models/Project');
const Task = require('../models/Task');

exports.summary = async (req, res, next) => {
  try {
    const totalProjects = await Project.countDocuments();
    const totalTasks = await Task.countDocuments();
    const tasksByStatusAgg = await Task.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    const projectsByStatus = await Project.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    res.json({
      totalProjects,
      totalTasks,
      tasksByStatus: tasksByStatusAgg,
      projectsByStatus
    });
  } catch (err) { next(err); }
};

