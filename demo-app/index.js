'use strict';

const app = require('./src/server');
const config = require('./config');

const mongoose = require('mongoose');

function tearDown(err) {
  console.error('Db connection is down');
  console.error(err);
  process.exit(1);
}


function connect() {
  mongoose.connection
    .on('error', tearDown)
    .on('disconnected', tearDown)
    .once('connected', listen);
  mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/myapp`, {useNewUrlParser: true});
}

function listen() {
  app.listen(config.PORT, () => console.log('Listening', config.PORT));
}

connect();