/**
* Created by ZhengQinyu on 2014/10/6.
*/
describe("Testing c-prbMgr_js", function() {
    beforeEach(angular.mock.module('adminApp'));

    it('should be load page (test route)', inject(function($route) {
        expect($route.routes['/prbMgr'].controller).toBe('prbMgrCtrl');
    }));

    describe('prbMgrCtrlTest',function(){
        var scope, httpBackEnd, data;

        beforeEach(angular.mock.inject(function($rootScope, $controller, $httpBackend) {
            scope = $rootScope.$new();
            httpBackEnd = $httpBackend;
            $controller('prbMgrCtrl', {$scope: scope});
            data = {"IsSuccess": true, "Reason": "","Data": {totalPage:10,totalCount:303,problems:null}};
            scope.IsTest = true;        //设置测试标记为true
        }));

        afterEach(function(){
            scope.IsTest = false;        //设置测试标记为false
            scope.PostResult = "";
        });

        it('Testing getProblems function', function () {
            //mock数据
            data.Data.problems = [{T_id:1001,Problem:"测试问题1",Status:1},
                {T_id:1002,Problem:"测试问题2",Status:0},
                {T_id:1003,Problem:"测试问题3",Status:1}];
            httpBackEnd.expectPOST("/getProblem").respond(data);
            httpBackEnd.flush();
            expect(scope.PostResult).toEqual("success");
            expect(scope.totalPage).toBe(10);
            expect(scope.totalCount).toBe(303);
            expect(scope.problems[0].T_id).toBe(1001);
            expect(scope.problems[0].Problem).toBe("测试问题1");
            expect(scope.problems[0].Status).toBe(1);
        });

        it('Testing clickOK function for Add',function(){
            scope.IsOK='1';
            //加载JS时都会调用$scope.getProblems();，所以此处先获取/getProblem
            httpBackEnd.expectPOST("/getProblem").respond(data);
            httpBackEnd.expectPOST("/addProblem").respond(data);
            scope.clickOK();
            httpBackEnd.flush();
            expect(scope.PostResult).toBe('success');
        });

        it('Testing clickOK function for Update',function(){
            scope.IsOK='0';
            //加载JS时都会调用$scope.getProblems();，所以此处先获取/getProblem
            httpBackEnd.expectPOST("/getProblem").respond(data);
            httpBackEnd.expectPOST("/updateProblem").respond(data);
            scope.clickOK();
            httpBackEnd.flush();
            expect(scope.PostResult).toBe('success');
        });

        it('Testing showEditorAdd function', function () {
            scope.showEditorAdd();
            expect(scope.edit_title).toEqual('添加问题');
            expect(scope.IsOK).toEqual('1');
        });

        it('Testing showEditorUpdate function', function () {
            var per_problem = {T_id:1002,Problem:"测试问题2",Status:0};
            scope.showEditorUpdate(per_problem);
            expect(scope.edit_title).toEqual('编辑');
            expect(scope.IsOK).toEqual('0');
            expect(scope.i_problem).toEqual('测试问题2');
            expect(scope.i_status).toEqual(0);
            expect(scope.i_Tid).toEqual(1002);
        });

    });

});
