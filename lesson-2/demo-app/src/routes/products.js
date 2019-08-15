
const express = require('express');

const app = express();

app.get('/:id',(request, response) => {
  response.json({ok: 'request data', id: request.params.id});
});

app.get('/',(request, response) => {
  response.json({ok: 'request data', id: request.query.id});
});

app.post('/',(request, response) => {
  response.status(201).json({ok: 'create data'});
});

module.exports = app;