


require('./core/express-promise');
const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');
const bodyParser = require('body-parser');
const {ValidationError} = require('./core/errors');

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/v1', routes);

app.use('/*',(req, res) => {
  res.status(404).json({code: 'NOT_FOUND', message: 'Not Found'});
});

app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(400).json({message: err.message});
  }

  next(err);
});

app.use((err, req, res, next) => {
  console.log('Error!', err.message);
  res.status(500).json({message: err.message});
});

module.exports = app;