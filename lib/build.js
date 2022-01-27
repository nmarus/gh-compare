const nexe = require('nexe');
const path = require('path');

const packageJson = require('../package.json');

const baseOptions = {
  build: true,
};

const build = {
  win64: async (customOptions = {}) => {
    const win64Options = {
      target: `windows-x64-${process.versions.node}`,
      output: path.join(process.cwd(), 'dist/win64', `${packageJson.name}.exe`),
    };

    await nexe.compile({
      ...baseOptions,
      ...win64Options,
      ...customOptions,
    });
  },

  osx: async (customOptions = {}) => {
    const osxOptions = {
      target: `darwin-x64-${process.versions.node}`,
      output: path.join(process.cwd(), 'dist/osx', packageJson.name),
    };

    await nexe.compile({
      ...baseOptions,
      ...osxOptions,
      ...customOptions,
    });
  },

  linux: async (customOptions = {}) => {
    const osxOptions = {
      target: `linux-x64-${process.versions.node}`,
      output: path.join(process.cwd(), 'dist/linux', packageJson.name),
    };

    await nexe.compile({
      ...baseOptions,
      ...osxOptions,
      ...customOptions,
    });
  },
};

module.exports = build;
