const Task = require('../models/Task');
const Project = require('../models/Project');

exports.createTask = async (req, res, next) => {
  try {
    const { title, description, project, assignee, priority, dueDate } = req.body;
    const projectExists = await Project.findById(project);
    if (!projectExists) return res.status(400).json({ message: 'Invalid project' });

    const task = await Task.create({
      title,
      description,
      project,
      assignee,
      priority,
      dueDate
    });
    res.status(201).json(task);
  } catch (err) { next(err); }
};

exports.getTasks = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.project) filter.project = req.query.project;
    if (req.query.assignee) filter.assignee = req.query.assignee;
    const tasks = await Task.find(filter)
      .populate('assignee','name email')
      .populate('project','name');
    res.json(tasks);
  } catch (err) { next(err); }
};

exports.getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id).populate('assignee','name email').populate('project','name');
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) { next(err); }
};

exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) { next(err); }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) { next(err); }
};
