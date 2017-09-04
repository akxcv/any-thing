/* eslint-env node */
module.exports = {
  browser: true,
  collectCoverageFrom: ['src/**/*.js'],
  setupFiles: ['./tests/__setup__.js'],
  testMatch: ['**/tests/**/*-test.js'],
}
