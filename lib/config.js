const { Octokit } = require('octokit');
const inquirer = require('inquirer');

const config = {
  // throws on invalid config
  test: async (cfg) => {
    if (typeof cfg !== 'object') {
      throw new Error('Invalid config Object!');
    }

    if (typeof cfg.pat !== 'string') {
      throw new Error('Invalid config Object!');
    }

    try {
      const octokit = new Octokit({ auth: cfg.pat });
      await octokit.rest.users.getAuthenticated();
    }
    catch (err) {
      console.log(err.message);
      // override error message
      throw new Error('Github Personal Access Token was not able to authenticate!');
    }
  },

  prompt: async () => {
    // recursively prompt for pat until validated
    const promptPat = async () => {
      const { pat } = await inquirer.prompt([
        {
          type: 'password',
          name: 'pat',
          mask: '*',
          message: 'Github Personal Access Token:',
        },
      ]);

      try {
        await config.test({ pat });
      }
      catch (err) {
        console.info(`${err.message} Please try again...`);
        await promptPat();
      }

      return pat;
    };

    // return validated config
    return { pat: await promptPat() };
  },
};

module.exports = config;
