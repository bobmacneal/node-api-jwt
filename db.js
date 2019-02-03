const config = require('./env.config');
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGODB_URI || config.mongoDbConnectionString,{ useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = {
  User: require('./models/User'),
};
