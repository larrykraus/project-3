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
	return DB.Resort.create({
	    name: "Breckenridge",
	    zip_code: "80424"
  	})
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

