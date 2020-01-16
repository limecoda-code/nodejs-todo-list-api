const mysql = require('../connect');

module.exports = {
	createProject: function(project) {
		return new Promise((resolve, reject) => {
			mysql.query('INSERT INTO Project SET ?', project, (error, results, fields) => {
			  if (error) return reject(error);
			  
				return mysql.query('SELECT * FROM Project WHERE _id=LAST_INSERT_ID()', (error, results, fields) => {
					if (error) return reject(error);

					return resolve(results[0]);
				});
			});
		});
	},
	retrieveProjects: function() {
		return new Promise((resolve, reject) => {
			mysql.query('SELECT * FROM Project', (error, results, fields) => {
				if (error) return reject(error);

				return resolve(results);
			});
		});
	},
	retrieveProject: function(projectId) {
		return new Promise((resolve, reject) => {
			mysql.query('SELECT * FROM Project WHERE _id=?', projectId, (error, results, fields) => {
				if (error) return reject(error);

				return resolve(results[0]);
			});
		});
	},
	updateProject: function(projectId, data) {
		let sql = 'UPDATE Project SET ';

		Object.keys(data).forEach(function(field) {
		  sql += field + '="' + data[field] + '", '
		});

		sql = sql.substring(0, sql.length - 2);
		sql += ' WHERE _id=' + projectId;

		return new Promise((resolve, reject) => {
			mysql.query(sql, (error, results, fields) => {
				if (error) return reject(error);

				return mysql.query('SELECT * FROM Project WHERE _id=?', projectId, (error, results, fields) => {
					if (error) return reject(error);

					return resolve(results[0]);
				});
			});
		});
	},
	deleteProject: function(projectId) {
		return new Promise((resolve, reject) => {
			mysql.query('DELETE FROM Project WHERE _id=?', projectId, (error, results, fields) => {
				if (error) return reject(error);

				return resolve(results);
			});
		});
	}
}