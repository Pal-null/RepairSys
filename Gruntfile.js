/**
 * Created by Zf_D on 2014-09-21
 */

module.exports = function(grunt) {
    //加载任务
    grunt.loadNpmTasks('grunt-shell');

    //初始化
    grunt.initConfig({
        shell: {
            unit_test: {
                command: 'karma start html/test/conf/karma-unit.conf.js'
            },
            e2e_test: {
                command: 'protractor html/test/conf/protractor-conf.js'
            }
        }
    });

    //注册新任务
    grunt.registerTask('unit', ['shell:unit_test']);
    grunt.registerTask('e2e', ['shell:e2e_test']);
    grunt.registerTask('default', ['unit','e2e']);
};