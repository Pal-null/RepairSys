var testAppModule = angular.module('testAppModule', ['ngRoute'])

testAppModule.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/hello', {
        templateUrl: 'tpl/demo/testAppTpl.html',
        controller: 'testAppController'
    }).otherwise({
        redirectTo: '/hello'
    })
}]);

testAppModule.controller('testAppController', ['$scope', function ($scope) {
    $scope.books = [
        {title: "test1", authors: "author1"},
        {title: "test2", authors: "author2"},
        {title: "test3", authors: "author3"}
    ]
}])