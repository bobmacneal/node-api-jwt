var config = require('./config/index');
var app = require('./app');
const port = config.port;

if (config.env === 'development') {
  app.listen(port, () => console.log(`Listening on port ${port}. Connected to ${config.db}.`));
} else {
  app.listen(port);
}

