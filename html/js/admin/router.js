var adminApp = angular.module('adminApp', ['ngRoute'])

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
            .when('/userMgr', {
                templateUrl: 'tpl/admin/userMgr.html',
                controller: 'userMgrCtrl'
            })
            .when('/pjMgr', {
                templateUrl: 'tpl/admin/pjMgr.html',
                controller: 'pjMgrCtrl'
            })
            .when('/unitMgr', {
                templateUrl: 'tpl/admin/unitMgr.html',
                controller: 'unitMgrCtrl'
            })
            .when('/prbMgr',{
                templateUrl: 'tpl/admin/prbMgr.html',
                controller: 'prbMgrCtrl'
            })
            .when('/sysMgr',{
                templateUrl: 'tpl/admin/sysMgr.html',
                controller: 'sysMgrCtrl'
            })
            .when('/unitDeviceProjectManager',{
                templateUrl: 'tpl/admin/unitDevice/ProjectManager.html',
                controller: 'devicesManageProjectCtrl'
            })
            .when('/unitDeviceUnitManager/:Name :Uname :No :Prounit_id',{
                templateUrl: 'tpl/admin/unitDevice/unitManager.html',
                controller :'devicesManageUnitDeviceCtrl'
            })
            .when('/unitDeviceManager/:T_id :Name :Uname :No :Prounit_id',{
                templateUrl: 'tpl/admin/unitDevice/DeviceManager.html',
                controller :'devicesManagePropertyCtrl'
            })
            .otherwise({
                redirectTo: '/userMgr'
            })
    }]);
