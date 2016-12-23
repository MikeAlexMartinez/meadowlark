var path = require('path');
var express = require('express');
var handlebars = require('express-handlebars');
var fortune = require('./lib/fortune.js');
var app = express();

// Set up handlebars view engine
app.set('views', path.join(__dirname, 'views/layouts'));
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Set port
app.set('port', process.env.PORT || 3000);

// Assign static directory
app.use(express.static(__dirname + '/public'));

// Routes
// Homepage
app.get('/', function(req, res) {
	res.render('home');
});

// About
app.get('/about', function(req, res) {
	res.render('about', { fortune: fortune.getFortune() });
});

// custom 404 page
app.use(function(req,res) {
	res.status(404);
	res.render('404');
});

// custom 500 page
app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function() {
	console.log( 'Express started on http://localhost:' +
		app.get('port') + '; press Ctrl-C to terminate.' );
});	