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
  	})
	.then(function(user) {
    	console.log(user);
	});
};


userCreate()
.then(function() {
	process.exit();
});

