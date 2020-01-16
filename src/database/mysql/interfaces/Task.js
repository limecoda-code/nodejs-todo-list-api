const mysql = require('../connect');

module.exports = {
	createTask: function(task) {
		return new Promise((resolve, reject) => {
			mysql.query('INSERT INTO Task SET ?', task, (error, results, fields) => {
			  if (error) return reject(error);
			  
				return mysql.query('SELECT * FROM Task WHERE _id=LAST_INSERT_ID()', (error, results, fields) => {
					if (error) return reject(error);

					return resolve(results[0]);
				});
			});
		});
	},
	retrieveTasks: function() {
		return new Promise((resolve, reject) => {
			mysql.query('SELECT * FROM Task', (error, results, fields) => {
				if (error) return reject(error);

				return resolve(results);
			});
		});
	},
	retrieveTask: function(taskId) {
		return new Promise((resolve, reject) => {
			mysql.query('SELECT * FROM Task WHERE _id=?', taskId, (error, results, fields) => {
				if (error) return reject(error);

				return resolve(results[0]);
			});
		});
	},
	updateTask: function(taskId, data) {
		let sql = 'UPDATE Task SET ';

		Object.keys(data).forEach(function(field) {
		  sql += field + '="' + data[field] + '", '
		});

		sql = sql.substring(0, sql.length - 2);
		sql += ' WHERE _id=' + taskId;

		return new Promise((resolve, reject) => {
			mysql.query(sql, (error, results, fields) => {
				if (error) return reject(error);

				return mysql.query('SELECT * FROM Task WHERE _id=?', taskId, (error, results, fields) => {
					if (error) return reject(error);

					return resolve(results[0]);
				});
			});
		});
	},
	deleteTask: function(taskId) {
		return new Promise((resolve, reject) => {
			mysql.query('DELETE FROM Task WHERE _id=?', taskId, (error, results, fields) => {
				if (error) return reject(error);

				return resolve(results);
			});
		});
	}
}