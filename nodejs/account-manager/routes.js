const customerController = require('./controllers/customer.controller');

const registerRoutes = (app) => {
  app.use('/customers', customerController);
};

module.exports = {
  registerRoutes,
};
