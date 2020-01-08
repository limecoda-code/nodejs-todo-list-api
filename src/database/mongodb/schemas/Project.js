const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const ProjectSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: "Project title is required",
			trim: true,
		},
		toBeCompletedDate: {
      type: Date,
			required: "To be completed date is required",
    },
    completedDate: {
      type: Date,
			required: false,
    }
	},
	{ minimize: false },
);

ProjectSchema.plugin(timestamps);

const Project = mongoose.model('Project', ProjectSchema);
module.exports = Project;