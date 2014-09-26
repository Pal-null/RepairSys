/**
 * Created by Zf_D on 2014-09-21
 */

module.exports = function(grunt) {

    /*
    //获取npm环境变量路径
    var paths = process.env["PATH"].split(";");
    npmPath = paths[paths.length-1];
    grunt.log.writeln("Globe npm path:", npmPath);

    //获取当前项目路径
    grunt.file.setBase(__dirname);
    grunt.log.writeln("Current path:", __dirname);

    //加载目标路径的任务
    grunt.loadTasks(npmPath+"\\node_modules\\grunt-shell\\tasks");
    grunt.loadTasks(npmPath+"\\node_modules\\grunt-shell\\tasks");
    */

    //加载任务
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-srv');

    //初始化
    grunt.initConfig({
        srv: {
            start_server: {
                options: {
                    stdout: false,//控制台输出
                    ctrlc: true
                },
                cmd: 'http-server -a localhost -p 8000 -c-1'
            }
        },
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
    grunt.registerTask('e2e', ['srv:start_server','shell:e2e_test','srv-stop']);
    grunt.registerTask('default', ['unit','e2e']);
};