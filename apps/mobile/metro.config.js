const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

const monorepoRoot = path.resolve(__dirname, '../..');
const monorepoNodeModules = path.resolve(monorepoRoot, 'node_modules');
const localNodeModules = path.resolve(__dirname, 'node_modules');

const config = {
  watchFolders: [monorepoRoot],
  resolver: {
    nodeModulesPaths: [localNodeModules, monorepoNodeModules],
    disableHierarchicalLookup: true,
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
