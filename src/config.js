module.exports = {
	name: 'Todo List API',
	env: process.env.NODE_ENV || 'development',
	port: process.env.PORT || 3000,
	base_url: 'http://localhost:3000',
	db: {
		// MongoDB config
		type: 'mongodb',
		uri: 'mongodb://database:27017/todo'

		// MySQL config
		//type: 'mysql',
		//host: 'database',
		//port: '3306',
  	//user: 'root',
  	//password: 'example'

		// PostgreSQL config
		//type: 'postgresql',
		//host: 'database',
		//port: 5432,
  	//user: 'todo',
  	//password: 'example'
	},
};