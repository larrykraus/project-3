var request = require('request');
var apiKeyWeather = process.env.apiKeyWeather || require('../config/env').key;

function show (req, res) {
	var vm = this;

	var apiUrl = 'http://api.wunderground.com/api/' + apiKeyWeather;
	var url = apiUrl + '/geolookup/q/' + req.params.location + '.json';
	// var current_weather;
		request(url, function (err, res, body) {
			var location = JSON.parse(body).location.requesturl;
			var conditionsUrl = apiUrl + "/conditions/q/" + location + ".json";
			request(conditionsUrl, function(err, res, body) {
				console.log('This is the res: ' + res);
				console.log('This is the body: ' + body);

				vm.current_weather = JSON.parse(body).current_observation;
				console.log(vm.current_weather);
				// console.log('And the observation: ' + observation.location);
				// console.log("The weather in", observation.display_location.full, "is", observation.weather)
			})
		});
	console.log(vm.current_weather);
	res.json(vm.current_weather);
}

module.exports.show = show;