const db = require('./db');
const logger = require('./utils/logger');
const tableName = 'customers';
const idColumn = 'customerId';

const getAll = async () => {
  logger.info(`CUSTOMER-MODEL::getAll()`);
  const sql = `SELECT * FROM ${tableName}`;
  const customers = await db.query(sql);
  return customers;
};

const get = async (id) => {
  logger.info(`CUSTOMER-MODEL::get()`);
  const sql = `SELECT * FROM ${tableName} WHERE ${idColumn}=${db.escape(id)}`;
  const customers = await db.query(sql);
  return customers.length > 0 ? customers[0] : null;
};

const add = async ({ customerName, phone, email }) => {
  logger.info(`CUSTOMER-MODEL::add()`);
  const sql = `INSERT INTO ${tableName} VALUES (null, ?,?,?)`;
  return await db.query(sql, [customerName, phone, email]);
};

const update = async (data, id) => {
  logger.info(`CUSTOMER-MODEL::update()`);
  const sql = `UPDATE ${tableName} SET ? WHERE ${idColumn}=${db.escape(id)}`;
  return await db.query(sql, data);
};

const remove = async (id) => {
  logger.info(`CUSTOMER-MODEL::remove()`);
  const sql = `DELETE FROM ${tableName} WHERE ${idColumn}=${db.escape(id)}`;
  return await db.query(sql);
};


module.exports = {
  getAll,
  get,
  add,
  update,
  remove,
};