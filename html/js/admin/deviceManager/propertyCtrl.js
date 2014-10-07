/**
 * Created by zhang on 2014/10/3.
 */
/**
 * Created by zhang on 2014/10/3.
 */
adminApp.controller('devicesManagePropertyCtrl',['$scope', '$http','$routeParams', function($scope, $http,$routeParams) {
    menuOnClick(4)

    $scope.Dps="";
    $scope.getPropertyList=function(){
        //发出请求
        $http.post("/getProperty",{Pid:$routeParams.T_id}).success(function(data){
            //判断后台返回的处理请求的是否成功
            $scope.ProjectName= $routeParams.Name;
            $scope.UnitName = $routeParams.Uname ;
            $scope.No = $routeParams.No;
            $scope.Prounit_id = $routeParams.Prounit_id;
            $scope.T_id = $routeParams.T_id;

            if (data.IsSuccess){
                //将后台返回的数据复制到model上
                $scope.Dps = data.Data.Dps;
            }else{
                //不成功输出原因
                binApp.alert(data.Reason,{action:"top"});
                history.go(-1)
            }
            //下面这句一定要加上，这样数据才能及时应用
//                $scope.$apply()
        },"json").error(function(){
            //服务器没有返回，自动提示报错
            binApp.alert('服务器出错',{action:"top"});
        })
    };
    $scope.getPropertyList();

}]);