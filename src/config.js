module.exports = {
	name: 'Todo List API',
	env: process.env.NODE_ENV || 'development',
	port: process.env.PORT || 3000,
	base_url: 'http://localhost:3000',
	db: {
		type: 'mongodb',
		uri: 'mongodb://database:27017/todo',
		//type: 'mysql',
	},
};