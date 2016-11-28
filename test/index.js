'use strict';

var assert = require('assert');
var env = require('../index');

describe('ensure-env', function () {

  it('should throw error if missing env var', function () {
    assert.throws(
      () => env('MY_MISSING_VAR'),
      /Missing Environment Variable "MY_MISSING_VAR"/
    );
  });

  it('should throw "Invalid" error if fails validation', function () {
    process.env.MY_INVALID_VAR = 'abc';
    assert.throws(
      () => env('MY_INVALID_VAR', (o) => o === 'xyz'),
      /Invalid Environment Variable "MY_INVALID_VAR"/
    );
  });

  it('should throw custom error message if fails validation', function () {
    process.env.MY_INVALID_VAR = 'abc';
    assert.throws(
      () => env('MY_INVALID_VAR', (o) => o === 'xyz', 'CUSTOM ERROR!'),
      /CUSTOM ERROR!/
    );
  });

  it('should return value if env var exists', function () {
    process.env.MY_EXISTING_VAR = 'abc';
    assert.equal(env('MY_EXISTING_VAR'), 'abc');
  });

  it('should return value if env var passes validation function', function () {
    process.env.MY_VALID_VAR = 'abc';
    assert.equal(env('MY_VALID_VAR', (o) => o === 'abc'), 'abc');
  });

});
