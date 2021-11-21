const db = require('../../../db');
const tableName = 'users';
// create your model methods here
// ** you may create different model for different db table

const getAll = function() {
	console.log(tableName);
}

module.exports = [
	getAll()
]
	
	
