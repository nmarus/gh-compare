#!/usr/bin/env node
const Yargs = require('yargs');

const config = require('./lib/config');
const github = require('./lib/github');
const packageJson = require('./package.json');

async function ghcompare(owner, repo, base, head, pat) {
  // query gh api
  const iterator = await github(pat).compare(owner, repo, base, head);
  let res = [];
  for await (const { data } of iterator) {
    res = [...res, ...data.commits];
  }

  return res;
}

// If executed directly, run, else was loaded as module
if (require.main === module) {
  const { argv } = Yargs
    .help('help')
    .version('version', packageJson.version)
    .showHelpOnFail(true)
    .usage(`Usage: ${packageJson.name} [options]`)
    .strict()
    .options({
      'owner': {
        alias: 'o',
        demandOption: true,
        type: 'string',
        describe: 'Github organization or user name',
      },
      'repository': {
        alias: 'r',
        demandOption: true,
        type: 'string',
        describe: 'Github repository name',
      },
      'base': {
        alias: 'b',
        demandOption: true,
        type: 'string',
        describe: 'Git BASE commit',
      },
      'head': {
        alias: 'h',
        demandOption: true,
        type: 'string',
        describe: 'Git HEAD commit',
      },
    });

  (async () => {
    // prompt for personal access token
    const { pat } = await config.prompt();

    // get results and format
    const res = await ghcompare(argv.owner, argv.repository, argv.base, argv.head, pat);
    res.forEach(item => {
      // format console output
      const timestamp = item.commit.author.date;
      const author = item.commit.author.email;
      const message = item.commit.message;
      console.log(`${timestamp} ${author} ${message}`);
    });
  })().catch(err => console.error(err));
}

// export for tests
module.exports = { ghcompare };
