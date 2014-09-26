var adminApp = angular.module('adminApp', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/userManage', {
                templateUrl: 'tpl/demo/userManage.html',
                controller: 'userManageCtrl'
            })
            .when('/projectManage', {
                templateUrl: 'tpl/demo/projectManage.html',
                controller: 'projectManageCtrl'
            })
             .otherwise({
                redirectTo: '/userManage'
            })
    }]);
