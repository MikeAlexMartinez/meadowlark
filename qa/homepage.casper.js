// Casper Test homepage
casper.test.begin('Check homepage of travel site', 4, function suite(test) {
	
	casper.start("http://127.0.0.1:3000/", function() {
		test.assertTitle("Meadowlark Travel");
		test.assertExists("#logo");
		test.assertExists("#welcome");
		test.assertEval(function() {
			return __utils__.findOne('#welcome').textContent === 'Welcome to Meadowlark Travel';
		});
	});

	casper.run(function() {
		test.done();
	});
});