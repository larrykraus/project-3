var db = require('../models');
var User = db.models.User;
var Location = db.models.Location;
var Activity = db.models.Activity;
var Resort = db.models.Resort;

function index(req, res) {
	console.log('Yippee index');
	Resort.findAll()
	    .then(function(resorts) {
	    	console.log(resorts);
	    	res.json(resorts);
	    });
};

function show(req, res) {
	console.log('Yippee show');
	Resort.findById(req.params.id)
	    .then(function(resort) {
	    	console.log(resort);
	    	res.json(resort);
	    });
};

function create(req, res) {
	console.log('Yippee create');
	Resort.create(req.body)
	    .then(function(newResort) {
	    	console.log(newResort);
	    	res.json(newResort);
	    });
};

function update(req, res) {
	console.log('Yippee update');
	Resort.findById(req.params.id)
	    .then(function(resort) {
	    	return resort.updateAttributes(req.body);
	    })
	    .then(function(resort) {
	    	res.json(resort);
	    });
};

function destroy(req, res) {
	console.log('Yippee destroy');
	Resort.findById(req.params.id)
	    .then(function(resort) {
	    	return resort.destroy();
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