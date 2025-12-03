const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  priority: { type: String, enum: ['low','medium','high'], default: 'medium' },
  status: { type: String, enum: ['todo','in-progress','done','blocked'], default: 'todo' },
  dueDate: { type: Date },
  attachments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', TaskSchema);
