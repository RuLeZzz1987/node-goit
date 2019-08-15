
const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');

const app = express();

app.use(morgan('combined'));
app.use(routes);

app.use('/*',(req, res) => {
  res.status(404).json({code: 'NOT_FOUND', message: 'Not Found'});
});

app.use((err, req, res, next) => {
  console.log('Error!', err.message);
  res.status(500).json({message: err.message});
});

module.exports = app;