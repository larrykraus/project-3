var express = require('express');
var router = express.Router();
var usersController = require('../controllers/users.js');
var activitiesController = require('../controllers/activities.js');
var locationsController = require('../controllers/locations.js');

// User Routes

// index
router.get('/api/users', usersController.index);

// create
router.post('/api/users', usersController.create);

// show
router.get('/api/users/:id', usersController.show);

// update
router.put('/api/users/:id', usersController.update)

// destroy
router.delete('/api/users/:id', usersController.destroy);

module.exports = router;