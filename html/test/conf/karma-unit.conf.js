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
            'lib/global/binApp-1.0.js',
            'lib/global/*.js',
            'js/common/*.js',

            /*****在这里添加测试 start*****/

            //admin
            'js/admin/router.js',
            'js/admin/*.js',
            'test/unit/admin/*.js',

            //unitManager
            "js/unitManager/router.js",
            "js/unitManager/*.js",
            'test/unit/unitMge/*.js'

            /*****在这里添加测试 end*****/
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