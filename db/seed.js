var DB = require("../models").models;

var userCreate = function() {
	return DB.User.create({
	    email: "larry@larry.com",
	    password:"larry",
	    username: "larry",
	    default_location: "Denver",
	    // resetPasswordExpires: 9999-12-31,
    	// resetPasswordToken: "null",
	    admin: true
  	})
	.then(function(user) {
    	console.log(user);
	});
};

// var locationCreate = function() {
// 	return DB.Location.create({
// 	    name: "Denver"
//   	})
// 	.then(function(location) {
//     	console.log(location);
// 	});
// };

var resortCreate = function() {
	return DB.Resort.bulkCreate([{
	    name: "Breckenridge",
	    zip_code: "80424"
  	},
  	{
	    name: "Aspen",
	    zip_code: "81611"
  	},
  	{
	    name: "Winter Park",
	    zip_code: "80482"
  	},
  	{
	    name: "Vail",
	    zip_code: "81657"
  	},
  	{
	    name: "Keystone",
	    zip_code: "80435"
  	},
  	{
	    name: "Arapahoe Basin",
	    zip_code: "80435"
  	},
  	{
	    name: "Beaver Creek",
	    zip_code: "81620"
  	},
  	{
	    name: "Monarch",
	    zip_code: "81227"
  	},
  	{
	    name: "Loveland",
	    zip_code: "80435"
  	},
  	{
	    name: "Copper Mountain",
	    zip_code: "80443"
  	},
  	{
	    name: "Telluride",
	    zip_code: "81435"
  	},
  	{
	    name: "Steamboat",
	    zip_code: "80487"
  	},
  	{
	    name: "Wolf Creek",
	    zip_code: "81147"
  	},
  	{
	    name: "Snowmass",
	    zip_code: "81615"
  	}])
	.then(function(resort) {
    	console.log(resort);
	});
};

var activityCreate = function() {
	return DB.Activity.create({
	    name: "Biking"
  	})
	.then(function(activity) {
    	console.log(activity);
	});
};


userCreate()
// .then(locationCreate)
.then(activityCreate)
.then(resortCreate)
.then(function() {
	process.exit();
});

