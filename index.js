'use strict';

var isString = require('lodash.isstring');
var isFunction = require('lodash.isfunction');

exports = module.exports = function (name, validationFn, errorMessage) {

  if (!isString(name)) {
    throw new Error('Invalid Argument');
  }

  var isValid = isFunction(validationFn) ? validationFn : exists;

  if (!isValid(process.env[name])) {

    if (!isString(errorMessage)) {
      errorMessage = (isValid === exists)
        ? 'Missing Environment Variable "' + name + '"'
        : 'Invalid Environment Variable "' + name + '"';
    }

    throw new Error(errorMessage);
  }

  return process.env[name];
};

// ---

function exists(val) {
  return val != null;
}
