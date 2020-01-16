/**
 * Model Schema
 */
const Project = require('../schemas/Project');

module.exports = {
	createProject: function(data) {
		let project = new Project(data);
		
		return project.save();
	},
	retrieveProjects: function() {
		return Project.find().exec();
	},
	retrieveProject: function(projectId) {
		return Project.findById(projectId).exec();
	},
	updateProject: function(projectId, data) {
		return Project.findByIdAndUpdate(projectId, data).exec()
		.then((project) => {
			return this.retrieveProject(projectId);
		});
	},
	deleteProject: function(projectId) {
		return Project.findByIdAndRemove(projectId).exec();
	}
}