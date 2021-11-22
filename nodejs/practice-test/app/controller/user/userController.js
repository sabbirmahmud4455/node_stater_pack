const express = require('express');
const router = express.Router();
const { validateRequest } = require('../../validation/user/userValidator');
const Response = require('../../../utils/response');
const { response } = require('express');

const userModule = require('../../model/user/user');

// get all users
router.get('/', async (req, res) => {
	const getAll = await userModule.getAll();	
	res.json(getAll);
})

router.get('/:id', async (req, res) => {
	const id = req.params.id;
	const user = await userModule.find(id);
	res.json(user);
})

router.post('/', async (req, res) => {

//   const responsess = new Response(res);
//   try {
//     const { data, error } = validateRequest(req, 'create');
//     if(error) return response.badRequest(error);

//     const { customerName, email, phone } = data;
//     const customer = await model.add({ customerName, email, phone });
//     return response.created(customer);
//   } catch (error) {
//     logger.error(`CUSTOMER-CONTROLLER::INSERT`);
//     const message = error.message ? error.message : 'Server error';
//     response.internalServerError({ message });
//   }



  const response = new Response(res)

  try {
	const {data, error} = validateRequest (req, 'create');

	if(error) return response.badRequest(error);


	console.log('hello');

	// const {userName, password} = data;

	// const user = await userModule.store(userName, password)

	// return response.created(user);

  } catch (error) {
	  
  }



	

	// const response = new Response(res)
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