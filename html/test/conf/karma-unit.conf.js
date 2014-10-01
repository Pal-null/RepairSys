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
            'js/common/*.js',
            //在这里添加源文件
            'js/demo/router.js',//必须先引用router.js
            'js/demo/*.js',
            //在这里添加单元测试文件
            'test/unit/demo/*.js'
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