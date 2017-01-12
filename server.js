var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var hbs = require('hbs');
var bcrypt = require('bcryptjs');
var auth = require('./resources/auth');
var weatherRouter = require('./config/routes.js');

require('dotenv').load();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'hbs');

app.use(weatherRouter);


var db = require('./models');
var User = db.models.User;
var Location = db.models.Location;
var Resort = db.models.Resort;
var Activity = db.models.Activity;


// API Routes

app.get('/api/me', auth.ensureAuthenticated, function(req, res) {
	console.log('Get api/me?')

  User.findById(req.user)
  .then(function(user){
    if(!user) res.send("not found");
    res.json(user);
  }); 
});

app.put('/api/me', auth.ensureAuthenticated, function(req, res) {
	User.findById(req.user, function(err, user) {
		if (!user) {
			return res.status(400).send({ message: 'User not found.'});
		}
		// user.displayName = req.body.displayName || user.displayName;
		user.username = req.body.username || user.username;
    user.default_location = req.body.default_location || user.default_location;
		user.email = req.body.email || user.email;
		user.save(function(err) {
			res.send(user.populate('resorts')); // *****Should this be favorite resorts?
		});
	});
});

app.get('/api/resorts', function (req, res) {
  Resort.find(function (err, allResorts) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(allResorts);
    }
  });
});

app.post('/api/resorts', auth.ensureAuthenticated, function (req, res) {
  User.findById(req.user, function (err, user) {
    var newResort = new Resort(req.body);
    newResort.save(function (err, savedResort) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        user.resorts.push(newResort);
        user.save();
        res.json(newResort);
      }
    });
  });
});

// app.post('/auth/signup', function (req, res) {
//   console.log("Here is the req" + req.body.email);
//   User.findOne({ email: req.body.email }, function (err, existingUser) {
//     if (existingUser) {
//       console.log("Existing user: " + existingUser);
//       return res.status(409).send({ message: 'Email is already taken.' });
//     }
//     var user = new User({
//       default_location: req.body.default_location,
//       username: req.body.username,
//       email: req.body.email,
//       password: req.body.password
//     });
//     console.log("here's that new user" + user)
//     user.save(function (err, result) {
//       if (err) {
//         res.status(500).send({ message: err.message });
//       }
//       console.log(result);
//       res.send({ token: auth.createJWT(result) });
//     });
//   });
// });

// app.post('/auth/login', function (req, res) {
//   User.findOne({ email: req.body.email }, '+password', function (err, user) {
//     if (!user) {
//       return res.status(401).send({ message: 'Invalid email or password.' });
//     }
//     user.comparePassword(req.body.password, function (err, isMatch) {
//       if (!isMatch) {
//         return res.status(401).send({ message: 'Invalid email or password.' });
//       }
//       res.send({ token: auth.createJWT(user) });
//     });
//   });
// });

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
              console.log("Here are the user.dataValues: " + user.dataValues);
              auth.createJWT(user);
              console.log("Here is the user " + user);
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



app.get('*', function(req, res) {
	res.render('index');
});


//app.listen(process.env.PORT || 3000, function() {

app.listen(process.env.DATABASE_URL || 3000, function() {

	console.log(process.env.DATABASE_URL)
	console.log('Weather app listening on localhost:3000');
})