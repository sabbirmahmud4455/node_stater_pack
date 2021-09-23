const express = require('express');
const router = express.Router();
const model = require('../models/customer.model');
const { validateRequest } = require('./customer.validator');

router.get('/', async (req, res) => {
  const customers = await model.getAll();
  return res.json(customers);
});

router.get('/:customerId', async (req, res) => {
  const id = req.params.customerId;
  const customer = await model.get(id);
  if(!customer) return res.json({ message: 'Customer not found' });
  return res.json(customer);
});

router.post('/', async (req, res) => {

  const { data, error } = validateRequest(req, 'create');
  if(error) return res.json(error);

  const { customerName, email, phone } = data;
  const response = await model.add({ customerName, email, phone });
  return res.json(response);
});

router.put('/:customerId', async (req, res) => {
  const { data, error } = validateRequest(req, 'update');
  if(error) return res.json(error);

  const id = req.params.customerId;
  const customer = await model.get(id);
  if(!customer) return res.json({ message: 'Customer not found' });

  const payload = { ...req.body };
  await model.update(payload, id);
  return res.json({ message: 'Record successfully updated' });
});

router.delete('/:customerId', async (req, res) => {
  const id = req.params.customerId;
  const customer = await model.get(id);
  if(!customer) return res.json({ message: 'Customer not found' });

  await model.remove(id);
  return res.json({ message: 'Record successfully deleted' });
});



module.exports = router;