var db = require('../models');
var User = db.models.User;
var Location = db.models.Location;
var Activity = db.models.Activity;

function index(req, res) {
	console.log('Yippee index');
	Location.findAll()
	    .then(function(locations) {
	    	console.log(locations);
	    	res.json(locations);
	    });
};

function show(req, res) {
	console.log('Yippee show');
	Location.findById(req.params.id)
	    .then(function(location) {
	    	console.log(location);
	    	res.json(location);
	    });
};

function create(req, res) {
	console.log('Yippee create');
	Location.create(req.body)
	    .then(function(newLocation) {
	    	console.log(newLocation);
	    	res.json(newLocation);
	    });
};

function update(req, res) {
	console.log('Yippee update');
	Location.findById(req.params.id)
	    .then(function(location) {
	    	return location.updateAttributes(req.body);
	    })
	    .then(function(location) {
	    	res.json(location);
	    });
};

function destroy(req, res) {
	console.log('Yippee destroy');
	Location.findById(req.params.id)
	    .then(function(location) {
	    	return location.destroy();
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