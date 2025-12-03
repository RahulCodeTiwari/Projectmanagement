const Project = require('../models/Project');
const Task = require('../models/Task');

exports.createProject = async (req, res, next) => {
  try {
    const { name, description, members, startDate, endDate } = req.body;
    const project = await Project.create({
      name,
      description,
      owner: req.user._id,
      members: members || [],
      startDate, endDate
    });
    res.status(201).json(project);
  } catch (err) { next(err); }
};

exports.getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find()
      .populate('owner', 'name email')
      .populate('members', 'name email')
      .sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) { next(err); }
};

exports.getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('owner', 'name email')
      .populate('members', 'name email');
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) { next(err); }
};

exports.updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) { next(err); }
};

exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    // remove tasks belonging to the project
    await Task.deleteMany({ project: project._id });
    await project.remove();
    res.json({ message: 'Project and its tasks removed' });
  } catch (err) { next(err); }
};
