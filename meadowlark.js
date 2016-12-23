var path = require('path');
var express = require('express');
var handlebars = require('express-handlebars');
var app = express();

// Set up handlebars view engine
app.set('views', path.join(__dirname, 'views/layouts'));
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Set port
app.set('port', process.env.PORT || 3000);

// Assign static directory
app.use(express.static(__dirname + '/public'));

var fortunes = [
	"Conquer your fears or they will conquer you.",
	"Rivers need springs.",
	"Do not fear what you don't know.",
	"You will have a pleasant surprise.",
	"Whenever possible, keep it simple."
];

// Routes
// Homepage
app.get('/', function(req, res) {
	res.render('home');
});

// About
app.get('/about', function(req, res) {
	var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
	res.render('about', { fortune: randomFortune });
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