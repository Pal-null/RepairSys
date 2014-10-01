/**
 * Created by admin on 2014/9/30.
 */
unitApp.controller('unitProjectManageCtrl', ['$scope', '$http', function($scope, $http) {
    menuOnClick(2)


    //页面控制
    $scope.viewselect = "maintable"//{$scope.viewselect = {maintable ||  equipmentTable || equipmentDetail} }
    $scope.equipmentTableShow = false;       //设备列表显示控制
    $scope.equipmentDetailshow = false;     //设备详细信息显示控制
    //项目管理的主页面参数
    $scope.searchinput = "";//项目搜索的框model
    $scope.projects = "";   //表格数据集

    //单位列表的参数
    //设备详细信息的参数




    $scope.projectTable = function(){
        var tempSearInput = angular.copy($scope.searchinput)
        if(tempSearInput == "" || tempSearInput == null){tempSearInput = "all"}
        $http.post("/unitPjMgrSeach",{PjName:tempSearInput}).success(function(data){
            if(data.IsSuccess){
                $scope.projects = data.Data.projects

            }else{
                if (data.Data = 404){
                    showMsg("登录状态已丢失","error")
                    //登录状态丢失就跳到登陆页面
//                    window.location = "#"
                }
            }
        },"json").error(function(){
            showMsg("连接服务器出错","error")
        })
    };


    //返回项目列表
    $scope.backProjectTable = function(){
        $scope.viewselect = "maintable";
    };
    //返回设备列表
    $scope.backEquTableShow = function(){
        $scope.viewselect = "equipmentTable";
    };
//    查看项目下的设备信息
    $scope.projectEquipment = function(){
        $scope.viewselect = "equipmentTable";
    };
    $scope.equipmentDetail = function(){
        $scope.viewselect = "equipmentDetail";
    };
}]);