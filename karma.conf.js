const webpackConfig = require('./webpack.config.js');

const developmentMode = process.env.NODE_ENV === 'development';
const generateSourceMaps = process.argv.indexOf('--source-maps') > -1;

module.exports = (config) => {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],

    // test results reporter to use
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'coverage'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    logLevel: config.INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: developmentMode,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: !developmentMode,

    // list of files / patterns to load in the browser
    files: [
      './test/bundle.js',
    ],

    coverageReporter: {
      dir: 'test-coverage',
      reporters: [
        { type: 'html', subdir: 'html-coverage-report' },
        { type: 'lcovonly', subdir: 'lcov-coverage-report' },
        { type: 'text-summary' },
      ],
      watermarks: {
        branches: [50, 70],
        functions: [50, 80],
        lines: [50, 80],
        statements: [50, 80],
      },
    },

    preprocessors: {
      './test/bundle.js': generateSourceMaps ? ['webpack', 'sourcemap'] : ['webpack'],
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      noInfo: true,
    },
  });
};
