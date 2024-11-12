/* eslint-disable no-undef */
const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: './e2e/**/*.test.cjs',
  output: './e2e/output',
  helpers: {
    Playwright: {
      browser: 'chromium',
      url: 'http://127.0.0.1:9000/',
      show: true
    }
  },
  include: {
    I: './steps_file.cjs'
  },
  name: 'katalog-restoran-plus-PWA'
};