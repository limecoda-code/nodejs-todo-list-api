/**
 * Model Schema
 */
const Task = require('../schemas/Task');

module.exports = {
	createTask: function(data) {
		let task = new Task(data);
		
		return task.save();
	},
	retrieveTasks: function() {
		return Task.find().exec();
	},
	retrieveTask: function(taskId) {
		return Task.findById(taskId).exec();
	},
	updateTask: function(taskId, data) {
		return Task.findByIdAndUpdate(taskId, data).exec()
		.then((task) => {
			return this.retrieveTask(taskId);
		});
	},
	deleteTask: function(taskId) {
		return Task.findByIdAndRemove(taskId).exec();
	}
}