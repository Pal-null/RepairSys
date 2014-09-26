module.exports = function(config) {
    config.set({
        basePath: '../../',//html/
        frameworks: ['jasmine'],
        reporters: ['progress', 'junit', 'coverage'],
        browsers: ['Chrome'],
        autoWatch: true,
        singleRun: true,
        colors: true,
        files: [
            'lib/angular/angular.js',
            'lib/angular/angular-route.js',
            'lib/angular/angular-animate.js',
            'lib/jquery-1.11.0.min.js',
            'lib/angular/angular-mocks.js',
            'lib/global/*.js',
            'js/**/*.js',//源文件
            'test/unit/**/*.js'//测试文件
        ],
        preprocessors: {
            'js/**/*.js': 'coverage'//需要测试覆盖率的js文件
        },
        coverageReporter: {
            type: 'html',
            dir: 'test/out/'//覆盖率报告的输出位置
        },
        junitReporter: {
            outputFile: 'test/out/unit-test.xml',//单元测试结果
            suite: ''
        }
    });
};