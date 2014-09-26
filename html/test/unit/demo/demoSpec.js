describe("Unit: Testing adminApp", function() {

    beforeEach(angular.mock.module('adminApp'));

    describe("Unit: Testing projectManageCtrl", function() {
        beforeEach(angular.mock.module('projectModule'));

        it('should be return projectManageCtrl', inject(function ($rootScope, $controller, $httpBackend) {

            var data = {
                IsSuccess: true,
                Resson: "获取数据成功",
                Data: [
                    {Id: "2", Name: "程书海"},
                    {Id: "1", Name: "程书行"}
                ]
            };

            var scope = $rootScope.$new();
            var ctrl = $controller('projectManageCtrl', {$scope: scope});
            expect(scope.users).toBe([])
//            $httpBackend.expectGET('/searchDemo').respond(data);
//            console.info(scope.users+"11")

//            $httpBackend.flush();
//        expect(ctrl).not.toBeNull()
        }));
    })


});

