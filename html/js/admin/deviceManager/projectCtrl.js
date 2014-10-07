/**
 * Created by zhang on 2014/10/1.
 */
adminApp.controller('devicesManageProjectCtrl', ['$scope', '$http', function($scope, $http) {
    menuOnClick(4)


    //分页
    $scope.goPage = "";
    $scope.perPage = 10;
    $scope.curPage = 1;
    $scope.totalPage = 1;
    $scope.totalCount = 0;
    /*分页函数*/
    $scope.toPage = function(arg_page) {
        $scope.goPage = "";
        arg_page = parseInt(arg_page);
        if(isNaN(arg_page) || arg_page < 1 || arg_page == $scope.curPage || arg_page > $scope.totalPage) {
            return;
        }
        $scope.curPage = arg_page;
        $scope.getUnits();
    };


    $scope.users="";
    $scope.getProjectList=function(){
        //发出请求
        $http.get("/getDeviceManagerProject",null).success(function(data){
            //判断后台返回的处理请求的是否成功
            if (data.IsSuccess){
                //将后台返回的数据复制到model上
                $scope.users = data.Data.users;
            }else{
                //不成功输出原因
                binApp.alert(data.Reason,{action:"top"});
            }
            //下面这句一定要加上，这样数据才能及时应用
//                $scope.$apply()
        },"json").error(function(){
            //服务器没有返回，自动提示报错
            binApp.alert('服务器出错',{action:"top"});
        })
    };
    $scope.getProjectList();

    $scope.getDeviceProjList = function(){
        //处理参数
        $scope.params = {
            ProjectName : $scope.ProjectName,
            unitName : $scope.unitName,
            CurPage : $scope.curPage,
            PerPage : $scope.perPage
        };
        $http.post("/getDManagerProj", $scope.params).success(function(data) {
            if (data.IsSuccess) {
            if (data.Reason != "") {
                 $scope.emptyListFlag = true;
                 $scope.DmProject = null;
                 $scope.totalPage = 1;
                 $scope.totalCount = 0;
            } else {
                 $scope.emptyListFlag = false;
                 $scope.DmProject = data.Data[""];
                 $scope.totalPage = data.Data["totalPage"];
                 $scope.totalCount = data.Data["totalCount"];
                }
            } else {
                showMsg(data.Reason, "error");
            }
        },"json").error(function() {
            actionError();
        })

    };

    $scope.Search = function(projectName,unitName){
        if(projectName==undefined) projectName = ""
        if(unitName==undefined) unitName = ""

        searchMethod = $http.post("/SearchDeviceMgrProjByBoth",{projectName : projectName,unitName : unitName}).success(function(data){
            //判断后台返回的处理请求的是否成功
            if (data.IsSuccess){
                //将后台返回的数据复制到model上
                $scope.users = data.Data.users;
            }else{
                //不成功输出原因
                binApp.alert(data.Reason,{action:"top"});
            }
            //下面这句一定要加上，这样数据才能及时应用
//                $scope.$apply()
        },"json").error(function(){
            //服务器没有返回，自动提示报错
            binApp.alert('服务器出错',{action:"top"});
        })
       // binApp.alert(projectName+"\n"+unitName,{action:"top"});
    }

}]);