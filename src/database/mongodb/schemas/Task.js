const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

// Define schema types
var ObjectId = mongoose.Schema.Types.ObjectId;

const TaskSchema = new mongoose.Schema(
	{
		project: {
			type: ObjectId,
			required: true,
			ref: 'Project'
		},
		title: {
			type: String,
			required: "Task title is required",
			trim: true,
		},
		toBeCompletedDate: {
      type: Date,
			required: true,
    },
    completedDate: {
      type: Date,
			required: false,
    }
	},
	{ minimize: false },
);

TaskSchema.plugin(timestamps);

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;