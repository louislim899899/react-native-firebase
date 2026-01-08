const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist'],
    settings: {
      'import/resolver': {
        alias: {
          map: [
            ['@', '.']   // IMPORTANT: '.' not './'
          ],
          extensions: ['.js', '.jsx', '.ts', '.tsx']
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          moduleDirectory: ['node_modules', '.']
        }
      }
    }
  }
]);
