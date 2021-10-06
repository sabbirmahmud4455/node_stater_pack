const db = require('./db');
const logger = require('./utils/logger');
const moment = require('moment');
const axios = require('axios').default;
const { services } = require('./config.json');

const tableName = 'transactions';
const idColumn = 'transactionId';

const deposit = async ({ accountNumber, transactionType, amount, remarks }) => {
  logger.info(`TRANSACTION-MODEL::deposit()`);
  const now = moment().format('YYYY-MM-DD HH:mm:ss');
  let sql = `INSERT INTO ${tableName} VALUES (null,?,?,?,?,?)`;
  await db.query(sql, [accountNumber, transactionType, amount, now, remarks]);

  sql = 'UPDATE accounts SET balance=balance+?, lastTransactionAt=? WHERE accountNumber=?';
  await db.query(sql, [amount, now, accountNumber]);
};

const withdraw = async ({ accountNumber, transactionType, amount, remarks }) => {
  logger.info(`TRANSACTION-MODEL::withdraw()`);
  const now = moment().format('YYYY-MM-DD HH:mm:ss');
  let sql = `INSERT INTO ${tableName} VALUES (null,?,?,?,?,?)`;
  await db.query(sql, [accountNumber, transactionType, amount, now, remarks]);

  sql = 'UPDATE accounts SET balance=balance-?, lastTransactionAt=? WHERE accountNumber=?';
  await db.query(sql, [amount, now, accountNumber]);
};

const getAccount = async (id) => {
  logger.info(`TRANSACTION-MODEL::getAccount()`);
  try {
    const url = `${services.account}/${id}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    logger.error(error);
    return null;
  }
};


module.exports = {
  deposit,
  withdraw,
  getAccount,
};