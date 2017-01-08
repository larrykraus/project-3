var db = require('../models');
var User = db.models.User;
var Location = db.models.Location;
var Activity = db.models.Activity;

function index(req, res) {
	console.log('Yippee index activity');
	Activity.findAll()
	    .then(function(activities) {
	    	console.log(activities);
	    	res.json(activities);
	    });
};

function show(req, res) {
	console.log('Yippee show activity');
	Activity.findById(req.params.id)
	    .then(function(activity) {
	    	console.log(activity);
	    	res.json(activity);
	    });
};

function create(req, res) {
	console.log('Yippee create activity');
	Activity.create(req.body)
	    .then(function(newActivity) {
	    	console.log(newActivity);
	    	res.json(newActivity);
	    });
};

function update(req, res) {
	console.log('Yippee update activity');
	Activity.findById(req.params.id)
	    .then(function(activity) {
	    	return activity.updateAttributes(req.body);
	    })
	    .then(function(activity) {
	    	res.json(activity);
	    });
};

function destroy(req, res) {
	console.log('Yippee destroy activity');
	Activity.findById(req.params.id)
	    .then(function(activity) {
	    	return activity.destroy();
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