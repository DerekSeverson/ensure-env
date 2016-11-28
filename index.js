'use strict';

var isString = require('lodash.isstring');
var isFunction = require('lodash.isfunction');

exports = module.exports = function (name, isValid, errorMessage) {

  if (
    (!isString(name)) ||
    (exists(isValid) && !isFunction(isValid)) ||
    (exists(errorMessage) && !isString(errorMessage))
  ) {
    throw new Error('Invalid Arguments');
  }

  if (!(name in process.env)) {
    throw new Error('Missing Environment Variable "' + name + '"');
  }

  isValid || (isValid = exists);

  if (!isValid(process.env[name])) {
    throw new Error(errorMessage || ('Invalid Environment Variable "' + name + '"'));
  }

  return process.env[name];
};

// ---

function exists(val) {
  return val != null;
}
