'use strict';

const app = require('./src/server');
const config = require('./config');

app.listen(config.PORT, () => console.log('Listening', config.PORT));