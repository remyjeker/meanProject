const mongoose = require('mongoose');
const util = require('util');
const debug = require('debug')('express-mongoose-es6-rest-api:index');

const config = require('./config');

const mongoUri = config.mongo.host;
const mongooseOpts = {
  keepAlive: 1,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(mongoUri, mongooseOpts);
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});

if (config.MONGOOSE_DEBUG) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}
