#!/usr/bin/env node
const Yargs = require('yargs');

const config = require('./lib/config');
const github = require('./lib/github');
const packageJson = require('./package.json');

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
  const { pat } = await config.prompt();

  const iterator = await github(pat).compare(argv.owner, argv.repository, argv.base, argv.head);

  for await (const { data } of iterator) {
    data.commits.forEach(item => {
      const timestamp = item.commit.author.date;
      const author = item.commit.author.email;
      const message = item.commit.message;
      console.log(`${timestamp} ${author} ${message}`);
    });
  }
})().catch(err => console.error(err));
