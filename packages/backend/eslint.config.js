import baseConfig from '../../eslint.config.js';

export default [
  ...baseConfig,
  {
    files: ['**/*.{ts}'],
    rules: {
      'no-console': 'off',
    },
  },
];
