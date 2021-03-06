var path = require('path');
var express = require('express');
var fortune = require('./lib/fortune.js');
var app = express();

// Set up handlebars view engine
app.set('views', path.join(__dirname, 'views/layouts'));

var handlebars = require('express-handlebars').create({
		defaultLayout: 'main',
		helpers: {
			section: function(name, options){
				if(!this._sections) this._sections = {};
				this._sections[name] = options.fn(this);
				return null;
			}
		}
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Set port
app.set('port', process.env.PORT || 3000);

// Assign static directory
app.use(express.static(__dirname + '/public'));

// Page testing
app.use(function(req, res, next) {
	res.locals.showTests = app.get('env') !== 'production' &&
		req.query.test ==='1' ;
	next();
});

// Weather middleware
app.use(function(req, res, next){
	if(!res.locals.partials) res.locals.partials = {};
	res.locals.partials.weatherData = getWeatherData();
	next();
});

// Routes
// Homepage
app.get('/', function(req, res) {
	res.render('home');
});

// About
app.get('/about', function(req, res) {
	res.render('about', { 
		fortune: fortune.getFortune(),
		pageTestScript: '/qa/tests-about.js'
	});
});

// routes for cross page testing
app.get('/tours/hood-river', function(req, res){
	res.render('tours/hood-river');
});
app.get('/tours/request-group-rate', function(req, res){
	res.render('tours/request-group-rate');
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

// Mocked weather data
function getWeatherData(){
	return {
		locations: [
			{
				name: 'Portland',
				forecastUrl: 'http://www.wunderground.com/US/OR/Portland.html',
				iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
				weather: 'Overcast',
				temp: '54.1 F (12.3 C)'
			},
			{
				name: 'Bend',
				forecastUrl: 'http://www.wunderground.com/US/OR/Bend.html',
				iconUrl: 'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif',
				weather: 'Partly Cloudy',
				temp: '55.0 F (12.8 C)'
			},
			{
				name: 'Manzanita',
				forecastUrl: 'http://www.wunderground.com/US/OR/Manzanita.html',
				iconUrl: 'http://icons-ak.wxug.com/i/c/k/rain.gif',
				weather: 'Light Rain',
				temp: '55.0 F (12.8 C)'
			}
		],
	};
}
