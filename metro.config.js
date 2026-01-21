const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

// Enable support for CommonJS modules (.cjs)
defaultConfig.resolver.sourceExts.push('cjs');

// Disable package exports to allow proper module resolution
defaultConfig.resolver.unstable_enablePackageExports = false;

module.exports = defaultConfig;
