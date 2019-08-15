
const express = require('express');

const app = express();

app.post('/sign-up', (req, res) => {
  res.json({ok: 'users ok'});
});

module.exports = app;