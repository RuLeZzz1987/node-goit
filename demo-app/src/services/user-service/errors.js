


const {ValidationError} = require('../../core/errors');


class EmailError extends ValidationError {}

module.exports = {
  EmailError
};