/**
 * Created by admin on 2014/10/4.
 */
describe("Test unit UserManage ",function(){

    beforeEach(angular.mock.module('unitApp'));
    it('should have unitUserManageCtrl', inject(function($route) {
        expect($route.routes['/unitUsermange'].controller).toBe('unitUserManageCtrl');
    }));
    describe("Test function() in unitUserManageCtrl",function(){
        var scope,httpBackEnd,userdata,unitdate;
        beforeEach(angular.mock.inject(function($rootScope, $controller, $httpBackend) {
            scope = $rootScope.$new();
            httpBackEnd = $httpBackend;
            $controller('unitUserManageCtrl', {$scope: scope});
            userdata = {"IsSuccess":true,"Reason":"获取数据成功","Data":{"users":[{T_id:1,Account:123456,Pwd :123456,Name:"红利期",Phone :"12345678910"},
                {T_id:2,Account:123456,Pwd :123456,Name:"闫振山",Phone :"12345678910"},
                {T_id:3,Account:123456,Pwd :123456,Name:"路毛婷",Phone :"12345678910"}],sum:3}};

            unitdate = {"IsSuccess":true,"Reason":"获取人员信息成功","Data":{"name":"广州大学","status":1}};

        }));

//获取人员信息
        it("Test basefun() success ",inject(function($httpBackend){
            $httpBackend.expectPOST("/UserManagerCtrl/GetUnit").respond(unitdate);
            $httpBackend.expectPOST("/UserManagerCtrl/GetUsers").respond(userdata);
            scope.Phonesearch = "";
            scope.Namesearch = "";
            scope.Statussearch = "";
            $httpBackend.flush();
            expect(scope.users).toEqual([{T_id:1,Account:123456,Pwd :123456,Name:"红利期",Phone :"12345678910"},
                {T_id:2,Account:123456,Pwd :123456,Name:"闫振山",Phone :"12345678910"},
                {T_id:3,Account:123456,Pwd :123456,Name:"路毛婷",Phone :"12345678910"}]);
            expect(scope.users.length).toEqual(3);
            expect(scope.SumRecord).toBe(3);

        }));

        it("Test basefun() success null",inject(function($httpBackend){
            $httpBackend.expectPOST("/UserManagerCtrl/GetUnit").respond({IsSuccess:false,Resson:"获取数据是失败", Data:null});
            $httpBackend.flush();
            expect(scope.users.length).toEqual(0);
            expect(scope.SumRecord).toBe(0);
        }));


        it("Test basefun() error",inject(function($httpBackend){
            $httpBackend.expectPOST("/UserManagerCtrl/GetUnit").respond(404);
            $httpBackend.flush();
            expect(scope.users.length).toEqual(0);
            expect(scope.SumRecord).toBe(0);
        }));

        //获取列表信息
        it("Test getUsers() success ",inject(function($httpBackend){
            $httpBackend.expectPOST("/UserManagerCtrl/GetUnit").respond(unitdate);
            $httpBackend.expectPOST("/UserManagerCtrl/GetUsers").respond(userdata);
            scope.Phonesearch = "";
            scope.Namesearch = "";
            scope.Statussearch = "";
            $httpBackend.flush();
            expect(scope.users).toEqual([{T_id:1,Account:123456,Pwd :123456,Name:"红利期",Phone :"12345678910"},
                {T_id:2,Account:123456,Pwd :123456,Name:"闫振山",Phone :"12345678910"},
                {T_id:3,Account:123456,Pwd :123456,Name:"路毛婷",Phone :"12345678910"}]);
            expect(scope.users.length).toEqual(3);
            expect(scope.SumRecord).toBe(3);

        }));

        it("Test basefun() success null",inject(function($httpBackend){
            $httpBackend.expectPOST("/UserManagerCtrl/GetUnit").respond(unitdate);
            $httpBackend.expectPOST("/UserManagerCtrl/GetUsers").respond({IsSuccess:true,Reason:"获取数据成功",Data:{users:[],sum:0}});
            $httpBackend.flush();
            expect(scope.users.length).toEqual(0);
            expect(scope.SumRecord).toBe(0);
        }));

        it("Test basefun() success fali",inject(function($httpBackend){
            $httpBackend.expectPOST("/UserManagerCtrl/GetUnit").respond(unitdate);
            $httpBackend.expectPOST("/UserManagerCtrl/GetUsers").respond({IsSuccess:false,Reason:"获取数据失败",Data:null});
            $httpBackend.flush();
            expect(scope.users.length).toEqual(0);
            expect(scope.SumRecord).toBe(0);
        }));

        it("Test basefun() error",inject(function($httpBackend){
            $httpBackend.expectPOST("/UserManagerCtrl/GetUnit").respond(unitdate);
            $httpBackend.expectPOST("/UserManagerCtrl/GetUsers").respond(404);
            $httpBackend.flush();
            expect(scope.users.length).toEqual(0);
            expect(scope.SumRecord).toBe(0);
        }));


//添加人员函数

//        it("Test addUsers() success",inject(function($httpBackend){
//            $httpBackend.expectPOST("/UserManagerCtrl/GetUnit").respond(unitdate);
//            $httpBackend.expectPOST("/UserManagerCtrl/GetUsers").respond(userdata);
//            $httpBackend.flush();
//            $httpBackend.expectPOST("/UserManagerCtrl/AddUsers").respond({"IsSuccess":true,"Reason":"添加人员成功","Data":null});
//            $httpBackend.expectPOST("/UserManagerCtrl/GetUsers").respond(userdata);
//            scope.addform.Account = "1234567";
//            scope.addform.Name = "张毅谋";
//            scope.addform.PhoneNumber = "13422285842";
//
//            scope.addUsers();
//            $httpBackend.flush();
//            expect(scope.addCheck()).toBe(0);
//        }));

        it("Test addUsers() success null",inject(function($httpBackend){
            $httpBackend.expectPOST("/UserManagerCtrl/GetUnit").respond(unitdate);
            $httpBackend.expectPOST("/UserManagerCtrl/GetUsers").respond(userdata);
            scope.addform.Account = "12345";
            scope.addform.Name = "张毅";
            scope.addform.PhoneNumber = "12345678910";
            scope.AccountUserable = true;
            scope.addUsers();
            $httpBackend.flush();
        }));

        it("Test addUsers() success null",inject(function($httpBackend){
            $httpBackend.expectPOST("/UserManagerCtrl/GetUnit").respond(unitdate);
            $httpBackend.expectPOST("/UserManagerCtrl/GetUsers").respond(userdata);
            scope.addform.Account = "123456";
            scope.addform.Name = "张毅";
            scope.addform.PhoneNumber = "12345678910";
            scope.AccountUserable = false;
            scope.addUsers();
            $httpBackend.flush();
        }));

        it("Test addUsers() fail",inject(function($httpBackend){
            $httpBackend.expectPOST("/UserManagerCtrl/GetUnit").respond(unitdate);
            $httpBackend.expectPOST("/UserManagerCtrl/GetUsers").respond(userdata);
            $httpBackend.flush();
            $httpBackend.expectPOST("/UserManagerCtrl/AddUsers").respond({IsSuccess:false,Reason:"添加人员失败",Data:null});
            scope.addform.Account = "123456";
            scope.addform.Name = "张毅";
            scope.addform.PhoneNumber = "13422285842";
            scope.AccountUserable = true;
            scope.addUsers();
            $httpBackend.flush();
        }));

        it("Test addUsers() error",inject(function($httpBackend){
            $httpBackend.expectPOST("/UserManagerCtrl/GetUnit").respond(unitdate);
            $httpBackend.expectPOST("/UserManagerCtrl/GetUsers").respond(userdata);
            $httpBackend.flush();
            $httpBackend.expectPOST("/UserManagerCtrl/AddUsers").respond(404);
            scope.addform.Account = "123456";
            scope.addform.Name = "张毅";
            scope.addform.PhoneNumber = "13422285840";
            scope.AccountUserable = true;
            scope.addUsers();
            $httpBackend.flush();
        }));

//        编辑人员
        it("Test editUsers() success ",inject(function($rootScope, $controller, $httpBackend){
            $httpBackend.expectPOST("/UserManagerCtrl/GetUnit").respond(unitdate);
            $httpBackend.expectPOST("/UserManagerCtrl/GetUsers").respond(userdata);
            $httpBackend.flush();
            $httpBackend.expectPOST("/UserManagerCtrl/EditUsers").respond({IsSuccess:true,Reason:"编辑人员成功",Data:null});
            $httpBackend.expectPOST("/UserManagerCtrl/GetUsers").respond(userdata);
            scope.users = [];
            scope.addform.Account = "123456";
            scope.addform.Name = "张毅";
            scope.addform.PhoneNumber = "12345678910";
            scope.editUsers();
            expect(scope.users.length).toBe(0);

            $httpBackend.flush();
        }));


        it("Test editUsers() fail",inject(function($httpBackend){
            $httpBackend.expectPOST("/UserManagerCtrl/GetUnit").respond(unitdate);
            $httpBackend.expectPOST("/UserManagerCtrl/GetUsers").respond(userdata);
            $httpBackend.flush();
            $httpBackend.expectPOST("/UserManagerCtrl/EditUsers").respond({IsSuccess:false});
            scope.users = [];
            scope.addform.Account = "123456";
            scope.addform.Name = "张毅";
            scope.addform.PhoneNumber = "12345678910";
            scope.editUsers();
            expect(scope.users.length).toBe(0);

            $httpBackend.flush();
        }));

        it("Test editUsers() error",inject(function($httpBackend){
            $httpBackend.expectPOST("/UserManagerCtrl/GetUnit").respond(unitdate);
            $httpBackend.expectPOST("/UserManagerCtrl/GetUsers").respond(userdata);
            $httpBackend.flush();
            $httpBackend.expectPOST("/UserManagerCtrl/EditUsers").respond(404);
            scope.users = [];
            scope.addform.Account = "123456";
            scope.addform.Name = "张毅";
            scope.addform.PhoneNumber = "12345678910";
            scope.editUsers();
            expect(scope.users.length).toBe(0);

            $httpBackend.flush();
        }));

        it("Test registAble() success ",inject(function($httpBackend){
            $httpBackend.expectPOST("/UserManagerCtrl/GetUnit").respond(unitdate);
            $httpBackend.expectPOST("/UserManagerCtrl/GetUsers").respond(userdata);
            $httpBackend.flush();
            $httpBackend.expectPOST("/UserManagerCtrl/RegistUsers").respond({"IsSuccess":true,"Reason":"更改状态成功","Data":null});
            scope.registAble(0);
            $httpBackend.flush();
        }));


        it("Test registAble() fail",inject(function($httpBackend){
            $httpBackend.expectPOST("/UserManagerCtrl/GetUnit").respond(unitdate);
            $httpBackend.expectPOST("/UserManagerCtrl/GetUsers").respond(userdata);
            $httpBackend.flush();
            $httpBackend.expectPOST("/UserManagerCtrl/RegistUsers").respond({IsSuccess:false});
            scope.registAble(0);
            $httpBackend.flush();
        }));

        it("Test registAble() error",inject(function($httpBackend){
            $httpBackend.expectPOST("/UserManagerCtrl/GetUnit").respond(unitdate);
            $httpBackend.expectPOST("/UserManagerCtrl/GetUsers").respond(userdata);
            $httpBackend.flush();
            $httpBackend.expectPOST("/UserManagerCtrl/RegistUsers").respond(404);
            scope.registAble(0);
            $httpBackend.flush();
        }));
//删除函数
        it("Test DeleteUser() success",inject(function($httpBackend){
            $httpBackend.expectPOST("/UserManagerCtrl/GetUnit").respond(unitdate);
            $httpBackend.expectPOST("/UserManagerCtrl/GetUsers").respond(userdata);
            $httpBackend.flush();
            $httpBackend.expectPOST("/UserManagerCtrl/DeleteUser").respond({IsSuccess:true});
            $httpBackend.expectPOST("/UserManagerCtrl/GetUsers").respond(userdata);
            scope.DeleteUser(0);
            $httpBackend.flush();
        }));

        it("Test DeleteUser() fail",inject(function($httpBackend){
            $httpBackend.expectPOST("/UserManagerCtrl/GetUnit").respond(unitdate);
            $httpBackend.expectPOST("/UserManagerCtrl/GetUsers").respond(userdata);
            $httpBackend.flush();
            $httpBackend.expectPOST("/UserManagerCtrl/DeleteUser").respond({IsSuccess:false});
            scope.DeleteUser();
            $httpBackend.flush();
        }));

        it("Test DeleteUser() error",inject(function($httpBackend){
            $httpBackend.expectPOST("/UserManagerCtrl/GetUnit").respond(unitdate);
            $httpBackend.expectPOST("/UserManagerCtrl/GetUsers").respond(userdata);
            $httpBackend.flush();
            $httpBackend.expectPOST("/UserManagerCtrl/DeleteUser").respond(404);
            scope.DeleteUser();
            $httpBackend.flush();
        }));

        it("Test Accountcheck() success",inject(function($httpBackend){
            $httpBackend.expectPOST("/UserManagerCtrl/GetUnit").respond(unitdate);
            $httpBackend.expectPOST("/UserManagerCtrl/GetUsers").respond(userdata);
            $httpBackend.flush();
            $httpBackend.expectPOST("/UserManagerCtrl/AddUsersAccountCheck").respond({IsSuccess:true,Reason:"检查成功",Data:{check:true}});
            scope.addform.Account = "123456";
            scope.Accountcheck();
            $httpBackend.flush();
            expect(scope.AccountUserable).toBeTruthy()
        }));

        it("Test Accountcheck() fail",inject(function($httpBackend){
            $httpBackend.expectPOST("/UserManagerCtrl/GetUnit").respond(unitdate);
            $httpBackend.expectPOST("/UserManagerCtrl/GetUsers").respond(userdata);
            $httpBackend.flush();
            $httpBackend.expectPOST("/UserManagerCtrl/AddUsersAccountCheck").respond({IsSuccess:false,Reason:"检查失败",Data:null});
            scope.addform.Account = "123456";
            scope.Accountcheck();
            $httpBackend.flush();
        }));

        it("Test Accountcheck() error",inject(function($httpBackend){
            $httpBackend.expectPOST("/UserManagerCtrl/GetUnit").respond(unitdate);
            $httpBackend.expectPOST("/UserManagerCtrl/GetUsers").respond(userdata);
            $httpBackend.flush();
            $httpBackend.expectPOST("/UserManagerCtrl/AddUsersAccountCheck").respond(404);
            scope.addform.Account = "123456";
            scope.Accountcheck();
            $httpBackend.flush();
        }));

//        it("Test addOrEdit()",inject(function($httpBackend){
//            $httpBackend.expectPOST("/UserManagerCtrl/GetUnit").respond(unitdate);
//            $httpBackend.expectPOST("/UserManagerCtrl/GetUsers").respond(userdata);
//            $httpBackend.flush();
//            scope.addOrEdit(0);
//            expect(scope.fromStatus).toBe(0);
//
//            scope.addOrEdit(1,{T_id:1,Name:"等所发生的",Phone:"12345678910",Account:"123456",Status:"1"});
//            expect(scope.fromStatus).toBe(1);
//
//            scope.addOrEdit(2,{T_id:1,Name:"等所发生的"});
//            expect(scope.fromStatus).toBe(2);
//        }));

        it("Test addCheck()",inject(function($httpBackend){
            $httpBackend.expectPOST("/UserManagerCtrl/GetUnit").respond(unitdate);
            $httpBackend.expectPOST("/UserManagerCtrl/GetUsers").respond(userdata);
            $httpBackend.flush();
            scope.addform.Account = "123";
            scope.addform.PhoneNumber = "";
            scope.addform.Name = "";
            expect( scope.addCheck()).toBe(1);

            scope.addform.Account = "123456";
            scope.addform.PhoneNumber = "";
            scope.addform.Name = "";
            expect( scope.addCheck()).toBe(2);

            scope.addform.Account = "123456";
            scope.addform.PhoneNumber = "12345678910";
            scope.addform.Name = "";
            expect( scope.addCheck()).toBe(3);

            scope.addform.Account = "123456";
            scope.addform.Name = "佛挡杀佛";
            scope.addform.PhoneNumber = "12345678910";
            expect( scope.addCheck()).toBe(0);
        }));
        it("Test GoToPage()",inject(function($httpBackend){
            $httpBackend.expectPOST("/UserManagerCtrl/GetUnit").respond(unitdate);
            $httpBackend.expectPOST("/UserManagerCtrl/GetUsers").respond(userdata);
            $httpBackend.flush();
            scope.curpage = 1;
            scope.Sumpage = 10;

            scope.GoToPage(2);
            expect(scope.curpage).toBe(2);

            scope.curpage = 1;
            scope.Sumpage = 10;
            scope.GoToPage(1);
            expect(scope.curpage).toBe(1);

            scope.curpage = 1;
            scope.Sumpage = 10;
            scope.GoToPage(11);
            expect(scope.curpage).toBe(1)
        }))

    })


});