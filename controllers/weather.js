var request = require('request');
var apiKeyWeather = process.env.apiKeyWeather || require('../config/env').key;

function show (req, res) {
	var vm = this;

	var apiUrl = 'http://api.wunderground.com/api/' + apiKeyWeather;
	var url = apiUrl + '/geolookup/q/' + req.params.location + '.json';

		request(url, function (err, response1, body) {
			var location = JSON.parse(body).location.requesturl;
			var conditionsUrl = apiUrl + "/conditions/q/" + location + ".json";
			request(conditionsUrl, function(err, response2, body) {

				current_weather = JSON.parse(body).current_observation;
				console.log(body.current_observation);
				res.json(current_weather);
			})
		});
}

module.exports.show = show;