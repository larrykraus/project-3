var express = require('express');
var router = express.Router();
var usersController = require('../controllers/users.js');
var activitiesController = require('../controllers/activities.js');
var locationsController = require('../controllers/locations.js');
var resortsController = require('../controllers/resorts.js');
var weatherController = require('../controllers/weather.js');

// User Routes

// index
router.get('/api/users', usersController.index);

// create
router.post('/api/users', usersController.create);

// show
router.get('/api/users/:id', usersController.show);

// update
router.put('/api/users/:id', usersController.update);

// destroy
router.delete('/api/users/:id', usersController.destroy);


// Resort Routes

// index
router.get('/api/resorts', resortsController.index);

// create
router.post('/api/resorts', resortsController.create);

// show
router.get('/api/resorts/:id', resortsController.show);

// update
router.put('/api/resorts/:id', resortsController.update);

// destroy
router.delete('/api/resorts/:id', resortsController.destroy);


// Location Routes

// index
router.get('/api/locations', locationsController.index);

// create
router.post('/api/locations', locationsController.create);

// show
router.get('/api/locations/:id', locationsController.show);

// update
router.put('/api/locations/:id', locationsController.update);

// destroy
router.delete('/api/locations/:id', locationsController.destroy);


// Activity Routes

// index
router.get('/api/activities', activitiesController.index);

// create
router.post('/api/activities', activitiesController.create);

// show
router.get('/api/activities/:id', activitiesController.show);

// update
router.put('/api/activities/:id', activitiesController.update);

// destroy
router.delete('/api/activities/:id', activitiesController.destroy);


// Weather API Route

// show
router.get('/api/weather/:location', weatherController.show);


// Ski Weather API Route

// show
router.get('/api/ski/:location', weatherController.show);

module.exports = router;