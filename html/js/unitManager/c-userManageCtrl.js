/**
 * Created by luoweihao on 2014-10-01
 */
unitApp.controller('unitUserManageCtrl', ['$scope', '$http', function($scope, $http) {
    menuOnClick(1);
    //分页数据
    $scope.curpage = 1;
    $scope.Sumpage = 1;
    $scope.SumRecord = 0;
    $scope.perpage = 10;//每页多少条数据
    $scope.gotopage = "";

    //编辑窗口model
    $scope.fromStatus = 0;//0是添加窗口状态，1是编辑窗口状态
    $scope.checkstatus = 0;

    $scope.addform = {
        PhoneNumber :"",
        Name:"",
        Account:"",
        status:""
    };
    $scope.delteName = "张三";
    $scope.deleteid = 0;//删除id
    $scope.AccountUserable = false;

/*ng-options="statusselect as statusselect for statusselect in statusselects"*/

    $scope.UnitName = "";//单位名
    $scope.check ="";
    $scope.Phonesearch = "";//电话搜索
    $scope.Namesearch = "";
    $scope.Statussearch = "";
    $scope.GradeEmpyt = false;
    $scope.users = [];
//checkboxvalue
    $scope.rishnable = 1;

//    初始化函数，获取单位管理员信息
    $scope.basefun = function(){
        $http.post("/UserManagerCtrl/GetUnit",null).success(function(data){
            if(data.IsSuccess){
                $scope.UnitName = data.Data.name;
                $scope.rishnable = data.Data.status;
                $scope.getUsers();
            }else{
//                actionError()
                showMsg(data.Reason, "error");
            }

        },"json").error(function(){
            actionError()
        })
    };
    $scope.basefun();
    //获取人员
    $scope.getUsers = function(arg_type){
        if(arg_type == 1){
        $scope.curpage = 1;
        }
       var phone =angular.copy($scope.Phonesearch);
        var name =angular.copy($scope.Namesearch);
        var status =angular.copy($scope.Statussearch) ;

        if(phone == ""){phone = "all"}
        if(name == ""){name = "all"}
        if(status == ""){status = "2"}

        $http.post("/UserManagerCtrl/GetUsers",{Phone :phone,Name:name,Status:status,curpage:$scope.curpage,perpage:$scope.perpage}).success(function(data){
            if(data.IsSuccess){
                $scope.users = data.Data.users;
                $scope.SumRecord = data.Data.sum;
                var sum = data.Data.sum;
                $scope.Sumpage = Math.ceil(sum/parseInt($scope.perpage));
                if($scope.users.length == 0 ){
                    $scope.Sumpage = 1;
                    $scope.GradeEmpyt = true;
                }else{
                    $scope.GradeEmpyt = false;
                }
            }else{
//                actionError()
                showMsg(data.Reason, "error");
            }
        },"json").error(function(){
            actionError()
        })
    };

    //添加人员
    $scope.addUsers = function(){
        if($scope.addCheck() == 0 && $scope.AccountUserable == true) {
            binApp.getId('AddPeople').off();
            var formvalue = angular.copy($scope.addform);
            $http.post("/UserManagerCtrl/AddUsers", formvalue).success(function (data) {
                if (data.IsSuccess) {
                    showMsg("添加人员成功", "success");
                    $scope.getUsers(1)
                } else {
//                    showMsg("添加人员失败", "success");
                    showMsg(data.Reason,"error")
                }

            }, "json").error(function () {
                actionError()
            })
        }
    };
    //编辑人员信息
    $scope.editUsers = function(){
        if($scope.addCheck() == 0) {
            var formvalue = angular.copy($scope.addform);
            var tid = angular.copy($scope.deleteid);
            $http.post("/UserManagerCtrl/EditUsers", {PhoneNumber: formvalue.PhoneNumber, Name: formvalue.Name, deleteId: tid}).success(function (data) {
                if (data.IsSuccess) {
                    showMsg("修改人员信息成功", "success");
                    $scope.getUsers(2)
                } else {
//                actionError()
                    showMsg("修改人员信息成功", "error");
                }
            }, "json").error(function () {
                actionError()
            })
        }
    };
    //设置是否允许注册 1 允许 0 不允许
    $scope.registAble = function(arg_type) {
        if ($scope.rishnable != arg_type) {
            $http.post("/UserManagerCtrl/RegistUsers", {allow: arg_type}).success(function (data) {
                if (data.IsSuccess) {
                    $scope.rishnable = arg_type;
                    showMsg("修改是否可注册状态成功","success");
                } else {
                    showMsg("修改是否可注册状态失败","warn");
                }
            }, "json").error(function () {
                actionError()
            })
        }
    };

    $scope.DeleteUser = function(){
        var deleteId = angular.copy($scope.deleteid);
        $http.post("/UserManagerCtrl/DeleteUser",{deleteId:deleteId}).success(function(data){
            if(data.IsSuccess){
                showMsg("删除报修人员成功","success");
                $scope.getUsers(1)
            }else{
                showMsg("删除报修人员失败","warn");
//                actionError()
            }
        },"json").error(function(){
            actionError()
        })
    };

    $scope.addOrEdit = function(arg_type,arg_user){
        $scope.fromStatus = arg_type;
        binApp.window(binApp.getId('AddPeople'),{action:'scale',fixed:true},'normal');
        //根据不同状态初始化窗口
        if(arg_type == 2){
            $scope.deleteid = arg_user.T_id;
            $scope.delteName = arg_user.Name;
        }
        if(arg_type == 1){
            $scope.deleteid = arg_user.T_id;
            $scope.addform.Account = arg_user.Account;
            $scope.addform.PhoneNumber = arg_user.Phone;
            $scope.addform.Name = arg_user.Name;
            $scope.addform.status = arg_user.Status
        }
        if(arg_type == 0){
            $scope.addform.Account = "";
            $scope.addform.PhoneNumber = "";
            $scope.addform.Name = "";
            $scope.addform.status = "";
            $scope.AccountUserable = true;
        }

    };

    $scope.addCheck = function(){
        var accountFormat = /^[0-9]{6,12}$/;
        var phoneFormat = /^[0-9]{11}$/;
//        var NameFomat = /^[\u4e00-\u9fa5]{2,10}$/;
        var NameFomat = /^[0-9\\u4e00-\u9fa5]{2,10}$/;

       if(!accountFormat.exec($scope.addform.Account)){
           $scope.checkstatus = 1;
           return 1
       }
        if(!phoneFormat.exec($scope.addform.PhoneNumber)){
            $scope.checkstatus = 2;
            return 2
        }
        if(!NameFomat.exec($scope.addform.Name)){
            $scope.checkstatus = 3;
            return 3
        }
        $scope.checkstatus = 0;
        return 0

    };

    $scope.Accountcheck = function(){
        var account = angular.copy($scope.addform.Account);
        var accountFormat = /^[0-9]{6,12}$/;
        if( accountFormat.exec(account)) {
            $http.post("/UserManagerCtrl/AddUsersAccountCheck", {Account:account}).success(function (data) {
                if (data.IsSuccess) {
                    $scope.AccountUserable = data.Data.check;
                } else {
//                    actionError()
                    showMsg("检查账号失败","warn");
                }

            }, "json").error(function () {
                actionError()
            })
        }
    };

    $scope.GoToPage=function(arg_page) {
        if(isNaN(arg_page) || arg_page > $scope.Sumpage || arg_page< 1){return}
        $scope.curpage = arg_page;
        $scope.getUsers(2);
        $scope.gotopage = ""

    };

}]);