angular.module('adminApp', ['ngRoute','projectModule'])

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
    }])

    .controller('userManageCtrl', ["$scope", function($scope) {
        MenuOnClick(0);
    }]);

//左边菜单激活状态
MenuOnClick = function(arg_index) {
    $('.part a').removeClass('cur');
    $('.part a').eq(arg_index).addClass('cur');
};