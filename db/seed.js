var DB = require("../models").models;

var userCreate = function() {
	return DB.User.create({
	    email: "larry@larry.com",
	    password:"larry",
	    username: "larry",
	    default_location: "Denver",
	    displayName: "Larry Kraus",
	    admin: true
  	})
	.then(function(user) {
    	console.log(user);
	});
};

var locationCreate = function() {
	return DB.Location.create({
	    name: "Denver"
  	})
	.then(function(location) {
    	console.log(location);
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
.then(locationCreate)
.then(activityCreate)
.then(function() {
	process.exit();
});

