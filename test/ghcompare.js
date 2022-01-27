const { describe, it } = require('mocha');
const chai = require('chai');

const assert = chai.assert;   // eslint-disable-line
const expect = chai.expect;   // eslint-disable-line
const should = chai.should(); // eslint-disable-line

const { ghcompare } = require('../gh-compare');

const GH_ACCESS_TOKEN = process.env.GH_ACCESS_TOKEN;
const GH_TEST_OWNER = process.env.GH_TEST_OWNER;
const GH_TEST_REPO = process.env.GH_TEST_REPO;
const GH_TEST_BASE_COMMIT = process.env.GH_TEST_BASE_COMMIT;
const GH_TEST_HEAD_COMMIT = process.env.GH_TEST_HEAD_COMMIT;

describe('GH_ACCESS_TOKEN', () => {
  it('should be an environment variable', () => {
    should.exist(GH_ACCESS_TOKEN);
  });

  if (typeof GH_ACCESS_TOKEN !== 'undefined') {
    it('should be a string', () => {
      GH_ACCESS_TOKEN.should.be.an('string');
    });
  }
});

describe('GH_TEST_OWNER', () => {
  it('should be an environment variable', () => {
    should.exist(GH_TEST_OWNER);
  });

  if (typeof GH_TEST_OWNER !== 'undefined') {
    it('should be a string', () => {
      GH_TEST_OWNER.should.be.an('string');
    });
  }
});

describe('GH_TEST_REPO', () => {
  it('should be an environment variable', () => {
    should.exist(GH_TEST_REPO);
  });

  if (typeof GH_TEST_REPO !== 'undefined') {
    it('should be a string', () => {
      GH_TEST_REPO.should.be.an('string');
    });
  }
});

describe('GH_TEST_HEAD_COMMIT', () => {
  it('should be an environment variable', () => {
    should.exist(GH_TEST_HEAD_COMMIT);
  });

  if (typeof GH_TEST_HEAD_COMMIT !== 'undefined') {
    it('should be a string', () => {
      GH_TEST_HEAD_COMMIT.should.be.an('string');
    });
  }
});

describe('GH_TEST_BASE_COMMIT', () => {
  it('should be an environment variable', () => {
    should.exist(GH_TEST_BASE_COMMIT);
  });

  if (typeof GH_TEST_BASE_COMMIT !== 'undefined') {
    it('should be a string', () => {
      GH_TEST_BASE_COMMIT.should.be.an('string');
    });
  }
});

describe('ghcompare', () => {
  it('should be a function', () => {
    ghcompare.should.be.an('function');
  });

  const envReady = typeof GH_ACCESS_TOKEN === 'string' &&
                   typeof GH_TEST_OWNER === 'string' &&
                   typeof GH_TEST_REPO === 'string' &&
                   typeof GH_TEST_BASE_COMMIT === 'string' &&
                   typeof GH_TEST_HEAD_COMMIT === 'string';

  if (envReady) {
    const resPromise = ghcompare(GH_TEST_OWNER, GH_TEST_REPO, GH_TEST_BASE_COMMIT, GH_TEST_HEAD_COMMIT, GH_ACCESS_TOKEN);
    it('should return an Array of objects', async () => {
      const res = await resPromise;
      assert(Array.isArray(res));

      if (res instanceof Array) {
        assert(res.every((x) => {
          const isObject = (typeof x === 'object');
          const hasCommitProp = (typeof x.commit === 'object');
          return isObject && hasCommitProp;
        }));
      }
    });
  }
});
