adminApp.controller('projectManageCtrl', ["$scope", function($scope) {
        menuOnClick(1);
//        $scope.users=[{Id:1,Name:"杨振林"},{Id:2,Name:"杨振树"}]
        $scope.addfrom={Name: ""};
        $scope.users="";

        $scope.getsearchlist=function(){
            //发出请求
            $.get("/searchDemo",null,function(data){
                //判断后台返回的处理请求的是否成功
                if (data.IsSuccess){
                    //将后台返回的数据复制到model上
                    $scope.users = data.Data.users;
                }else{
                    //不成功输出原因
                    binApp.alert(data.Reason,{action:"top"});
                }
                //下面这句一定要加上，这样数据才能及时应用
                $scope.$apply()
            },"json").error(function(){
                //服务器没有返回，自动提示报错
                binApp.alert('服务器出错',{action:"top"});
            })
        };
        $scope.getsearchlist();
        $scope.addname = function(){

            var u  = angular.copy($scope.addfrom);
            if(u.Name == null || u.Name == ""){
                binApp.alert("姓名不能为空",{action:"top"});
            }else{
                $.post("/addDemo",u,function(data){

                    if (data.IsSuccess){
                        binApp.alert("添加人员成功",{action:"top"});
                        $scope.getsearchlist()

                    }else{
                        binApp.alert(data.Reason,{action:"top"});
                    }
                    $scope.$apply()
                },"json").error(function(){
                    binApp.alert('服务器出错',{action:"top"});
                })
            }
        };

        $scope.deletename = function(arg_user){

            $.post("/deleteDemo",arg_user,function(data){
                if (data.IsSuccess){
                    binApp.alert("删除人员成功",{action:"top"});
                    $scope.getsearchlist()
                }else{
                    binApp.alert(data.Reason,{action:"top"});
                }
                $scope.$apply()
            },"json").error(function(){
                binApp.alert('服务器出错',{action:"top"});
            })
        };

        $scope.editename = function(arg_user){

            $.post("/updateDemo",arg_user,function(data){

                if (data.IsSuccess){
                    binApp.alert("修改人员成功",{action:"top"});
                    $scope.getsearchlist()
                }else{
                    binApp.alert(data.Reason,{action:"top"});
                }
                $scope.$apply()
            },"json").error(function(){
                binApp.alert('服务器出错',{action:"top"});
            })
        }

    }]);