const Validator = require('fastest-validator');

const rules = {
  create: {
    customerName: { type: 'string', empty: false },
    phone: { type: 'string', empty: false },
    email: { type: 'string', empty: false, optional: true },
  },
  update: {
    customerName: { type: 'string', empty: false, optional: true },
    phone: { type: 'string', empty: false, optional: true },
    email: { type: 'string', empty: false, optional: true },
  },
};

const validateRequest = (req, ruleName) => {
  if(Object.keys(req.body).length === 0) {
    return {
      error: { message: 'Request body cannot be empty.' }
    };
  }
  
  const v = new Validator();
  const result = v.validate(req.body, rules[ruleName]);
  if(result !== true) {
    return { error: result };
  }
  else {
    return { data: { ...req.body } };
  }
};

module.exports ={
  validateRequest,
};