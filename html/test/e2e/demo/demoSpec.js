describe('E2E test', function() {

    afterEach(function() {
        browser.sleep(1000);
    });

    it('should show first page', function() {
        browser.get('html/demo.html');
        browser.getCurrentUrl().then(function(url) {
            expect(url).toContain('#/userManage');
        });
    });

    it('should show second page', function() {
        element.all(by.css('.part a')).last().click();
        browser.getCurrentUrl().then(function(url) {
            expect(url).toContain('#/projectManage');
        });
    });

    describe('Test CRUD', function() {

        it('should add one record', function() {
            //添加前记录个数
            var oldCount = element.all(by.repeater('user in users')).count();
            //添加
            element(by.css('.ic-btn.orange.style2')).click();
            browser.sleep(1000);
            //输入
            element(by.model('addfrom.Name')).sendKeys('这是一个名字');
            browser.sleep(1000);
            //确定
            element(by.css('.ic-btn.orange.mg-r5')).click();
            //添加后记录个数
            var newCount = element.all(by.repeater('user in users')).count();
            //判定
            expect(oldCount).toBeLessThan(newCount);
        });

        it('should update one record', function() {
            var firstInput = element.all(by.model('user.Name')).first();
            firstInput.clear();
            firstInput.sendKeys('我改过了');
            browser.sleep(1000);
            element.all(by.buttonText('修改')).first().click();
            browser.sleep(1000);
            expect(element.all(by.model('user.Name')).first().getAttribute('value')).toBe('我改过了');
        });

        it('should delete one record', function() {
            //添加前记录个数
            var oldCount = element.all(by.repeater('user in users')).count();
            //删除
            element.all(by.buttonText('删除')).first().click();
            //删除后记录个数
            var newCount = element.all(by.repeater('user in users')).count();
            //判定
            expect(oldCount).toBeGreaterThan(newCount);
        });

    });

});