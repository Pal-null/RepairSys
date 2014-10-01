exports.config = {
    allScriptsTimeout: 10000,
    //在这里添加e2e测试文件
    specs: [
        '../e2e/demo/*.js'
    ],

    capabilities: {
        'browserName': 'chrome'
    },

    framework: 'jasmine',

    baseUrl: 'http://localhost:9191',

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    }
};