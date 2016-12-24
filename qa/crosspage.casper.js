// Casper cross page testing
casper.test.begin('Check navigation generates correct referrer values', 
	3 ,function suite(test) {
	
	var referrer = 'http://localhost:3000/tours/hood-river';

	casper.start(referrer, function() {
		test.assertExists('#requestGroupRate');
		this.clickLabel('Request Group Rate', 'a');
	});

	casper.then(function() {
		var currentUrl = this.getCurrentUrl();
		var targetUrl = 'http://localhost:3000/tours/request-group-rate';
		var liveReferrer = this.getElementAttribute('#referrer','value');
		
		test.assertEquals(currentUrl, targetUrl);
		test.assertEquals(liveReferrer, referrer);
	});

	casper.run(function() {
		test.done();
	});
});