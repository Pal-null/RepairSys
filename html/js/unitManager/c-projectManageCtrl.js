/**
 * Created by luoweihao on 2014-10-01
 */
unitApp.controller('unitProjectManageCtrl', ['$scope', '$http', function($scope, $http) {

    menuOnClick(2);
    //每页数据数
    $scope.perpage = 10;
    //项目表分页信息
    $scope.pjCurPage = 1;
    $scope.pjSumPage = 0;
    $scope.pjGoToPage = "";
    $scope.PjSumRecord = 1;
    $scope.pjtableEmpty = true;
    //设备表分页信息
    $scope.eqmCurPage = 1;
    $scope.eqmSumPage = 0;
    $scope.eqmGoToPage = "";
    $scope.eqmSumRecord = 1;
    $scope.eqmtableEmpty = true;
    //页面控制
    $scope.viewselect = "1";//{$scope.viewselect = {1 ||  2 || 3} }
    //项目管理的主页面参数
    $scope.searchinput = "";//项目搜索框的model
    $scope.projects = [];   //表格数据集
    $scope.pjUnitNo = "";//存储工程单位编号
    $scope.eqmNo = "";//存储设备编号
    //设备列表的参数
    $scope.searchEqmName = "";//设备搜索框的model
    $scope.equipments = [];
    $scope.eqmNo = "";

    //设备详细信息的参数
    $scope.eqmDetails = [];


    //编辑窗口变量
    $scope.editfrom = {
        T_id:"",
        eqmNo:"",
        unit:"",
        equipment:"",
        starttime:"",
        warranty:"",
        status:""
    };

    //项目列表函数---------------------------------------
    $scope.projectTable = function(arg_type){
        if (arg_type == 1 ){
            $scope.pjCurPage = 1
        }
        var tempSearInput = angular.copy($scope.searchinput);
        var curpage = angular.copy($scope.pjCurPage);
        var perpage = angular.copy($scope.perpage);
        if(tempSearInput == ""){tempSearInput = "all"}
        $http.post("/ProjectManagerCtrl/UnitPjMgrSeach",{PjName:tempSearInput,curPage:curpage,perpage:perpage}).success(function(data){
            if(data.IsSuccess){
                $scope.projects = data.Data.projects;
                var sum = parseInt(data.Data.sum);
                $scope.PjSumRecord = sum;
                $scope.pjSumPage = Math.ceil(sum/$scope.perpage);
                if($scope.projects.length == 0){
                    $scope.pjtableEmpty = true;
                    $scope.pjSumPage = 1
                }else{
                    $scope.pjtableEmpty = false;
                }


            }else{
//                if (data.Data = 404){
//                    showMsg("登录状态已丢失","error");
//                    //登录状态丢失就跳到登陆页面
////                    window.location = "#"
//                }else{
//                    showMsg(data.Reason,"warn");
//                }
                actionError()
            }
        },"json").error(function(){
            showMsg("连接服务器出错","error")
        })
    };
    $scope.projectTable(1);
//查看项目下的设备
    $scope.pjDetail = function(arg_project){
        $scope.pjUnitNo = arg_project.Pj_unit_id;
        $scope.eqmTable(1);
    };
//------------------------------------------------

//    设备列表页面函数
    $scope.eqmTable = function(arg_type){
        if (arg_type == 1 ){
            $scope.eqmCurPage = 1
        }
        var curpage = angular.copy($scope.eqmCurPage);
        var search = angular.copy($scope.searchEqmName);
        var pjUnitNo = angular.copy( $scope.pjUnitNo);
        var perpage = angular.copy($scope.perpage);
        if(search == "" ){search = "all"}
        $http.post("/ProjectManagerCtrl/UnitEqmMgrSeach",{PjUnitNo:pjUnitNo,curPage:curpage,searchKey:search,perpage :perpage}).success(function(data){
            if(data.IsSuccess){
                $scope.equipments = data.Data.equipments;
                var sum = parseInt(data.Data.sum);
                $scope.eqmSumRecord =  sum;
                $scope.eqmSumPage = Math.ceil(sum/$scope.perpage);
                if($scope.equipments.length == 0){
                    $scope.eqmtableEmpty = true;
                    $scope.eqmSumPage = 1
                }else{
                    $scope.eqmtableEmpty = false;

                }

                $scope.changeView("2")
            }else{
                actionError();
//                    showMsg(data.Reason,"warn")
            }
        },"json").error(function(){
            showMsg("连接服务器出错","error")
        })
    };
   //设备页面编辑函数
    $scope.editeqment = function(arg_eqm){
        //显示窗口
        binApp.window(binApp.getId('EditEquipment'),{action:'scale',fixed:true},'normal');
        //对窗口变量赋值
        $scope.editfrom = {
            T_id:arg_eqm.T_id,
            eqmNo:arg_eqm.No,
//            unit:arg_eqm.Name,
            cdkey:arg_eqm.Cdkey,
            equipment:arg_eqm.Name,
            starttime:arg_eqm.Starttime,
            warranty:arg_eqm.Warranty

        };
    };
    $scope.editeqmentfun = function(){
        if($scope.editfromcheck() == 0){
        var from = angular.copy($scope.editfrom);
        $http.post("/ProjectManagerCtrl/UnitEditEqm",from).success(function(data){
            if(data.IsSuccess){
                showMsg("修改成功","success");
                $scope.eqmTable(2);
                binApp.getId('EditEquipment').off();


            }else{

//                    showMsg("登录状态已丢失","error");
                    //登录状态丢失就跳到登陆页面
//                    window.location = "#"
                    actionError()

            }
        },"json").error(function(){
            showMsg("连接服务器出错","error")
        })
        }
    };

    //设备详细信息

    $scope.eqmDetailfun = function(arg_eqm){

        $http.post("/ProjectManagerCtrl/UnitEqmDetail",{prounitid: arg_eqm.T_id}).success(function(data){
            if(data.IsSuccess){
                $scope.eqmDetails = data.Data.eqmDetails;
                $scope.eqmNo = arg_eqm.No;
                $scope.changeView("3")
            }else{
                actionError()
            }
        },"json").error(function(){
            actionError()
        })
    };

    //更改当前显示的页面
    $scope.changeView = function(arg_type){
      $scope.viewselect  = arg_type
    };
    //项目分页函数
    $scope.PjgoToPage=function(arg_page) {
        if (arg_page <= $scope.pjSumPage && arg_page >= 1 && arg_page != $scope.pjCurPage) {
                $scope.pjCurPage = arg_page;
            $scope.projectTable(2);
            $scope.pjGoToPage = ""

        }
    };
    //设备列表
    $scope.EqmgoToPage=function(arg_page) {
        if (arg_page <= $scope.eqmSumPage && arg_page >= 1 && arg_page != $scope.eqmCurPage) {
                $scope.eqmCurPage = arg_page;
            $scope.eqmTable(2);
            $scope.eqmGoToPage = ""
        }
    };
    //
    $scope.editfromcheck=function(){
        var  numberFormat =/^[0-9]{1,4}$/;//数字格式正则
        var dataFormat = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;//日期格式正则
        var back = 0;
        if(!dataFormat.exec($scope.editfrom.starttime)){
            var back = 1;
            return back
        }
        if(!numberFormat.exec($scope.editfrom.warranty)) {
            var back = 2;
            return back
        }
        return back
    }

}]);