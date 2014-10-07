adminApp.controller('userMgrCtrl', ['$scope', '$http', function($scope, $http) {
    menuOnClick(0);
    //分页
    $scope.perPage = 10;    //每页显示
    $scope.curPage = 1;     //当前页
    $scope.totalPage = 1;   //总共页数
    $scope.totalCount = 0;  //总数据量
    $scope.goPage = "";     //到第几页

    $scope.addU = {Name: "", Account: "", Phone: "", Role:"", Status:"1"};
    $scope.editU = {Name: "", Account: "", Phone: "", Status:"",IsReset:"",Pwd:""};
    $scope.roleList = new Array();//角色列表
    $scope.searchRoleList = new Array();//搜索时使用的角色列表
    $scope.searchU = {Name: "", Account: "", Status:""};//搜索对象
    $scope.editU.IsReset = false;
    $scope.editU.Pwd = "******";
    var all = "1000";//表示 '全部'
    $scope.searchRole = {T_id:all};//搜索的角色

    //分页显示用户（实际就是搜索的方法）
    $scope.getUsers = function(arg_name,arg_account,arg_roleId,arg_status,arg_curPage,arg_perPage) {
        var params = {Name:myTrim(arg_name),Account:myTrim(arg_account),Role:arg_roleId,Status:arg_status,curPage:arg_curPage,perPage:arg_perPage};
        $http.post("/UserMgrCtrl/GetUsers",params).success(function(data) {
            if (data.IsSuccess) {
                $scope.users = data.Data["users"];
                //$scope.users = data.Data.users;
                $scope.totalPage = data.Data["totalPage"];
                $scope.totalCount = data.Data["totalCount"];
            } else {
                showMsg(data.Reason, "error");
            }
        },"json").error(function() {
            actionError();
        })
    };



    //获取角色列表
    $scope.getRoleList = function(){
        $http.post("/UserMgrCtrl/GetRoleList").success(function(data) {
            if (data.IsSuccess) {
                $scope.roleList = data.Data["roleList"];
                $scope.searchRoleList = data.Data["roleList"];
                addRole($scope.searchRoleList.length);
                $scope.selectRole = $scope.roleList[0];
            } else {
                showMsg(data.Reason, "error");
            }
        },"json").error(function() {
            actionError();
        })


    }
    //初次加载调用 "1000"代表是全部
    $scope.getUsers("","",all,all,$scope.curPage,$scope.perPage);
    $scope.getRoleList();

//**********************************************************CRUD****************************************************
    //添加用户函数
    $scope.addUser = function(){
        $scope.addU.Role = $scope.selectRole.T_id;
        $http.post("/UserMgrCtrl/AddUser",$scope.addU).success(function(data) {
            if (data.IsSuccess) {
                binApp.alert(data.Reason,{action:"top"});
                $scope.getUsers("","",all,all,"1",$scope.perPage);
            } else {
                showMsg(data.Reason, "error");
            }
        },"json").error(function() {
            actionError();
        })
    };

    //编辑用户
    $scope.editUser = function(){
        $http.post("/UserMgrCtrl/UpdateUser",$scope.editU).success(function(data) {
            if (data.IsSuccess) {
                binApp.alert(data.Reason,{action:"top"});
                name = $scope.searchU.Name;
                account = $scope.searchU.Account;
                role = $scope.searchRole.T_id;
                status = $scope.searchU.Status;
                if (role == ""){
                    role = all;
                }
                if (status == ""){
                    status = all;
                }

                $scope.getUsers(name,account,role,status,$scope.curPage,$scope.perPage);
            } else {
                showMsg(data.Reason, "error");
            }
        },"json").error(function() {
            actionError();
        })
    }


    //搜索用户函数
    $scope.searchUser = function(){
        name = $scope.searchU.Name;
        account = $scope.searchU.Account;
        role = $scope.searchRole.T_id;
        status = $scope.searchU.Status;
        if (role == ""){
            role = all;
        }
        if (status == ""){
            status = all;
        }
       // showMsg(role,"info");
        $scope.getUsers(name,account,role,status,"1",$scope.perPage);


    }

/*
    //角色下拉列表改变查询函数
    $scope.roleChange = function(){

        showMsg($scope.searchRole.T_id,"Info");
    }


    //状态下拉列表改变查询函数
    $scope.statusChange = function(arg_searchUser){

        showMsg($scope.searchU.Status, "Info");
    }*/
//*********************************************************辅助功能类函数**************************************************
    /*HTML分页函数*/
    $scope.toPage = function(arg_page) {
        $scope.goPage = "";
        arg_page = parseInt(arg_page);
        if(isNaN(arg_page) || arg_page < 1 || arg_page == $scope.curPage || arg_page > $scope.totalPage) {
            return;
        }
        $scope.curPage = arg_page;
        name = $scope.searchU.Name;
        account = $scope.searchU.Account;
        role = $scope.searchRole.T_id;
        status = $scope.searchU.Status;
        if (role == ""){
            role = all;
        }
        if (status == ""){
            status = all;
        }
        $scope.getUsers(name,account,role,status,$scope.curPage,$scope.perPage);
    };

    //在编辑框显示用户信息
    $scope.showEditInfo = function(arg_user){
        $scope.editU.Name = arg_user.Username;
        $scope.editU.Account = arg_user.Account;
        $scope.editU.Status = arg_user.Status;
        $scope.editU.Phone = arg_user.Phone;
        $scope.editU.IsReset = false;
        $scope.editU.Pwd = "******";
    }


    //清空添加窗口数据
    $scope.clearAddData = function(){

        $scope.addU = {Name: "", Account: "", Phone: "", Role:$scope.roleList[0], Status:"1"};
    }

    //重置密码
    $scope.resetPwd = function(isReset){

        $scope.editU.IsReset = isReset;
        if(isReset) {
            $scope.editU.Pwd = "（密码已重置）";
        }
        if(!isReset){
            $scope.editU.Pwd = "******";
        }

    }

    //去除字符串中的所有空格T
    function myTrim(str) {
        return str.replace(/[ ]/g, "");  //去除字符算中的空格，注意这个中括号是分开的
    }

    //查询下拉列表角色数组添加元素方法
     function addRole(arg_length){
     $scope.searchRoleList[arg_length] = {Name:"全部",T_id:all};
     $scope.searchRole = $scope.searchRoleList[arg_length];//设置角色默认搜索全部
     }
    /*=====================================================================================================*/
    /***
     * 上传文件部分
     */
    $scope.uploadaction = "/upload";
    $("#showuploadprogressbar").hide();
    $("#showinsertprogressbar").hide();
    $scope.uploadprocess = "0%";
    $scope.insertprocess = "0%";
    $("#uploadprogressbar").progressbar();
    $("#insertprogressbar").progressbar();
    $("#uploadExecl").click(function() {
        $("#uploadExecl").attr('disabled', 'disabled');
        var form = $("#fileform");
        form.ajaxSubmit({
            dataType:  'json', //数据格式为json
            resetForm: true,//布尔标志，表示如果表单提交成功是否进行重置。
            clearForm: true,//布尔标志，表示如果表单提交成功是否清除表单数据。
            data:{type:"uploadusers"},
            xhr:function() {
                myXhr = $.ajaxSettings.xhr();
                if(myXhr.upload){
                    myXhr.upload.addEventListener('progress',showProgress, false);
                } else {
                    console.log("Uploadress is not supported.");
                    showMsg("浏览器不兼容","info",null);
                }
                return myXhr;
            },
            beforeSubmit: function() { //开始上传
                var filepath = document.getElementById("filepath").value;
                if (filepath == ""){
                    showMsg("请选择文件","info",null);
                    return false;
                }
                if(IsXlsx(filepath) == false){
                    showMsg("请上传格式为xlsx的文件","warn",null);
                    return false;
                }
                var File = document.getElementById("file").files[0];
                if(LessThan64M(File) == false){
                    showMsg("文件大小不能超过64MB","warn",null);
                    return false;
                }
                $("#showuploadprogressbar").show();
            },
            success: function(data) {
                $("#showuploadprogressbar").hide();
                $("#showinsertprogressbar").show();
                GetProcess(data.Data.Processkey);
            },
            error:function(data) {
                showMsg("导入失败","error",null);
            }
        });
    });
    function LessThan64M(file) {
        var maxsize  = 64; //64MB
        if((file.size/1024/1024) < maxsize){
            return true;
        }
        return false;
    }
    function IsXlsx(fileName){
        if(fileName.substring(fileName.lastIndexOf(".")+1).toLowerCase() == "xlsx"){
            return true;
        }
        return false;
    }
    /*========================导入数据进度================================================================*/
    function showProgress(evt) {
        if (evt.lengthComputable) {
            var percentComplete = (evt.loaded / evt.total) * 100;
            $('#uploadprogressbar').progressbar({value:percentComplete});
            $scope.uploadprocess = String(parseInt(percentComplete)) + "%";
            $scope.$apply();
        }else{
            showMsg("获取进度失败","error",null);
        }
    }
    //检查进度
    function GetProcess(processKey){
        $http.post("/getcurprogress", {
            processkey:processKey
        }).success(function(data) {
            if (data.IsSuccess) {
                $('#insertprogressbar').progressbar({value:data.Data.CurProcess});
                $scope.insertprocess = String(parseInt(data.Data.CurProcess)) + "%";
                if (data.Data.CurProcess == 100 &&data.Reason=="导入成功"){
                    $("#uploadExecl").removeAttr('disabled');
                    showMsg("导入数据完成","success",null);
                    $scope.reset();
                    $scope.getUsers("","",all,all,$scope.curPage,$scope.perPage);
                }else{
                    setTimeout(GetProcess(processKey),500);
                }
            } else {
                showMsg(data.Reason,"error",null);
            }
        },"json").error(function() {
            showMsg("连接服务器出错", "error",null);
        })
    }
    $scope.reset  = function(){
        $("#showuploadprogressbar").hide();
        $("#showinsertprogressbar").hide();
        $scope.uploadprocess = "0%";
        $scope.insertprocess = "0%";
        document.getElementById('filepath').value = "";
    };
}]);