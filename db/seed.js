var DB = require("../models").models;

var userCreate = function() {
	return DB.User.create({
	    email: "micah@micah.com",
	    password:"micah",
	    username: "micah",
	    default_location: "80123",
	    first_name: "Micah",
	    last_name: "Wierenga",
	    admin: true
  	},
    {
	    email: "larry@larry.com",
	    password:"larry",
	    username: "larry",
	    default_location: "Denver",
	    first_name: "Larry",
	    last_name: "Kraus",
	    admin: true
  	},
  	{
	    email: "merry@merry.com",
	    password:"merry",
	    username: "merry",
	    default_location: "Denver",
	    first_name: "Merry",
	    last_name: "Schurr",
	    admin: true
  	},
  	{
	    email: "guy@guy.com",
	    password:"guy",
	    username: "guy",
	    default_location: "Denver",
	    first_name: "Guy",
	    last_name: "Liechty",
	    admin: true
  	})
	.then(function(user) {
    	console.log(user);
	});
};

var locationCreate = function() {
	return DB.Location.create({
	    name: "Denver"
  	},
    {
	    name: "Arvada"
  	},
  	{
	    name: "Littleton"
  	},
  	{
	    name: "Engelwood"
  	},
  	{
	    name: "Boulder"
  	},
  	{
	    name: "Colorado Springs"
  	},
  	{
	    name: "Pueblo"
  	},
  	{
	    name: "Fort Collins"
  	},
  	{
	    name: "Breckenridge"
  	},
  	{
	    name: "Aspen"
  	},
  	{
	    name: "Vail"
  	},
  	{
	    name: "Loveland Pass"
  	})
	.then(function(location) {
    	console.log(location);
	});
};

var activityCreate = function() {
	return DB.Activity.create({
	    name: "Biking"
  	},
    {
	    name: "Skiing"
  	},
  	{
	    name: "Hiking"
  	},
  	{
	    name: "Driving"
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

