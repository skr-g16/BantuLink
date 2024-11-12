// jest.config.js
/** @type {import('jest').Config} */
const config = {
  testMatch: [
    '**/tests/**/*.test.[jt]s?(x)',
  ],

  // The paths to modules that run some code to configure or set up the testing environment before each test
  setupFiles: ['fake-indexeddb/auto'],

  // The test environment that will be used for testing
  testEnvironment: 'jsdom',  // Pastikan ini menunjuk ke jest-environment-jsdom

  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.(js|ts)$': 'babel-jest',
  },
};

export default config;
