/**
 * Created by admin on 2014/10/1.
 */
describe("Unit: Testing unitApp", function() {



    beforeEach(angular.mock.module('unitApp'));

    it('should have unitMgrCtrl', inject(function($route) {
        expect($route.routes['/unitProjectManage'].controller).toBe('unitProjectManageCtrl');
    }));

    describe('project table', function() {

        var scope, httpBackEnd, data ,eqmdata ,eqmDetaildata;

        beforeEach(angular.mock.inject(function($rootScope, $controller, $httpBackend) {
            scope = $rootScope.$new();
            httpBackEnd = $httpBackend;
            $controller('unitProjectManageCtrl', {$scope: scope});
            data = {"IsSuccess":true,"Reason":"获取数据成功","Data":{"projects":[{Id:1,Name:"中影集团项目",No:100085},
                {Id:2,Name:"阳光工程项目",No:100086},
                {Id:3,Name:"阳光工程项目",No:100087},
                {Id:4,Name:"阳光工程项目",No:100088},
                {Id:4,Name:"阳光工程项目",No:100089}],sum:"16"}};
             eqmdata = {"IsSuccess":true,
                "Reason":"获取数据成功",
                "Data":{"equipments":[{Pid:"100086",Name:"联想高性价手提电脑",Warranty:"1年",Starttime:"2013-05-12",status:"正常",No:123456},
                    {Pid:"100086",Name:"联想投影仪",Warranty:"1年",Starttime:"2013-05-12",status:"正常",No:123456},
                    {Pid:"100086",Name:"2匹空调",Warranty:"1年",Starttime:"2013-05-12",status:"正常",No:123456}],sum:"16"}};

            eqmDetaildata = {
                "IsSuccess":true,
                "Reason":"获取数据成功",
                "Data":{"eqmDetails":[{T_id:"1",Name:"内存",Value:"4G"},
                                         {T_id:"2",Name:"屏幕尺寸",Value:"20寸"},
                                        {T_id:"3",Name:"硬盘",Value:"西部数据1TB"}]}
            }
        }));
        //success
        it('projectTable() success',  inject(function ($rootScope, $controller, $httpBackend) {

            $httpBackend.expectPOST("/ProjectManagerCtrl/UnitPjMgrSeach").respond(data);
            $httpBackend.flush();
            expect(scope.projects).toEqual([{Id:1,Name:"中影集团项目",No:100085},
                {Id:2,Name:"阳光工程项目",No:100086},
                {Id:3,Name:"阳光工程项目",No:100087},
                {Id:4,Name:"阳光工程项目",No:100088},
                {Id:4,Name:"阳光工程项目",No:100089}
            ]);
            expect(scope.PjSumRecord).toEqual(16);
            expect(scope.pjCurPage).toEqual(1);
            expect(scope.pjSumPage).toEqual(2);

        }));
        it('projectTable() success null',  inject(function ($rootScope, $controller, $httpBackend) {

            $httpBackend.expectPOST("/ProjectManagerCtrl/UnitPjMgrSeach").respond( {"IsSuccess":true,"Reason":"获取数据成功","Data":{"projects":[],sum:"0"}});
            $httpBackend.flush();
            expect(scope.projects).toEqual([]);
            expect(scope.PjSumRecord).toEqual(0);
            expect(scope.pjCurPage).toEqual(1);
            expect(scope.pjSumPage).toEqual(1);

        }));
//——————————————————————————fail------------------------------------
        it('projectTable() fail',  inject(function ($rootScope, $controller, $httpBackend) {

            $httpBackend.expectPOST("/ProjectManagerCtrl/UnitPjMgrSeach").respond({"IsSuccess":false,"Reason":"获取数据失败","Data":null});
            $httpBackend.flush();
            expect(scope.projects.length).toBe(0)

        }));
//        ----------------------error————————————————————————————
        it('projectTable() error',  inject(function ($rootScope, $controller, $httpBackend) {

            $httpBackend.expectPOST("/ProjectManagerCtrl/UnitPjMgrSeach").respond(404);
            $httpBackend.flush();
            expect(scope.projects.length).toBe(0)
        }));

        it("PjgoToPage()",inject(function ($rootScope, $controller, $httpBackend) {

            $httpBackend.expectPOST("/ProjectManagerCtrl/UnitPjMgrSeach").respond(data);
            $httpBackend.expectPOST("/ProjectManagerCtrl/UnitPjMgrSeach").respond(data);

            scope.pjSumPage = 10;
            scope.pjCurPage = 1;
            scope.PjgoToPage(1);
            expect(scope.pjCurPage).toBe(1);

            scope.PjgoToPage(-1);
            expect(scope.pjCurPage).toBe(1);

            scope.PjgoToPage(2);
            expect(scope.pjCurPage).toBe(2);

            scope.PjgoToPage(11);
            expect(scope.pjCurPage).toBe(2);
            $httpBackend.flush();
        }));

        it('pjDetail() success',  inject(function ($rootScope, $controller, $httpBackend) {
            //success
            $httpBackend.expectPOST("/ProjectManagerCtrl/UnitPjMgrSeach").respond(data);
            $httpBackend.expectPOST("/ProjectManagerCtrl/UnitEqmMgrSeach").respond(eqmdata);
            scope.pjDetail({Id:2,Name:"阳光工程项目",No:100086,Pj_unit_id:1});
            $httpBackend.flush();
            expect( scope.equipments).toEqual([{Pid:"100086",Name:"联想高性价手提电脑",Warranty:"1年",Starttime:"2013-05-12",status:"正常",No:123456},
                                                {Pid:"100086",Name:"联想投影仪",Warranty:"1年",Starttime:"2013-05-12",status:"正常",No:123456},
                                                {Pid:"100086",Name:"2匹空调",Warranty:"1年",Starttime:"2013-05-12",status:"正常",No:123456}]);
            expect(scope.eqmSumRecord).toEqual(16);
            expect(scope.viewselect).toEqual("2");

        }));

        it('pjDetail() success null',  inject(function ($rootScope, $controller, $httpBackend) {
            //success
            $httpBackend.expectPOST("/ProjectManagerCtrl/UnitPjMgrSeach").respond(data);
            $httpBackend.expectPOST("/ProjectManagerCtrl/UnitEqmMgrSeach").respond({"IsSuccess":true,"Reason":"获取数据成功","Data":{"equipments":[],sum:"0"}});
            scope.pjDetail({Id:2,Name:"阳光工程项目",No:100086,Pj_unit_id:1});
            $httpBackend.flush();
            expect( scope.equipments).toEqual([]);
            expect(scope.eqmSumRecord).toEqual(0);
            expect(scope.viewselect).toEqual("2");

        }));

        it('pjDetail() fail',  inject(function ($rootScope, $controller, $httpBackend) {
            //faile
            $httpBackend.expectPOST("/ProjectManagerCtrl/UnitPjMgrSeach").respond(data);
            $httpBackend.expectPOST("/ProjectManagerCtrl/UnitEqmMgrSeach").respond({"IsSuccess":false, "Reason":"获取数据失败","Data":null});
            scope.pjDetail({Id:2,Name:"阳光工程项目",No:100086,Pj_unit_id:1});
            $httpBackend.flush();
            expect( scope.equipments.length).toEqual(0);
            expect(scope.viewselect).toEqual("1");
        }));

        it('pjDetail() error',  inject(function ($rootScope, $controller, $httpBackend) {
            //error
            $httpBackend.expectPOST("/ProjectManagerCtrl/UnitPjMgrSeach").respond(data);
            $httpBackend.expectPOST("/ProjectManagerCtrl/UnitEqmMgrSeach").respond(404);
            scope.pjDetail({Id:2,Name:"阳光工程项目",No:100086,Pj_unit_id:1});
            $httpBackend.flush();
            expect( scope.equipments.length).toBe(0);
            expect(scope.viewselect).toEqual("1");
        }));

//        it('editeqmentfun() success',  inject(function ($rootScope, $controller, $httpBackend) {
////    success
//            $httpBackend.expectPOST("/ProjectManagerCtrl/UnitPjMgrSeach").respond(data);
//            $httpBackend.expectPOST("/ProjectManagerCtrl/UnitEditEqm").respond({IsSuccess:true,Reason:"修改成功",Data:null});
//            $httpBackend.expectPOST("/ProjectManagerCtrl/UnitEqmMgrSeach").respond(eqmdata);
//            scope.editfrom.starttime = "2014-05-12";
//            scope.editfrom.warranty = "1";
//            scope.editeqmentfun();
//            $httpBackend.flush();
//            expect( scope.equipments).toEqual([{Pid:"100086",Name:"联想高性价手提电脑",Warranty:"1年",Starttime:"2013-05-12",status:"正常",No:123456},
//                {Pid:"100086",Name:"联想投影仪",Warranty:"1年",Starttime:"2013-05-12",status:"正常",No:123456},
//                {Pid:"100086",Name:"2匹空调",Warranty:"1年",Starttime:"2013-05-12",status:"正常",No:123456}]);
//            expect(scope.eqmSumRecord).toEqual(16)
//        }));

        it('editeqmentfun() success null',  inject(function ($rootScope, $controller, $httpBackend) {

            $httpBackend.expectPOST("/ProjectManagerCtrl/UnitPjMgrSeach").respond(data);
            scope.editeqmentfun();

            scope.editfrom.starttime = "2014-05-12";
            scope.editeqmentfun();
            $httpBackend.flush();
            expect( scope.equipments).toEqual([]);
            expect(scope.eqmSumRecord).toEqual(1)


        }));

        it('editeqmentfun() fail',  inject(function ($rootScope, $controller, $httpBackend) {
          //fail
            $httpBackend.expectPOST("/ProjectManagerCtrl/UnitPjMgrSeach").respond(data);
            $httpBackend.expectPOST("/ProjectManagerCtrl/UnitEditEqm").respond({IsSuccess:false,Reason:"修改失败",Data:null});
            scope.editfrom.starttime = "2014-05-12";
            scope.editfrom.warranty = "1";
            scope.editeqmentfun();
            $httpBackend.flush();
            expect(scope.equipments.length).toBe(0);
//
        }));

        it('editeqmentfun() error',  inject(function ($rootScope, $controller, $httpBackend) {
//            error
            $httpBackend.expectPOST("/ProjectManagerCtrl/UnitPjMgrSeach").respond(data);
            $httpBackend.expectPOST("/ProjectManagerCtrl/UnitEditEqm").respond(404);
            scope.editfrom.starttime = "2014-05-12";
            scope.editfrom.warranty = "1";
            scope.editeqmentfun();
            $httpBackend.flush();
            expect(scope.equipments.length).toBe(0);
        }));

        it("EqmgoToPage()",inject(function ($rootScope, $controller, $httpBackend) {

            $httpBackend.expectPOST("/ProjectManagerCtrl/UnitPjMgrSeach").respond(data);
            $httpBackend.expectPOST("/ProjectManagerCtrl/UnitEqmMgrSeach").respond(eqmdata);

            scope.eqmSumPage = 10;
            scope.eqmCurPage = 1;
            scope.EqmgoToPage(1);
            expect(scope.eqmCurPage).toBe(1);

            scope.EqmgoToPage(-1);
            expect(scope.eqmCurPage).toBe(1);

            scope.EqmgoToPage(2);
            expect(scope.eqmCurPage).toBe(2);

            scope.EqmgoToPage(11);
            expect(scope.eqmCurPage).toBe(2);
            $httpBackend.flush();
        }));

        it('eqmentDetailfun() success',  inject(function ($rootScope, $controller, $httpBackend) {
//            error
            $httpBackend.expectPOST("/ProjectManagerCtrl/UnitPjMgrSeach").respond(data);
            $httpBackend.expectPOST("/ProjectManagerCtrl/UnitEqmDetail").respond(eqmDetaildata);
            scope.eqmDetailfun({T_id: 132 ,Pid:"100086",Name:"2匹空调",Warranty:"1年",Starttime:"2013-05-12",status:"正常",No:123456});
            $httpBackend.flush();
            expect(scope.eqmDetails.length).toBe(3);
            expect(scope.viewselect).toEqual("3");
        }));

        it('eqmentDetailfun() fail',  inject(function ($rootScope, $controller, $httpBackend) {
//            error
            $httpBackend.expectPOST("/ProjectManagerCtrl/UnitPjMgrSeach").respond(data);
            $httpBackend.expectPOST("/ProjectManagerCtrl/UnitEqmDetail").respond({IsSuccess:false,Reason:"获取数据失败",Data:null});
            scope.eqmDetailfun({T_id: 132 ,Pid:"100086",Name:"2匹空调",Warranty:"1年",Starttime:"2013-05-12",status:"正常",No:123456});
            $httpBackend.flush();
            scope.viewselect = "2";
            expect(scope.eqmDetails.length).toBe(0);
            expect(scope.viewselect).toEqual("2");
        }));

        it('eqmentDetailfun() error',  inject(function ($rootScope, $controller, $httpBackend) {
//            error
            $httpBackend.expectPOST("/ProjectManagerCtrl/UnitPjMgrSeach").respond(data);
            $httpBackend.expectPOST("/ProjectManagerCtrl/UnitEqmDetail").respond(404);
            scope.eqmDetailfun({T_id: 132 ,Pid:"100086",Name:"2匹空调",Warranty:"1年",Starttime:"2013-05-12",status:"正常",No:123456});
            $httpBackend.flush();
            scope.viewselect = "2";
            expect(scope.eqmDetails.length).toBe(0);
            expect(scope.viewselect).toEqual("2");
        }));


        it("editfromcheck() ",inject(function(){


        }))

    });
});