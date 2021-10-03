const db = require('./db');
const logger = require('./utils/logger');
const moment = require('moment');
const axios = require('axios').default;
const { services } = require('./config.json');

const tableName = 'accounts';
const idColumn = 'accountNumber';

const getAll = async () => {
  logger.info(`ACCOUNT-MODEL::getAll()`);
  const sql = `SELECT * FROM ${tableName}`;
  const accounts = await db.query(sql);
  return accounts;
};

const get = async (id) => {
  logger.info(`ACCOUNT-MODEL::get()`);
  const sql = `SELECT * FROM ${tableName} WHERE ${idColumn}=${db.escape(id)}`;
  const accounts = await db.query(sql);
  return accounts.length > 0 ? accounts[0] : null;
};

const add = async ({ accountNumber, accountName, accountType, balance, owner }) => {
  logger.info(`ACCOUNT-MODEL::add()`);
  const now = moment().format('YYYY-MM-DD HH:mm:ss');
  const sql = `INSERT INTO ${tableName} VALUES (?,?,?,?,?,?,?)`;
  return await db.query(sql, [accountNumber, accountName, accountType, balance, now, now, owner]);
};

const update = async (data, id) => {
  logger.info(`ACCOUNT-MODEL::update()`);
  const sql = `UPDATE ${tableName} SET ? WHERE ${idColumn}=${db.escape(id)}`;
  logger.debug(sql);
  return await db.query(sql, data);
};

const remove = async (id) => {
  logger.info(`ACCOUNT-MODEL::remove()`);
  const sql = `DELETE FROM ${tableName} WHERE ${idColumn}=${db.escape(id)}`;
  return await db.query(sql);
};

const getCustomer = async (id) => {
  logger.info(`ACCOUNT-MODEL::getCustomer()`);
  try {
    const url = `${services.customer}/${id}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    logger.error(error);
    return null;
  }
};


module.exports = {
  getAll,
  get,
  add,
  update,
  remove,
  getCustomer,
};