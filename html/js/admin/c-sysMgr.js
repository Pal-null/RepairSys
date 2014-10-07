/**
 * Created by Zf_D on 2014-10-05
 */
adminApp.controller('sysMgrCtrl', ['$scope', '$http', function($scope, $http) {
    //激活菜单状态
    menuOnClick(6);

    //分页
    $scope.goPage = "";
    $scope.perPage = 10;
    $scope.curPage = 1;
    $scope.totalPage = 1;
    $scope.totalCount = 0;

    /*
     后台传来
     data.Data["rows"] = [
         {T_id : "1", Name : "属性1", Can_visual : 1}
     ];
     前台列表
     $scope.rows = [
         {T_id : "1", Name : "属性1", Can_visual : 1, tName: "属性1", tCan_visual: 1, Flag: null}
     ];
     */
    //数据列表
    $scope.rows = [];
    $scope.emptyListFlag = false;
    $scope.allCheck = false;

    //添加属性
    $scope.addRow = {Name: "", Can_visual: 1};
    $scope.clearAddRow = function() {
        $scope.addRow = {Name: "", Can_visual: 1};
    };

    /*CRUD函数*/

    $scope.getAttrs = function() {
        //处理参数
        $scope.params = {
            CurPage : $scope.curPage,
            PerPage : $scope.perPage
        };
        $http.post("/SysMgrCtrl/GetAttrs", $scope.params).success(function(data) {
            if(data.IsSuccess) {
                $scope.rows = [];
                if(data.Reason != "") {
                    $scope.emptyListFlag = true;
                    $scope.totalPage = 1;
                    $scope.totalCount = 0;
                } else {
                    $scope.emptyListFlag = false;
                    //添加中间列，用于记录原数据
                    angular.forEach(data.Data["rows"], function(row, index) {
                        $scope.rows[index] = row;
                        $scope.rows[index].Flag = null;
                        $scope.rows[index].Check = false;
                        $scope.rows[index].tName = row.Name;
                        $scope.rows[index].tCan_visual = row.Can_visual;
                    });
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
    $scope.getAttrs();

    $scope.createAttr = function() {
        if($scope.checkAllUpdate()) {
            $http.post("/SysMgrCtrl/CreateAttr", $scope.addRow).success(function(data) {
                if(data.IsSuccess) {
                    showMsg("成功添加属性", "success", null);
                    $scope.clearAddRow();
                    $scope.toPage(1);
                } else {
                    showMsg(data.Reason, "error", null);
                }
            },"json").error(function() {
                actionError();
            });
        }
    };

    $scope.updateAttrs = function() {
//        $http.post("/SysMgrCtrl/UpdateAttrs", null).success(function(data) {
//            if(data.IsSuccess) {
//                showMsg("保存成功", "success", null);
//                $scope.getAttrs();
//            } else {
//                showMsg(data.Reason, "error", null);
//            }
//        },"json").error(function() {
//            actionError();
//        });
    };

    $scope.deleteAttrs = function(arg_row) {
        if($scope.checkAllUpdate()) {
//            if(arg_row != undefined) {
//                showMsg("删除一条", "success", null);
//            } else {
//                showMsg("批量删除", "success", null);
//            }
//            $http.post("/SysMgrCtrl/DeleteAttrs", null).success(function(data) {
//                if(data.IsSuccess) {
//                    showMsg("删除成功", "success", null);
//                    $scope.getAttrs();
//                } else {
//                    showMsg(data.Reason, "error", null);
//                }
//            },"json").error(function() {
//                actionError();
//            });
        }
    };

    //多选
    $scope.selectAll = function() {
        $scope.allCheck = !$scope.allCheck;
        for(var i in $scope.rows) {
            $scope.rows[i].Check = $scope.allCheck;
        }
    };

    //检查总数据，有改动就提示保存
    $scope.checkAllUpdate = function() {
        for(var i in $scope.rows) {
            if($scope.rows[i].Flag != null) {
                showMsg("数据已被修改，是否保存？", "info", $scope.updateAttrs);
                return false;
            }
        }
        return true;
    };

    //检查行数据，被修改即换背景颜色
    $scope.checkRowUpdate = function(arg_row) {
        if(arg_row.Name != arg_row.tName || arg_row.Can_visual != arg_row.tCan_visual) {
            arg_row.Flag = {"background-color" : "#fbffb2;"};
        } else {
            arg_row.Flag = null;
        }
    };

    /*分页函数*/
    $scope.toPage = function(arg_page) {
        $scope.goPage = "";
        arg_page = parseInt(arg_page);
        if(isNaN(arg_page) || arg_page < 1 || arg_page > $scope.totalPage) {
            return;
        }
        if($scope.checkAllUpdate()) {
            $scope.curPage = arg_page;
            $scope.getAttrs();
        }
    };

}]);