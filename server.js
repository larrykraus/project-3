var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var hbs = require('hbs');
var auth = require('./resources/auth');
var weatherRouter = require('./config/routes.js');

require('dotenv').load();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'hbs');


app.use(weatherRouter);
// app.use(express.static('public'));
// app.use(function(req, res) {
// 	res.sendFile(__dirname + '/public/index.html');
// });

var User = require('.models/user');
var Location = require('.models/location');
var Activity = require('.models/activity');


// API Routes

router.get('/api/me', auth.ensureAuthenticated, function(req, res) {
	console.log('Get api/me?')
	User.findById(req.user, function(err, user) {
		console.log(user);
		res.send(user.populate('posts'));
	});
});

app.put('/api/me', auth.ensureAuthenticated, function(req, res) {
	User.findById(req.user, function(err, user) {
		if (!user) {
			return res.status(400).send({ message: 'User not found.'});
		}
		user.displayName = req.body.displayName || user.displayName;
		user.username = req.body.username || user.username;
		user.email = req.body.email || user.email;
		user.save(function(err) {
			res.send(user.populate('posts'));
		});
	});
});

app.post('/auth/signup', function(req, res) {
  console.log('POST auth/signup password', req.body.email);
  bcrypt.genSalt(10, function(err, salt) {
     bcrypt.hash(req.body.password, salt, function(err, hash) {
        req.body.password = hash;
        console.log('hashed', req.body.password);
        console.log(req.body.password);

        User.create(req.body)
           .then(function(user) {
              if (!user) return error(res, "not saved");
              console.log(user.dataValues);
              auth.createJWT(user);

              res.send({
                 token: auth.createJWT(user),
                 user: user
              });
           });
     });
  });
});

app.post('/auth/login', function(req, res) {
  User.findOne({
     where: {
        email: req.body.email
     }
  }).then(function(user) {
     var compare = 'user.$modelOptions.instanceMethods.comparePassword'

     if (!user) {
        return res.status(401).send({
           message: 'Invalid email or password.'
        });
     }
     var p1 = user.dataValues.password,
        p2 = req.body.password;
     // user.$modelOptions.instanceMethods.comparePassword(p1,p2);

     validPassword = function() {
        console.log('stored from db: ', user.dataValues.password)
        console.log('password from login form: ', req.body.password)
        bcrypt.compare(req.body.password, user.dataValues.password, function(err, isMatch) {
           console.log(isMatch)
           if (isMatch === true) {
              res.send({
                 token: auth.createJWT(user)
              });
           }
        });
     };
     validPassword();
  });
});

// app.post('/auth/signup', function(req, res) {
// 	User.findOne({ email: req.body.email }, function(err, existingUser) {
// 		if (existingUser) {
// 			return res.status(409).send({ message: 'Email is already taken.'});
// 		}
// 		var user = new User({ // *****Does this section need to change?
// 			displayName: req.body.displayName,
// 			username: req.body.username,
// 			email: req.body.email,
// 			password: req.body.password
// 		});
// 		user.save(function(err, result) {
// 			if (err) {
// 				res.status(500).send({ message: err.message });
// 			}
// 			res.send({ token: auth.createJWT(user) });
// 		});
// 	});
// });

app.get('*', function(req, res) {
	res.render('index');
});


//app.listen(process.env.PORT || 3000, function() {

app.listen(process.env.DATABASE_URL || 3000, function() {

	console.log(process.env.DATABASE_URL)
	console.log('Weather app listening on localhost:3000');
})