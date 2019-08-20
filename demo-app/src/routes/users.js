




const express = require('express');
const Joi = require('joi');
const {ValidationError} = require('../core/errors');

const app = express();
const userService = require('../services/user-service/user-service');

app.post('/', async (req, res) => {
  const schema = Joi.object().keys({
    firstName: Joi.string().min(3).max(20),
    lastName: Joi.string().min(3).max(20),
    email: Joi.string().email()
  }).options({
    presence: 'required',
    stripUnknown: true,
    abortEarly: false
  });

  const result = schema.validate(req.body);

  if (result.error) {
    throw new ValidationError(result.error.message);
  }

  const user = await userService.create(result.value);

  res.json(user);
});

app.get('/:id', async (req, res) => {
  const user = await userService.getOne(req.params.id);

  if (!user) {
    return res.status(404).json({
      code: 'NOT_FOUND',
      message: 'Not Found'
    });
  }

  res.json(user);
});

app.delete('/:id', async (req, res) => {

  await userService.remove(id);

  res.status(202).json({removed: true});
});

module.exports = app;