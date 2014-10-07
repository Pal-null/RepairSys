var salesApp = angular.module('salesApp', ['ngRoute'])

    .config(['$httpProvider', function($httpProvider) {
        //重写angular请求
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        $httpProvider.defaults.transformRequest = function(data) {
            if (data == undefined) {
                return data;
            }
            return $.param(data);
        };
        //处理IE缓存数据问题
        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.get = {};
        }
        $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
    }])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/repiarManage', {
                templateUrl: 'tpl/salesman/salesrepair.html',
                controller: 'salesmanCtrl'
            })
            .otherwise({
                redirectTo: '/repiarManage'
            })
    }]);