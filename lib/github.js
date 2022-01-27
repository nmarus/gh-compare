const { Octokit } = require('octokit');

const github = (pat) => {
  const octokit = new Octokit({ auth: pat });
  return {
    getOrgRepos: async (org) => {
      const iterator = octokit.paginate.iterator(octokit.rest.repos.listForOrg, {
        org,
        per_page: 100,
      });

      return iterator;
    },

    getUserRepos: async (username) => {
      const iterator = octokit.paginate.iterator(octokit.rest.repos.listForUser, {
        username,
        per_page: 100,
      });

      return iterator;
    },

    compare: async (owner, repo, base, head) => {
      const iterator = octokit.paginate.iterator(octokit.rest.repos.compareCommits, {
        owner,
        repo,
        base,
        head,
        per_page: 100,
      });

      return iterator;
    },
  };
};

module.exports = github;
