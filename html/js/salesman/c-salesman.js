salesApp.controller('salesmanCtrl', ['$scope', '$http', function ($scope, $http) {

    /**
     * 创建报修工单
     */
    $scope.repairFormModel = {
        "userId": 1,
        "tel": "",
        "name": "",
        "deviceId": "",
        "commQu": [],
        "checkedCommQu": [],
        "cusQu": "",
        "project" : "",
        "unit" : ""
    };
    //处理报修窗口通用问题列表chebox点击事件
    $scope.toggleCommQuCheck = function (Qu) {
        if ($scope.repairFormModel.checkedCommQu.indexOf(Qu) === -1) {
            $scope.repairFormModel.checkedCommQu.push(Qu);
        } else {
            $scope.repairFormModel.checkedCommQu.splice($scope.repairFormModel.checkedCommQu.indexOf(Qu), 1);
        }
    };
    //提交报修工单
    $scope.createWorkOrder = function () {
        $http.post("/createWorkOrder", $scope.repairFormModel).success(function (data) {
            if (data.IsSuccess) {
                binApp.alert("提交报修单成功", {action: "top"});
                binApp.getId('RepairWin').off();
            } else {
                binApp.alert(data.Reason, {action: "top"});
            }
        }, "json").error(function () {
            binApp.alert('"服务器未响应,请检查您的网络连接"', {action: "top"});
        })
    };
    //打开报修窗口并初始化
    $scope.openWin = function () {
        $scope.getCommQu();
        binApp.window(binApp.getId('RepairWin'), {action: 'scale', fixed: true}, 'normal');
    };
    //获取通用问题列表
    $scope.getCommQu = function () {
        $http.get("/getcommQu", null).success(function (data) {
            if (data.IsSuccess) {
                for (var i = 0; i < data.Data.length; i++) {
                    $scope.repairFormModel.commQu[i] = '"' + data.Data[i] + '"';
                }
            } else {
                binApp.alert(data.Reason, {action: "top"});
            }
        }, "json").error(function () {
            binApp.alert('"服务器未响应,请检查您的网络连接"', {action: "top"});
        })
    };
    //***********************************************************************************************************************************************************************************
    //***********************************************************************************************************************************************************************************
    //ygh:

        $scope.dealing="option cur"
    $scope.finished="option"
    $scope.closed="option"
    $scope.repairstatus="正在进行"
    $scope.statusArg="1"  //0已关闭 1 正在进行 2已完成
    $scope.cur_page=1;
    $scope.total_row=0;
    $scope.total_page=0;
    $scope.repairForms="";
    $scope.repairFormsInfo="";
    $scope.projectname=""
    $scope.t_id=430; //业务员t_id，现在写死
    $scope.repairAgr={Startrow: "",Status:"",ProjectName:"",T_id:""};
    $scope.goPage=""
    $scope.FormSH=true;
    $scope.InfoSH=false;
    $scope.search=function(){
        $scope.cur_page=1;
        $scope.getrepairForms($scope.cur_page,$scope.statusArg);
    }
    $scope.nofocus=function(){
        if(isNaN($scope.goPage)){
            binApp.alert("请输入有效页数进行跳转",{action:"top"});
            $scope.goPage=""
            return;
        }
        if($scope.goPage==""||$scope.goPage==null){
            return;
        }else
        if($scope.goPage<1||$scope.goPage>$scope.total_page) {
            binApp.alert("该页不存在",{action:"top"});
            $scope.goPage=""
        }
        else{
            $scope.cur_page = $scope.goPage;
            $scope.getrepairForms($scope.cur_page, $scope.statusArg);
            $scope.goPage=""
        }
    }
    $scope.refresh=function(){
        $scope.cur_page=1;
        $scope.repairAgr.ProjectName="";
        $scope.getrepairForms($scope.cur_page,$scope.statusArg);
    }
    $scope.toFirstPage=function(){
        $scope.cur_page=1;
        $scope.getrepairForms(1,$scope.statusArg);
    }
    $scope.toPrePage=function(){
        if($scope.cur_page<=1){
            binApp.alert("已经没有上一页",{action:"top"});
        }
        else
        {
            $scope.cur_page=$scope.cur_page-1;
            $scope.getrepairForms($scope.cur_page,$scope.statusArg);
        }
    }
    $scope.toNextPage=function(){
        if($scope.cur_page>=$scope.total_page){
            binApp.alert("已经没有下一页",{action:"top"});
        }
        else
        {
            $scope.cur_page=$scope.cur_page+1;
            $scope.getrepairForms($scope.cur_page,$scope.statusArg);
        }
    }
    $scope.toLastPage=function(){
        $scope.cur_page=$scope.total_page;
        $scope.getrepairForms($scope.total_page,$scope.statusArg);
    }
    $scope.getrepairForms=function(page,status){
        //var start_row=11*(page-1)
        var temp  = angular.copy($scope.repairAgr);
        temp.T_id=$scope.t_id;
        temp.Startrow=10*(page-1);
        temp.Status=status;
        //发出请求
        $http.post("/salesRepairForm",{Startrow:temp.Startrow,Status:temp.Status,ProjectName:temp.ProjectName,T_id:temp.T_id}).success(function(data){
            //判断后台返回的处理请求的是否成功
            if (data.IsSuccess){
                //将后台返回的数据复制到model上
                $scope.repairForms = data.Data["repairlist"];
                $scope.total_page=data.Data["total_page"];
                $scope.total_row=data.Data["total_row"];
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
    $scope.getrepairForms(1,"1");
    $scope.toDealing=function(){
        $scope.dealing="option cur";
        $scope.finished="option";
        $scope.closed="option";
        $scope.repairstatus="正在进行";
        $scope.statusArg="1";
        $scope.cur_page=1;
        $scope.getrepairForms(1,$scope.statusArg);
    }
    $scope.toFinished=function(){
        $scope.dealing="option ";
        $scope.finished="option cur";
        $scope.closed="option";
        $scope.repairstatus="已完成";
        $scope.statusArg="2";
        $scope.cur_page=1;
        $scope.getrepairForms(1,$scope.statusArg);
    }
    $scope.toClosed=function(){
        $scope.dealing="option ";
        $scope.finished="option";
        $scope.closed="option cur";
        $scope.repairstatus="已关闭";
        $scope.statusArg="0";
        $scope.cur_page=1;
        $scope.getrepairForms(1,$scope.statusArg);
    }
    $scope.getFormInfo=function(arg){
        $scope.FormSH=!$scope.FormSH;
        $scope.InfoSH=!$scope.InfoSH;
        if(arg==""){}
        else{
            binApp.alert(arg.T_id,{action:"top"});
            $http.post("/salesRepairFormInfo",{T_id:arg.T_id+""}).success(function(data){
                //判断后台返回的处理请求的是否成功
                if (data.IsSuccess){
                    //将后台返回的数据复制到model上
                    $scope.repairFormsInfo = data.Data["repairlistInfo"];
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
        }
    }
    //*************************************************************************************************************************************************************************************
}]);