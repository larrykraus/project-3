var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var weatherRouter = require('./config/routes.js');

app.use(bodyParser.json());

app.use(weatherRouter);
app.use(express.static('public'));
app.use(function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
});


//app.listen(process.env.PORT || 3000, function() {

app.listen(process.env.DATABASE_URL || 3000, function() {

	console.log(process.env.DATABASE_URL)
	console.log('Weather app listening on localhost:3000');
})