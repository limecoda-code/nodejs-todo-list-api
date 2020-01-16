const postgresql = require('../connect');

module.exports = {
	createTask: function(task) {
		let fieldsArray = Object.keys(task);
		let fields = fieldsArray.join('", "');
		let sql = 'INSERT INTO "Task"("' + fields + '") VALUES(';
		
		for (var i=1; i<=fieldsArray.length; i++) {
			sql += '$' + i + ', ';
		}

		// Strip extra comma from end of SQL
		sql = sql.substring(0, sql.length - 2);
		
		sql += ') RETURNING *';

		let values = Object.values(task);

		return postgresql.query(sql, values)
		.then(res => {
			return res.rows[0];
		});
	},
	retrieveTasks: function() {
		let sql = 'SELECT * FROM "Task"';

		return postgresql.query(sql)
		.then(res => {
			return res.rows;
		});
	},
	retrieveTask: function(taskId) {
		let sql = 'SELECT * FROM "Task" WHERE _id=$1';

		return postgresql.query(sql, [taskId])
		.then(res => {
			return res.rows[0];
		});
	},
	updateTask: function(taskId, task) {
		let fieldsArray = Object.keys(task);
		let sql = 'UPDATE "Task" SET ';
		
		for (var i=0; i<fieldsArray.length; i++) {
			sql += '"' + fieldsArray[i] + '"=$' + (i+1) + ', ';
		}

		// Strip extra comma from end of SQL
		sql = sql.substring(0, sql.length - 2);
		
		sql += ' WHERE _id=$' + (fieldsArray.length+1) + ' RETURNING *';

		let values = Object.values(task);
		values.push(taskId);

		return postgresql.query(sql, values)
		.then(res => {
			return res.rows[0];
		});
	},
	deleteTask: function(taskId) {
		let sql = 'DELETE FROM "Task" WHERE _id=$1';

		return postgresql.query(sql, [taskId]);
	}
}