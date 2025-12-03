const File = require('../models/File');
const Task = require('../models/Task');
const path = require('path');
const fs = require('fs');

exports.uploadFiles = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }
    const saved = [];
    for (const f of req.files) {
      const doc = await File.create({
        filename: f.filename,
        originalname: f.originalname,
        path: `/uploads/${f.filename}`,
        size: f.size,
        uploader: req.user._id
      });
      saved.push(doc);
    }
    res.status(201).json(saved);
  } catch (err) { next(err); }
};

exports.attachToTask = async (req, res, next) => {
  try {
    const { taskId, fileId } = req.body;
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (!task.attachments) task.attachments = [];
    task.attachments.push(fileId);
    await task.save();
    res.json(task);
  } catch (err) { next(err); }
};

exports.getFiles = async (req, res, next) => {
  try {
    const files = await File.find().populate('uploader','name email').sort({ uploadedAt: -1 });
    res.json(files);
  } catch (err) { next(err); }
};

exports.deleteFile = async (req, res, next) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ message: 'File not found' });
    const diskPath = path.join(__dirname, '..', file.path);
    // remove db doc
    await file.remove();
    // remove physical file (ignore errors)
    fs.unlink(diskPath, (err) => {});
    res.json({ message: 'File deleted' });
  } catch (err) { next(err); }
};
