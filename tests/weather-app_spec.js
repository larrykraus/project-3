// var chai = require('chai');
// var expect = chai.expect;
// var Activity = require('./../../user/activity');
// var Location = require('./../../user/location');


// describe('Activity', function() {
//   it('getSubtotal() should return 0 if no activities are passed in', function() {
//     var activity = new Activity([]);
//     expect(activity.getSubtotal()).to.equal(0);
//   });
// });

// describe('Location', function() {
//   it('getSubtotal() should return 0 if no locations are passed in', function() {
//     var location = new Location([]);
//     expect(location.getSubtotal()).to.equal(0);
//   });
// });




// var expect = require('chai').expect;
// var request = require('request');

// var URL = 'https://restcountries.eu/rest/v1/name/estonia';

// describe('Testing Google API', function() {
//     it('should receive a 200 / OK HTTP status code', function(done) {
//         request(URL, function(error, response, body) {
//             expect(response.statusCode).to.eq(200);
//             var body = JSON.parse(body);
//             console.log(body[0].name);
//             done();
//         })
//     });
//     it('should have a name in the body', function(done) {
//         request(URL, function(error, response, body) {
//             var countryName = JSON.parse(body);
//             for (var i = 0; i < countryName.length; i++) {
//                 console.log(countryName[i].name);
//                 expect(countryName[i].name).to.eq("Estonia");
//             }
//             done();
//         })
//     });
// })