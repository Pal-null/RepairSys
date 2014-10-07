/**
 * Created by Zf_D on 2014-09-30
 */

describe("Testing adminApp", function() {

    beforeEach(angular.mock.module('adminApp'));

    it('should have UnitMgrCtrl', inject(function($route) {
        expect($route.routes['/unitMgr'].controller).toBe('unitMgrCtrl');
    }));

    describe('Testing UnitMgrCtrl', function () {

        var scope, httpBackEnd, data;

        beforeEach(angular.mock.inject(function($rootScope, $controller, $httpBackend) {
            scope = $rootScope.$new();
            httpBackEnd = $httpBackend;
            $controller('unitMgrCtrl', {$scope: scope});
            data = {"IsSuccess": true, "Reason": "", "Data": {"rows": []}};
        }));

        it('Testing base functions', function () {
            //clearAddRow()
            var newRow = scope.addRow;
            scope.addRow = {Name: "add", No: 123, Status: 1, Account: "123456", Phone: "12345678910"};
            scope.clearAddRow();
            expect(scope.addRow).toEqual(newRow);

            //setTempRow();
            var temp = {T_id: 1, Name:"name" , No: "12345", Status: 1, Account: "12345", Phone: "12345678910"};
            scope.setTempRow(temp);
            expect(scope.tempRow).not.toBe(null);

            //toPage()
            scope.curPage = 1;
            scope.totalPage = 10;
            scope.toPage(-1);
            expect(scope.curPage).toEqual(1);
            scope.toPage("abc");
            expect(scope.curPage).toEqual(1);
            scope.toPage(11);
            expect(scope.curPage).toEqual(1);
            scope.toPage(1);
            expect(scope.curPage).toEqual(1);
            scope.toPage(2);
            expect(scope.curPage).toEqual(2);
        });

        it('SearchUnits()',  function() {
            scope.curPage = 2;
            scope.searchUnits();
            expect(scope.curPage).toEqual(1);
        });

        /******************** IsSuccess = true ********************/
        it('GetUnits()',  function() {
            data.Data.rows = [
                {"Name": "单位1", "No": 11111, "Status": 1, "Account": 12345671},
                {"Name": "单位2", "No": 11112, "Status": 1, "Account": 12345672},
                {"Name": "单位3", "No": 11113, "Status": 1, "Account": 12345673},
                {"Name": "单位4", "No": 11114, "Status": 1, "Account": 12345674},
                {"Name": "单位5", "No": 11115, "Status": 1, "Account": 12345675},
                {"Name": "单位6", "No": 11116, "Status": 0, "Account": 12345676}
            ];
            httpBackEnd.expectPOST("/UnitMgrCtrl/GetUnits").respond(data);
            httpBackEnd.flush();
            expect(scope.rows.length).toBe(6);
        });

        it('GetUnits()',  function() {
            data.Reason = "列表为空";
            httpBackEnd.expectPOST("/UnitMgrCtrl/GetUnits").respond(data);
            httpBackEnd.flush();
            expect(scope.emptyListFlag).toBe(true);
        });

        it('CreateUnit()',  function() {
            var newRow = scope.addRow;
            scope.addRow = {Name: "add", No: 123, Status: 1, Account: "123456", Phone: "12345678910"};
            httpBackEnd.expectPOST("/UnitMgrCtrl/GetUnits").respond(data);
            httpBackEnd.expectPOST("/UnitMgrCtrl/CreateUnit").respond(data);
            httpBackEnd.expectPOST("/UnitMgrCtrl/GetUnits").respond(data);
            scope.createUnit();
            httpBackEnd.flush();
            expect(scope.addRow).toEqual(newRow);
        });

        it('UpdateUnit()',  function() {
            var newRow = {Name: "", No: null, Status: 1, Account: null, Phone: null};
            scope.tempRow = newRow;
            httpBackEnd.expectPOST("/UnitMgrCtrl/GetUnits").respond(data);
            httpBackEnd.expectPOST("/UnitMgrCtrl/UpdateUnit").respond(data);
            httpBackEnd.expectPOST("/UnitMgrCtrl/GetUnits").respond(data);
            scope.updateUnit();
            httpBackEnd.flush();
            expect(scope.tempRow).toEqual(newRow);
        });

        /******************** IsSuccess = false ********************/
        it('GetUnits()',  function() {
            httpBackEnd.expectPOST("/UnitMgrCtrl/GetUnits").respond({"IsSuccess": false});
            httpBackEnd.flush();
            expect(scope.rows.length).toBe(0);
        });

        it('CreateUnit()',  function() {
            data.rows = [{Name: "add", No: 123, Status: 1, Account: 123, Phone: 123}];
            httpBackEnd.expectPOST("/UnitMgrCtrl/GetUnits").respond(data);
            httpBackEnd.expectPOST("/UnitMgrCtrl/CreateUnit").respond({"IsSuccess": false});
            scope.createUnit();
            httpBackEnd.flush();
            expect(scope.rows).toEqual([]);
        });

        it('UpdateUnit()',  function() {
            data.rows = [{Name: "add", No: 123, Status: 1, Account: 123, Phone: 123}];
            httpBackEnd.expectPOST("/UnitMgrCtrl/GetUnits").respond(data);
            httpBackEnd.expectPOST("/UnitMgrCtrl/UpdateUnit").respond({"IsSuccess": false});
            scope.updateUnit();
            httpBackEnd.flush();
            expect(scope.rows).toEqual([]);
        });

        /******************** error ********************/
        it('GetUnits()',  function() {
            httpBackEnd.expectPOST("/UnitMgrCtrl/GetUnits").respond(404);
            httpBackEnd.flush();
            expect(scope.rows.length).toBe(0);
        });

        it('CreateUnit()',  function() {
            data.rows = [{Name: "add", No: 123, Status: 1, Account: 123, Phone: 123}];
            httpBackEnd.expectPOST("/UnitMgrCtrl/GetUnits").respond(data);
            httpBackEnd.expectPOST("/UnitMgrCtrl/CreateUnit").respond(404);
            scope.createUnit();
            httpBackEnd.flush();
            expect(scope.rows).toEqual([]);
        });

        it('UpdateUnit()',  function() {
            data.rows = [{Name: "add", No: 123, Status: 1, Account: 123, Phone: 123}];
            httpBackEnd.expectPOST("/UnitMgrCtrl/GetUnits").respond(data);
            httpBackEnd.expectPOST("/UnitMgrCtrl/UpdateUnit").respond(404);
            scope.updateUnit();
            httpBackEnd.flush();
            expect(scope.rows).toEqual([]);
        });

    });

});