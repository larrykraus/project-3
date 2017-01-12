var db = require('../models');
var User = db.models.User;
var Location = db.models.Location;
var Activity = db.models.Activity;

function index(req, res) {
	console.log('Yippee index');
	User.findAll()
	    .then(function(users) {
	    	res.json(users);
	    });
};

function show(req, res) {
	console.log('Yippee show');
	User.findById(req.params.id)
	    .then(function(user) {
	    	console.log(user);
	    	res.json(user);
	    });
};

function create(req, res) {
	console.log('Yippee create');
	User.create(req.body)
	    .then(function(newUser) {
	    	console.log(newUser);
	    	res.json(newUser);
	    });
};

function update(req, res) {
	console.log('Yippee update');
	User.findById(req.params.id)
	    .then(function(user) {
	    	return user.updateAttributes(req.body);
	    })
	    .then(function(user) {
	    	res.json(user);
	    });
};

function destroy(req, res) {
	console.log("here is the req.params.id" + req.params.id);
	console.log('Yippee destroy');
	User.findById(req.params.id)
	    .then(function(user) {
	    	return user.destroy();
	    })
	    .then(function() {
	    	res.redirect('/index');
	    });
}

module.exports.index = index;
module.exports.show = show;
module.exports.create = create;
module.exports.update = update;
module.exports.destroy = destroy;