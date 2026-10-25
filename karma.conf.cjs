module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      'src/**/*.spec.jsx',
      'src/**/*.spec.js'
    ],
    preprocessors: {
      'src/**/*.jsx': ['coverage'],
      'src/**/*.js': ['coverage']
    },
    reporters: ['progress', 'coverage'],
    browsers: ['ChromeHeadless'],
    singleRun: true,
    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    }
  });
};