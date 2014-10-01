repairApp.controller('repiarManageCtrl', ['$scope', '$http', function ($scope, $http) {

    $scope.repairFormModel = {
        "tel": "",
        "name": "",
        "id": "",
        "commQu": ["电脑坏了", "主板烧了", "屏幕坏了","电源接触不良"],
        "checkedCommQu": [],
        "cusQu": ""
    };

    $scope.test = [1,2,3];

    $scope.toggleCommQuCheck = function (Qu) {
        if ($scope.checkedCommQu.indexOf(Qu) === -1) {
            $scope.checkedCommQu.push(Qu);
        } else {
            $scope.checkedCommQu.splice($scope.checkedCommQu.indexOf(Qu), 1);
        }
    };

    $scope.repair = function () {

    }
}]);