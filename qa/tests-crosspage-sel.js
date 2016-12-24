var assert = require('assert'),
	test = require('selenium-webdriver/testing');
	webdriver = require('selenium-webdriver'); 

test.describe('check referrer fields for tour trips', function() {

	test.it('requesting a group rate quote from the hood river tour page ' + 
			'should populate the referrer field', function() {
		var driver = new webdriver.Builder().withCapabilities(
				webdriver.Capabilities.chrome()
			).build();
		driver.get('http://localhost:3000/tours/hood-river');
		driver.findElement(By.name('requestGroupRate')).click();
		driver.wait(until.elementLocated(By.name('referrer')), 1000).then(function(elm) {
			console.log(elm.value);
		});
		driver.quit();
	});

});