/**
 * Created by zhang on 2014/10/3.
 */
adminApp.controller('devicesManageUnitDeviceCtrl', ['$scope', '$http','$routeParams', function($scope, $http,$routeParams) {
    menuOnClick(4)

    $scope.unitDevices="";




    $scope.getUnitDeviceList=function(){
        $scope.ProjectName= $routeParams.Name;
        $scope.UnitName = $routeParams.Uname ;
        $scope.No = $routeParams.No;
        $scope.Prounit_id = $routeParams.Prounit_id;
        //发出请求
        $http.post("/getDMUnitDevice",{No:$scope.No,id:$scope.Prounit_id}).success(function(data){
            //判断后台返回的处理请求的是否成功
            if (data.IsSuccess){
                //将后台返回的数据复制到model上
                $scope.unitDevices = data.Data.unitDevices;
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
    $scope.getUnitDeviceList();

    $scope.Search = function(DeviceName){
        $http.post("/SearchDeviceMgrDevice",{No:$scope.No,id:$scope.Prounit_id,DeviceName:DeviceName}).success(function(data){
            //判断后台返回的处理请求的是否成功
            if (data.IsSuccess){
                //将后台返回的数据复制到model上
                $scope.unitDevices = data.Data.unitDevices;
            }else{
                //不成功输出原因
                binApp.alert(data.Reason,{action:"top"});
            }
        },"json").error(function(){
            //服务器没有返回，自动提示报错
            binApp.alert('服务器出错',{action:"top"});
        })
    }

    $scope.EditClick = function(device){
        $scope.DeviceName = device.Name;
        $scope.Warranty = device.Warranty;
        $scope.Op_status = device.Op_status;
        $scope.DeviceName = device.Name;
        $scope.T_id = device.T_id;

        $scope.CProjectName=  $scope.ProjectName;
        $scope.CUnitName = $scope.UnitName;
        $scope.CDeviceName = $scope.DeviceName
        $scope.CWarranty = device.Warranty;
        $scope.COp_status = device.Op_status;

    }

    $scope.Click = function(){
        if($scope.CWarranty==null){
            showMsg("保修期 请输入数字","warn");
            return
        }

        if($scope.CWarranty.toString().indexOf('.')!=-1){
            showMsg("保修期 不支持小数","warn");
            return
        }
        $scope.wight = $scope.IsDeviceDiff();
        if($scope.IsOnlyDeviceChange()){

            $scope.UpdateDMUnitDevice()

        }else{
            binApp.alert("没有发生改变",{action:"top"});

        }
    }


    $scope.IsOnlyDeviceChange =function(){
        return $scope.wight==1;
    }

    $scope.IsDeviceDiff = function(){
        if($scope.COp_status!=$scope.Op_status || $scope.CWarranty!=$scope.Warranty || $scope.CDeviceName != $scope.DeviceName){
            return 1;
        }else{
            return 0 ;
        }
    }

    $scope.IsVerify = function(){
        if(isNaN($scope.CWarranty)){
            return true;
        }else{
            showMsg("保修期 请输入数字且不支持小数"+$scope.CWarranty,"warn");
            return false
        }
    }


        $scope.UpdateDMUnitDevice=function(){
        $http.post("/UpdateDMUnitDevice",{ T_id:$scope.T_id,
                                          Op_status:$scope.Op_status,
                                          Name: $scope.CDeviceName,
                                          Warranty:  $scope.CWarranty   }).success(function(data){
            //判断后台返回的处理请求的是否成功
            if (data.IsSuccess){
            //将后台返回的数据复制到model上
                $scope.getUnitDeviceList()
                binApp.getId("editEquipment").off();
            }else{
            //不成功输出原因
                binApp.alert(data.Reason,{action:"top"});
            }
            //下面这句一定要加上，这样数据才能及时应用
            },"json").error(function(){
            //服务器没有返回，自动提示报错
                binApp.alert('服务器出错',{action:"top"});
        })
    };

}]);