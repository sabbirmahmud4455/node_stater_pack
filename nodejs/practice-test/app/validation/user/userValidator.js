const { validate } = require('../../../utils/request-validator');

const rules = {
  // create your validation rules here
};

const validateRequest = (req, ruleName) => {
  const rule = rules[ruleName];
  return validate(req, rule);
};

module.exports = {
  validateRequest,
};