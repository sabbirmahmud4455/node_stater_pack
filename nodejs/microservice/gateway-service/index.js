const gateway = require('fast-gateway');
const port = 3000;

const gatewayConfig = {
  routes: [
    {
      prefix: '/customers',
      target: 'http://localhost:3001/',
    },
    {
      prefix: '/accounts',
      target: 'http://localhost:3002/'
    },
  ]
};

const server = gateway(gatewayConfig);

server.get('/', (req, res) => {
  res.send('This is gateway service');
});

server.start(port)
  .then(() => { console.log(`Gateway service started at port ${port}`) });