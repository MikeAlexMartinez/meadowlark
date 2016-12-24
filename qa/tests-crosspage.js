var Browser = require('zombie'),
	assert = require('chai').assert;

var browser;

suite('Cross-page Tests', function(){

	// Executed before each test is run.
	setup(function(){
		browser = new Browser();
	});

	test('requesting a group rate quote from the hood river tour page ' + 
			'should populate the referrer field', function(done){
			var referer = 'http://localhost:3000/tours/hood-river';
			browser.visit(referer, function() {
				browser.clickLink('.requestGroupRate', function(){
					console.log("YUP");
					assert(browser.field('referer').value === referer);
					done();
				});
			});
	});

	test('requesting a group rate from the oregon coast tour page ' +
			'should populate the referrer field', function(done){
			var referer = 'http://localhost:3000/tours/oregon-coast';
			browser.visit(referer, function(){
				browser.clickLink('.requestGroupRate', function(){
					assert(browser.field('referer').value === referer);
					done();
				})
			});
	});

	test('visiting the "request group rate" page directly should result ' +
			'in an empty referrer field', function(done){
			browser.visit('http://localhost:3000/tours/request-group-rate', 
				function(){
					assert(browser.field('referer').value === '');
					done();
			});
	});
});