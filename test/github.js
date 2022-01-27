const { describe, it } = require('mocha');
const chai = require('chai');

const assert = chai.assert;   // eslint-disable-line
const expect = chai.expect;   // eslint-disable-line
const should = chai.should(); // eslint-disable-line

const github = require('../lib/github');

describe('github', () => {
  it('should be a function', () => {
    github.should.be.an('function');
  });
});
