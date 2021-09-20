const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/', async (req, res) => {
  const sql = 'SELECT * FROM customers';
  const customers = await db.query(sql);
  res.json(customers);
});

module.exports = router;