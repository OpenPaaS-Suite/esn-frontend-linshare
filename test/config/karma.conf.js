'use strict';

const webpackConfig = require('../../webpack.test');

module.exports = function(config) {
  const singleRun = process.env.SINGLE_RUN !== 'false';
  // We need a timeout of at least 10000ms or else the tests will sometimes randomly
  // fail because they exceed the default 2000ms timeout. This will happen often in
  // the CI where the tests run slower than in our locals.
  const timeout = process.env.TEST_TIMEOUT || 10000;

  config.set({
    client: {
      mocha: {
        timeout
      }
    },
    basePath: '../../',
    files: [
      'src/index.test.js'
    ],
    frameworks: ['mocha', 'sinon-chai'],
    colors: true,
    autoWatch: true,
    singleRun,
    browsers: ['FirefoxHeadless'],
    customLaunchers: {
      FirefoxHeadless: {
        base: 'Firefox',
        flags: ['--headless'],
        prefs: { 'network.proxy.type': 0 }
      }
    },
    reporters: ['spec'],
    preprocessors: {
      'src/index.test.js': ['webpack'],
      'frontend/app/**/!(*spec).js': ['webpack']
    },
    plugins: [
      'karma-firefox-launcher',
      'karma-mocha',
      'karma-spec-reporter',
      'karma-webpack',
      'karma-sinon-chai'
    ],

    webpack: webpackConfig
  });
};
