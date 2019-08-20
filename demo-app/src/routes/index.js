
const express = require('express');
const products = require('./products');
const users = require('./users');

const app = express();

app.use('/products', products);
app.use('/users', users);

module.exports = app;
