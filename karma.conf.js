// Karma configuration
// Generated on Mon Jul 15 2013 16:18:53 GMT-0700 (PDT)

module.exports = function(config, karma) {
  config.set({

    // base path, that will be used to resolve files and exclude
    // basePath: "",

    // frameworks to use
    frameworks: ["jasmine"],

    // list of files / patterns to load in the browser
    files: [
      "underscore.js",
      "underscore_spec.js"
    ],

    // test results reporter to use
    // possible values: "dots", "progress", "junit", "growl", "coverage"
    reporters: ["progress"],


    // web server port
    port: 9876,


    // cli runner port
    runnerPort: 9100,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: karma.LOG_DISABLE || karma.LOG_ERROR || karma.LOG_WARN || karma.LOG_INFO || karma.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ["PhantomJS"],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    reportSlowerThan: 500
  });
};
