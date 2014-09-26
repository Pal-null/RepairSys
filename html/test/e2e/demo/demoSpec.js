describe('E2E test', function() {

    afterEach(function() {
        browser.sleep(3000);
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
            element(by.css('.ic-btn.orange.style2')).click();
            browser.sleep(3000);
            var inputName = element(by.model('addfrom.Name')).sendKeys('这是一个名字');
            browser.sleep(3000);
            element(by.css('.ic-btn.orange.mg-r5')).click();
        });
    });

});