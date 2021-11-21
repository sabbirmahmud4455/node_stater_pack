const express = require('express');
const router = express.Router();
const { validateRequest } = require('../../../utils/request-validator');
const Response = require('../../../utils/response');
const { response } = require('express');

const userModule = require('../../model/user/user');

// get all users
router.get('/', (req, res) => {
	const getAll = userModule.getAll();	
	res.json(getAll);
	console.log('get user');
})

// require your models here


// sample post method
// router.post('/', async (req, res) => {
//   const response = new Response(res);
//   try {
//     validate request to check user input errors
//     call model methods
//     send response to client
//   } catch (error) {
//     send error response to client
//   }
// });

module.exports = router;