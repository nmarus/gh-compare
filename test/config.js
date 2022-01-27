const { describe, it } = require('mocha');
const chai = require('chai');

const assert = chai.assert;   // eslint-disable-line
const expect = chai.expect;   // eslint-disable-line
const should = chai.should(); // eslint-disable-line

const config = require('../lib/config');

describe('config', () => {
  it('should be an object.', () => {
    config.should.be.an('object');
  });
});
