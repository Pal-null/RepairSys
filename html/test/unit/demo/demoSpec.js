describe("Unit: Testing adminApp", function() {

    beforeEach(angular.mock.module('globalApp'));

    describe('Login route', function() {
        it('should be laod page (test route)', inject(function($location,$rootScope,$route, $httpBackend) {

            expect($route.routes['/projectManage'].controller).toBe('projectManageCtrl');
            expect($route.routes['/userManage'].controller).toBe('userManageCtrl');
            expect($route.routes['/']).toBe(undefined);
        }))
    });





    describe("Unit: Testing projectManageCtrl", function() {

        it('should be test searchdemo success', inject(function ($rootScope, $controller, $httpBackend) {

            var data = {"IsSuccess":true,"Reason":"获取数据成功","Data":{"users":[{"Id":4,"Name":"456"},{"Id":2,"Name":"123"},{"Id":1,"Name":"123"}]}};

            $httpBackend.expectGET("/searchDemo").respond(data);
            var scope = $rootScope.$new();
            var ctrl = $controller('projectManageCtrl', {$scope: scope});
            $httpBackend.flush();
            expect(scope.users.length).toBe(3);
        }));

        it('should be test searchdemo fail', inject(function ($rootScope, $controller, $httpBackend) {

            var data = {"IsSuccess":false,"Reason":"获取数据失败","Data":null};

            $httpBackend.expectGET("/searchDemo").respond(data);
            var scope = $rootScope.$new();
            var ctrl = $controller('projectManageCtrl', {$scope: scope});
            $httpBackend.flush();
            expect(scope.users).toBe("");
        }));

        it('should be test searchdemo error', inject(function ($rootScope, $controller, $httpBackend) {

            var data = {"IsSuccess":false,"Reason":"获取数据失败","Data":null};

            $httpBackend.expectGET("/searchDemo").respond(404);
            var scope = $rootScope.$new();
            var ctrl = $controller('projectManageCtrl', {$scope: scope});
            $httpBackend.flush();
            expect(scope.users).toBe("");
        }));

        it('should be test adddemo Name = "" ', inject(function ($rootScope, $controller, $httpBackend) {

            var sdata =  {"IsSuccess":true,"Reason":"获取数据成功","Data":{"users":[{"Id":4,"Name":"456"},{"Id":2,"Name":"123"},{"Id":1,"Name":"123"}]}};

            $httpBackend.expect("GET","/searchDemo").respond(sdata);

            var scope = $rootScope.$new();
            var ctrl = $controller('projectManageCtrl', {$scope: scope});

            scope.addfrom.Name = "";
            scope.addname();
            $httpBackend.flush();
        }));

        it('should be test adddemo Name = "平身" success', inject(function ($rootScope, $controller, $httpBackend) {

            var data1 = {"IsSuccess":true,"Reason":"获取数据成功","Data":{"users":[{"Id":4,"Name":"456"},{"Id":2,"Name":"123"},{"Id":1,"Name":"123"}]}};
            var sdata = {"IsSuccess":true,"Reason":"添加人员成功","Data":null};
            var data2 = {"IsSuccess":true,"Reason":"获取数据成功","Data":{"users":[{"Id":4,"Name":"456"},{"Id":2,"Name":"123"},{"Id":1,"Name":"123"},{"Id":5,"Name":"平身"}]}};
            var data3 = [{"Id":4,"Name":"456"},{"Id":2,"Name":"123"},{"Id":1,"Name":"123"},{"Id":5,"Name":"平身"}];

            $httpBackend.expectGET("/searchDemo").respond(data1);
            $httpBackend.expectPOST("/addDemo").respond(sdata);
            $httpBackend.expectGET("/searchDemo").respond(data2);
            var scope = $rootScope.$new();
            var ctrl = $controller('projectManageCtrl', {$scope: scope});
            scope.addfrom.Name = "平身";
            scope.addname();
            $httpBackend.flush();
            expect(scope.users).toEqual(data3)

        }));

        it('should be test adddemo Name = "平身" fail', inject(function ($rootScope, $controller, $httpBackend) {

            var data1 = {"IsSuccess":true,"Reason":"获取数据成功","Data":{"users":[{"Id":4,"Name":"456"},{"Id":2,"Name":"123"},{"Id":1,"Name":"123"}]}};
            var sdata = {"IsSuccess":false,"Reason":"添加人员失败","Data":null};
            var data2 = [{"Id":4,"Name":"456"},{"Id":2,"Name":"123"},{"Id":1,"Name":"123"}];

            $httpBackend.expectGET("/searchDemo").respond(data1);
            $httpBackend.expectPOST("/addDemo").respond(sdata);

            var scope = $rootScope.$new();
            var ctrl = $controller('projectManageCtrl', {$scope: scope});
            scope.addfrom.Name = "平身";
            scope.addname();
            $httpBackend.flush();
            expect(scope.users).toEqual(data2)

        }));

        it('should be test adddemo Name = "平身" error', inject(function ($rootScope, $controller, $httpBackend) {

            var data1 = {"IsSuccess":true,"Reason":"获取数据成功","Data":{"users":[{"Id":4,"Name":"456"},{"Id":2,"Name":"123"},{"Id":1,"Name":"123"}]}};
            var data2 = [{"Id":4,"Name":"456"},{"Id":2,"Name":"123"},{"Id":1,"Name":"123"}];

            $httpBackend.expectGET("/searchDemo").respond(data1);
            $httpBackend.expectPOST("/addDemo").respond(404);

            var scope = $rootScope.$new();
            var ctrl = $controller('projectManageCtrl', {$scope: scope});
            scope.addfrom.Name = "平身";
            scope.addname();
            $httpBackend.flush();
            expect(scope.users).toEqual(data2)

        }));

        it('should be test deletedemo success', inject(function ($rootScope, $controller, $httpBackend) {

            var data1 = {"IsSuccess":true,"Reason":"获取数据成功","Data":{"users":[{"Id":4,"Name":"456"},{"Id":2,"Name":"123"},{"Id":1,"Name":"123"}]}};
            var sdata = {"IsSuccess":true,"Reason":"添加人员成功","Data":null};
            var data2 = {"IsSuccess":true,"Reason":"获取数据成功","Data":{"users":[{"Id":2,"Name":"123"},{"Id":1,"Name":"123"}]}};
            var data3 = [{"Id":2,"Name":"123"},{"Id":1,"Name":"123"}];
            $httpBackend.expectGET("/searchDemo").respond(data1);
            $httpBackend.expectPOST("/deleteDemo").respond(sdata);
            $httpBackend.expectGET("/searchDemo").respond(data2);
            var scope = $rootScope.$new();
            var ctrl = $controller('projectManageCtrl', {$scope: scope});
            scope.addfrom.Name = "平身";
            scope.deletename(4);
            $httpBackend.flush();

            expect(scope.users).toEqual(data3);

        }));

        it('should be test deletedemo fail', inject(function ($rootScope, $controller, $httpBackend) {

            var data1 = {"IsSuccess":true,"Reason":"获取数据成功","Data":{"users":[{"Id":4,"Name":"456"},{"Id":2,"Name":"123"},{"Id":1,"Name":"123"}]}};
            var sdata = {"IsSuccess":false,"Reason":"添加人员失败","Data":null};
            var data2 = [{"Id":4,"Name":"456"},{"Id":2,"Name":"123"},{"Id":1,"Name":"123"}];
            $httpBackend.expectGET("/searchDemo").respond(data1);
            $httpBackend.expectPOST("/deleteDemo").respond(sdata);

            var scope = $rootScope.$new();
            var ctrl = $controller('projectManageCtrl', {$scope: scope});
            scope.addfrom.Name = "平身";
            scope.deletename(4);
            $httpBackend.flush();
            expect(scope.users).toEqual(data2)

        }));

        it('should be test deletedemo error', inject(function ($rootScope, $controller, $httpBackend) {

            var data1 = {"IsSuccess":true,"Reason":"获取数据成功","Data":{"users":[{"Id":4,"Name":"456"},{"Id":2,"Name":"123"},{"Id":1,"Name":"123"}]}};
            var data2 = [{"Id":4,"Name":"456"},{"Id":2,"Name":"123"},{"Id":1,"Name":"123"}];

            $httpBackend.expectGET("/searchDemo").respond(data1);
            $httpBackend.expectPOST("/deleteDemo").respond(404);
            var scope = $rootScope.$new();
            var ctrl = $controller('projectManageCtrl', {$scope: scope});
            scope.addfrom.Name = "平身";
            scope.deletename(4);
            $httpBackend.flush();
            expect(scope.users).toEqual(data2)

        }));

        it('should be test editdemo success', inject(function ($rootScope, $controller, $httpBackend) {

            var data1 = {"IsSuccess":true,"Reason":"获取数据成功","Data":{"users":[{"Id":4,"Name":"456"},{"Id":2,"Name":"123"},{"Id":1,"Name":"123"}]}};
            var sdata = {"IsSuccess":true,"Reason":"修改人员成功败","Data":null};
            var data2 = {"IsSuccess":true,"Reason":"获取数据成功","Data":{"users":[{"Id":4,"Name":"硬质"},{"Id":2,"Name":"123"},{"Id":1,"Name":"123"}]}};
            var data3 = [{"Id":4,"Name":"硬质"},{"Id":2,"Name":"123"},{"Id":1,"Name":"123"}];


            $httpBackend.expectGET("/searchDemo").respond(data1);
            $httpBackend.expectPOST("/updateDemo").respond(sdata);
            $httpBackend.expectGET("/searchDemo").respond(data2);
            var scope = $rootScope.$new();
            var ctrl = $controller('projectManageCtrl', {$scope: scope});
            scope.addfrom.Name = "平身";
            scope.editename({Id:4,Name:"硬质"});
            $httpBackend.flush();
            expect(scope.users).toEqual(data3)

        }));

        it('should be test editdemo fail', inject(function ($rootScope, $controller, $httpBackend) {

            var data1 = {"IsSuccess":true,"Reason":"获取数据成功","Data":{"users":[{"Id":4,"Name":"456"},{"Id":2,"Name":"123"},{"Id":1,"Name":"123"}]}};
            var sdata = {"IsSuccess":false,"Reason":"修改人员失败","Data":null};
            var data2 = [{"Id":4,"Name":"456"},{"Id":2,"Name":"123"},{"Id":1,"Name":"123"}];

            $httpBackend.expectGET("/searchDemo").respond(data1);
            $httpBackend.expectPOST("/updateDemo").respond(sdata);
            var scope = $rootScope.$new();
            var ctrl = $controller('projectManageCtrl', {$scope: scope});
            scope.addfrom.Name = "平身";
            scope.editename({Id:4,Name:"硬质"});
            $httpBackend.flush();
            expect(scope.users).toEqual(data2)

        }));

        it('should be test editdemo error', inject(function ($rootScope, $controller, $httpBackend) {

            var data1 = {"IsSuccess":true,"Reason":"获取数据成功","Data":{"users":[{"Id":4,"Name":"456"},{"Id":2,"Name":"123"},{"Id":1,"Name":"123"}]}};
            var data2 = [{"Id":4,"Name":"456"},{"Id":2,"Name":"123"},{"Id":1,"Name":"123"}];
            $httpBackend.expectGET("/searchDemo").respond(data1);
            $httpBackend.expectPOST("/updateDemo").respond(404);
            var scope = $rootScope.$new();
            var ctrl = $controller('projectManageCtrl', {$scope: scope});
            scope.addfrom.Name = "平身";
            scope.editename({Id:4,Name:"硬质"});
            $httpBackend.flush();
            expect(scope.users).toEqual(data2)

        }));
    })

    describe("Unit: Testing userManageCtrl", function() {
        it('should be test userManageCtrl', inject(function ($rootScope, $controller, $httpBackend) {


            var scope = $rootScope.$new();
            var ctrl = $controller('userManageCtrl', {$scope: scope});


        }));


    })
});

