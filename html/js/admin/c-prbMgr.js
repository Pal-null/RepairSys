/**
 * Created By ZhengQinyu
 * 2014-10-01
 * 管理员通用问题页面控制器
 */

adminApp.controller('prbMgrCtrl', ['$scope', '$http', function ($scope, $http) {

    //点击效果
    menuOnClick(5);

    //测试模式,post结果-PostResult:{"success","failure","error"}
    $scope.IsTest = false;
    $scope.PostResult = "";

    //临时变量
    $scope.problems = [];
    $scope.per_problem = {T_id: 0, Problem: "", Status: 1};
    $scope.i_Tid = 0;
    $scope.temp_i_problem = "";
    $scope.temp_i_status = 1;


    $scope.perPage = 10;
    $scope.curPage = 1;
    $scope.totalPage = 0;
    $scope.totalCount = 0;
    $scope.goPage = null;

    $scope.getProblems = function () {
        //发出请求
//        console.log($scope.cur_page);
        $http.post("/getProblem", {
            curPage: $scope.curPage,
            perPage: $scope.perPage,
            searchStatus:$scope.searchStatus
        }).success(function (data) {
            if (data.IsSuccess) {
                $scope.totalPage = data.Data["totalPage"];
                $scope.totalCount = data.Data["totalCount"];
                $scope.problems = data.Data["problems"];
                $scope.PostResult = "success";
                if($scope.totalCount==0)$scope.totalPage=1;
            } else {
                if (!$scope.IsTest)binApp.alert(data.Reason, {action: "top"});
                $scope.PostResult = "failure";
            }
            //下面这句一定要加上，这样数据才能及时应用
//                $scope.$apply()
        }, "json").error(function () {
            //服务器没有返回，自动提示报错
            if (!$scope.IsTest)binApp.alert('服务器出错', {action: "top"});
            $scope.PostResult = 'error';
        })
    };

    //编辑框 提交 按钮
    $scope.clickOK = function () {
        //添加问题
        if ($scope.IsOK == '1') {
            //问题输入不能为空
            if (!$scope.IsTest && $scope.edit_form.$invalid) {
                return;
            }
            $http.post("/addProblem", {
                i_problem: $scope.i_problem,
                i_status: $scope.i_status
            }).success(function (data) {
                if (data.IsSuccess) {
                    showMsg("添加通用问题成功", "success", null);
                    //添加成功返回第一页并刷新
                    $scope.curPage = 1;
                    if (!$scope.IsTest)$scope.getProblems();
                    $scope.i_problem = "";
                    $scope.PostResult = "success";
                } else {
                    if (!$scope.IsTest)showMsg(data.Reason, "warn", null);
                }
            }, "json").error(function () {
                if (!$scope.IsTest)
                    showMsg("服务器出错", "error", null);
            })
            ;
            //修改问题
        } else if ($scope.IsOK == '0') {
            if (!$scope.IsTest && $scope.temp_i_problem == $scope.i_problem &&
                $scope.temp_i_status == $scope.i_status) {
                showMsg("数据没有改变", "warn", null);
                return;
            }
            $http.post("/updateProblem", {
                i_Tid: $scope.i_Tid,
                i_problem: $scope.i_problem,
                i_status: $scope.i_status
            }).success(function (data) {
                if (data.IsSuccess) {
                    if (!$scope.IsTest){
                        showMsg("修改成功", "success", null);
                        binApp.getId('editEquipment').off();
                        $scope.getProblems();
                    }
                    $scope.PostResult = "success";
                } else {
                    showMsg(data.Reason, "warn", null);
                }
            }, "json").error(function () {
                showMsg("服务器出错", "error", null);
            });
        }
    };

    //分页函数
    $scope.toPage = function (arg_page) {
        $scope.goPage = "";
        arg_page = parseInt(arg_page);
        if (isNaN(arg_page) || arg_page < 1 || arg_page > $scope.totalPage) {
            return;
        }
        $scope.curPage = arg_page;
        $scope.getProblems();
    };

    //添加问题的编辑框
    $scope.showEditorAdd = function () {
        //问题
        $scope.i_problem = "";
        //状态
        $scope.i_status = 1;
        //标题
        $scope.edit_title = '添加问题';
        //按钮
        $scope.IsOK = '1';
        if (!$scope.IsTest)binApp.window(binApp.getId('editEquipment'), {action: 'scale', fixed: true}, 'normal');
    };

    //编辑问题的编辑框
    $scope.showEditorUpdate = function (per_problem) {
        $scope.i_problem = per_problem.Problem;
        $scope.i_status = per_problem.Status;
        $scope.temp_i_problem = per_problem.Problem;
        $scope.temp_i_status = per_problem.Status;
        $scope.i_Tid = per_problem.T_id;
        $scope.edit_title = '编辑';
        $scope.IsOK = '0';
        if (!$scope.IsTest)binApp.window(binApp.getId('editEquipment'), {action: 'scale', fixed: true}, 'normal');
    };

    //搜索栏状态改变
    $scope.searchStatusChange = function(){
        $scope.toPage(1);
        $scope.getProblems();
    };

    $scope.getProblems();

}]);