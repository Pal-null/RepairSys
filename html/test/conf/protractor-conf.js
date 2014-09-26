exports.config = {
    allScriptsTimeout: 10000,

    specs: [
        '../e2e/**/*.js'
    ],

    capabilities: {
        'browserName': 'chrome'
    },

    framework: 'jasmine',

    baseUrl: 'http://localhost:8000',

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    }
};