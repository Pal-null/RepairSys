/**
 * Created by Zf_D on 2014-10-01
 */
adminApp.controller('unitMgrCtrl', ['$scope', '$http', function($scope, $http) {
    //激活菜单状态
    menuOnClick(2);

    //分页
    $scope.goPage = "";
    $scope.perPage = 10;
    $scope.curPage = 1;
    $scope.totalPage = 1;
    $scope.totalCount = 0;

    //数据列表
    $scope.rows = [];
    $scope.emptyListFlag = false;

    //查询关键字
    $scope.searchList = {T_id: "", Name : "", Status: ""};

    //添加数据
    $scope.addRow = {Name: "", Status: 1, Account: "", Phone: ""};
    $scope.clearAddRow = function() {
        $scope.addRow = {Name: "", Status: 1, Account: "", Phone: ""};
    };

    //修改数据
    $scope.tempRow = {OldName: "", Name: "", Status: "", Account: "", Phone: ""};
    $scope.setTempRow = function(arg_row) {
        $scope.tempRow.T_id = arg_row.T_id;
        $scope.tempRow.OldName = arg_row.Name;
        $scope.tempRow.Name = arg_row.Name;
        $scope.tempRow.Status = arg_row.Status;
        $scope.tempRow.Account = arg_row.Account;
        $scope.tempRow.Phone = arg_row.Phone;
    };

    /*CRUD函数*/

    $scope.getUnits = function() {
        //处理参数
        $scope.params = {
            T_id : $scope.searchList.T_id,
            Name : $scope.searchList.Name,
            Status : $scope.searchList.Status,
            CurPage : $scope.curPage,
            PerPage : $scope.perPage
        };
        $http.post("/UnitMgrCtrl/GetUnits", $scope.params).success(function(data) {
            if (data.IsSuccess) {
                if (data.Reason != "") {
                    $scope.emptyListFlag = true;
                    $scope.rows = null;
                    $scope.totalPage = 1;
                    $scope.totalCount = 0;
                } else {
                    $scope.emptyListFlag = false;
                    $scope.rows = data.Data["rows"];
                    $scope.totalPage = data.Data["totalPage"];
                    $scope.totalCount = data.Data["totalCount"];
                }
            } else {
                showMsg(data.Reason, "error", null);
            }
        },"json").error(function() {
            actionError();
        })
    };
    $scope.getUnits();

    $scope.searchUnits = function() {
        $scope.curPage = 1;
        $scope.getUnits();
    };

    $scope.createUnit = function() {
        $http.post("/UnitMgrCtrl/CreateUnit", $scope.addRow).success(function(data) {
            if (data.IsSuccess) {
                $scope.toPage(1);
                showMsg("添加单位成功", "success", null);
                $scope.clearAddRow();
            } else {
                showMsg(data.Reason, "error", null);
            }
        },"json").error(function() {
            actionError();
        });
    };

    $scope.updateUnit = function() {
        $http.post("/UnitMgrCtrl/UpdateUnit", $scope.tempRow).success(function(data) {
            if (data.IsSuccess) {
                $scope.getUnits();
                showMsg("修改单位成功", "success", null);
            } else {
                showMsg(data.Reason, "error", null);
            }
        },"json").error(function() {
            actionError();
        });
    };

    /*分页函数*/
    $scope.toPage = function(arg_page) {
        $scope.goPage = "";
        arg_page = parseInt(arg_page);
        if(isNaN(arg_page) || arg_page < 1 || arg_page > $scope.totalPage) {
            return;
        }
        $scope.curPage = arg_page;
        $scope.getUnits();
    };

}]);