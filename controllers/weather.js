var request = require('request');
var apiKeyWeather = process.env.apiKeyWeather || require('../config/env').key;

function show (req, res) {
    var vm = this;
    var apiUrl = 'http://api.wunderground.com/api/' + apiKeyWeather;
    var url = apiUrl + '/geolookup/q/' + req.params.location + '.json';

    var weather = [];

    // Get Location
    request(url, function (err, response1, body) {
        var location = JSON.parse(body).location.requesturl;
        var conditionsUrl = apiUrl + "/conditions/q/" + location + ".json";
        var hourlyUrl = apiUrl + "/hourly/q/" + location + ".json";
        var forecastUrl = apiUrl + "/forecast10day/q/" + location + ".json";


        // Current Conditions
        request(conditionsUrl, function(err, response2, body1) {
            current_weather = JSON.parse(body1).current_observation;
            weather.push(current_weather);

            // Hourly
            request(hourlyUrl, function(err, response3, body2) {
                hourly = JSON.parse(body2).hourly_forecast;
                weather.push(hourly);

                // 10-day Forecast
                request(forecastUrl, function(err, response4, body3) {
                    forecast = JSON.parse(body3).forecast;
                    weather.push(forecast);
                    res.json(weather);

                })

            })

        })
        
    });

}

module.exports.show = show;