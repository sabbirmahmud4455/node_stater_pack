const db = require('./db');
const tableName = 'customers';
const idColumn = 'customerId';

const getAll = async () => {
  const sql = `SELECT * FROM ${tableName}`;
  const customers = await db.query(sql);
  return customers;
};

const get = async (id) => {
  const sql = `SELECT * FROM ${tableName} WHERE ${idColumn}=${db.escape(id)}`;
  const customers = await db.query(sql);
  return customers.length > 0 ? customers[0] : null;
};

const add = async ({ customerName, phone, email }) => {
  const sql = `INSERT INTO ${tableName} VALUES (null, ?,?,?)`;
  return await db.query(sql, [customerName, phone, email]);
};

const update = async (data, id) => {
  const sql = `UPDATE ${tableName} SET ? WHERE ${idColumn}=${db.escape(id)}`;
  return await db.query(sql, data);
};

const remove = async (id) => {
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