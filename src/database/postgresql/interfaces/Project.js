const postgresql = require('../connect');

module.exports = {
	createProject: function(project) {
		let fieldsArray = Object.keys(project);
		let fields = fieldsArray.join('", "');
		let sql = 'INSERT INTO "Project"("' + fields + '") VALUES(';
		
		for (var i=1; i<=fieldsArray.length; i++) {
			sql += '$' + i + ', ';
		}

		// Strip extra comma from end of SQL
		sql = sql.substring(0, sql.length - 2);
		
		sql += ') RETURNING *';

		let values = Object.values(project);

		return postgresql.query(sql, values)
		.then(res => {
			return res.rows[0];
		});
	},
	retrieveProjects: function() {
		let sql = 'SELECT * FROM "Project"';

		return postgresql.query(sql)
		.then(res => {
			return res.rows;
		});
	},
	retrieveProject: function(projectId) {
		let sql = 'SELECT * FROM "Project" WHERE _id=$1';

		return postgresql.query(sql, [projectId])
		.then(res => {
			return res.rows[0];
		});
	},
	updateProject: function(projectId, project) {
		let fieldsArray = Object.keys(project);
		let sql = 'UPDATE "Project" SET ';
		
		for (var i=0; i<fieldsArray.length; i++) {
			sql += '"' + fieldsArray[i] + '"=$' + (i+1) + ', ';
		}

		// Strip extra comma from end of SQL
		sql = sql.substring(0, sql.length - 2);
		
		sql += ' WHERE _id=$' + (fieldsArray.length+1) + ' RETURNING *';

		let values = Object.values(project);
		values.push(projectId);

		return postgresql.query(sql, values)
		.then(res => {
			return res.rows[0];
		});
	},
	deleteProject: function(projectId) {
		let sql = 'DELETE FROM "Project" WHERE _id=$1';

		return postgresql.query(sql, [projectId]);
	}
}