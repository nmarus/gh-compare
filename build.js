#!/usr/bin/env node
const Yargs = require('yargs');
const path = require('path');

const build = require('./lib/build');
const packageJson = require('./package.json');

const opts = {
  input: path.join(process.cwd(), 'gh-compare.js'),
  loglevel: 'verbose',
};

const validPlatforms = [
  'win64',
  'osx',
  'linux',
  'all',
];

const { argv } = Yargs
  .help('help')
  .version('version', packageJson.version)
  .showHelpOnFail(true)
  .usage(`Usage: node ${path.basename(__filename, '.js')} [options]`)
  .strict()
  .options({
    'platform': {
      alias: 'p',
      demandOption: true,
      type: 'string',
      describe: `Platform name [${validPlatforms.join(', ')}]`,
    },
  })
  .check(rargs => {
    if (!validPlatforms.includes(rargs.platform)) {
      throw Error(`Error: Invalid platform. Must only include one of: [${validPlatforms.join(', ')}].`);
    }

    return true;
  });

(async () => {
  switch (argv.platform) {
    case 'win64':
      await build.win64(opts);
      break;
    case 'osx':
      await build.osx(opts);
      break;
    case 'linux':
      await build.linux(opts);
      break;
    case 'all':
      await build.win64(opts);
      await build.osx(opts);
      await build.linux(opts);
      break;
    default:
  }
})()
  .then(() => console.info('Done!'))
  .catch(err => console.error(err));
