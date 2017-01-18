var db = require('../models');
var User = db.models.User;
var Location = db.models.Location;
var Activity = db.models.Activity;
var Resort = db.models.Resort;
var Preference = db.models.Preference;

function index(req, res) {
	console.log('Yippee index');
	Preference.findAll()
	    .then(function(preferences) {
	    	console.log(preferences);
	    	res.json(preferences);
	    });
};

function show(req, res) {
	console.log('Yippee show');
	Preference.findById(req.params.id)
	    .then(function(preference) {
	    	console.log(preference);
	    	res.json(preference);
	    });
};

function create(req, res) {
	console.log('Yippee create');
	Preference.create(req.body)
	    .then(function(newPreference) {
	    	console.log(newPreference);
	    	res.json(newPreference);
	    });
};

function update(req, res) {
	console.log('Yippee update');
	Preference.findById(req.params.id)
	    .then(function(preference) {
	    	return preference.updateAttributes(req.body);
	    })
	    .then(function(preference) {
	    	res.json(preference);
	    });
};

function destroy(req, res) {
	console.log('Yippee destroy');
	Preference.findById(req.params.id)
	    .then(function(preference) {
	    	return preference.destroy();
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