const express = require('express');
const Joi = require('joi');
const {ValidationError} = require('../core/errors');

const app = express();
const userService = require('../services/user-service/user-service');
const Busboy = require('busboy');
const fs = require('fs');
const path = require('path');

const mongoose = require('mongoose');
const User = mongoose.model('User');

app.post('/', async (req, res) => {
  const user = new User(req.body);
  user.foo();
  await user.save();
  res.json(user);
});

app.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      code: 'NOT_FOUND',
      message: 'Not Found'
    });
  }

  res.json(user);
});

// app.post('/', async (req, res) => {
//   const schema = Joi.object().keys({
//     firstName: Joi.string().min(3).max(20),
//     lastName: Joi.string().min(3).max(20),
//     email: Joi.string().email()
//   }).options({
//     presence: 'required',
//     stripUnknown: true,
//     abortEarly: false
//   });
//
//   const result = schema.validate(req.body);
//
//   if (result.error) {
//     throw new ValidationError(result.error.message);
//   }
//
//   const user = await userService.create(result.value);
//
//   res.json(user);
// });

// app.get('/:id', async (req, res) => {
//   const user = await userService.getOne(req.params.id);
//
//   if (!user) {
//     return res.status(404).json({
//       code: 'NOT_FOUND',
//       message: 'Not Found'
//     });
//   }
//
//   res.json(user);
// });

app.delete('/:id', async (req, res) => {

  await userService.remove(id);

  res.status(202).json({removed: true});
});

app.post('/avatar', (req, res) => {
  const busboy = new Busboy({headers: req.headers});
  busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
    console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
    const writeStream = fs.createWriteStream(path.resolve(process.cwd(), 'static', filename));
    file.on('end', function () {
      console.log('File [' + fieldname + '] Finished');
    });
    file.pipe(writeStream);
  });
  busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
    console.log('Field [' + fieldname + ']: value: ' + val);
  });
  busboy.on('finish', function () {
    console.log('Done parsing form!');
    res.json({success: true});
  });
  busboy.on('error', (err) => {
    res.status(500).json(err);
  });
  req.pipe(busboy);
});

module.exports = app;