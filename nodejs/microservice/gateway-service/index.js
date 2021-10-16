const gateway = require('fast-gateway');
const jwt = require('jsonwebtoken');
const port = 3000;

const gatewayConfig = {
  middlewares: [
    (req, res, next) => {
      if(req.originalUrl === '/' || req.originalUrl === '/token') {
        return next();
      }
      if(req.headers && req.headers.authorization) {
       try {
         const user = jwt.verify(req.headers.authorization, 'secret');
         return next();
       } catch (error) {
        console.log('Invalid token');
       }
      }
      return res.send({ message: 'Invalid or expired token' }, 401);
    }
  ],
  routes: [
    {
      prefix: '/customers',
      target: 'http://localhost:3001/',
    },
    {
      prefix: '/accounts',
      target: 'http://localhost:3002/'
    },
    {
      prefix: '/transactions',
      target: 'http://localhost:3003/'
    },
  ]
};

const server = gateway(gatewayConfig);

server.get('/', (req, res) => {
  res.send('This is gateway service');
});

server.post('/token', (req, res) => {
  // receive user credentials
  // query database for validity

  const token = jwt.sign({ userId: 1, username: 'user', role: 'user' }, 'secret', { expiresIn: 30 });
  res.send({ accessToken: token });
});

server.start(port)
  .then(() => { console.log(`Gateway service started at port ${port}`) });