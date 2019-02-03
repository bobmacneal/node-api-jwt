var config = require('./env.config'); // get our config file
var app = require('./app');
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : config.localHostPort;

// start server
app.listen(port, () => console.log(`Server is listening on port ${port}`));
