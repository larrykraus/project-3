var Sequelize = require('sequelize');

var pg = require('pg');

// pg.defaults.ssl = true;

// pg.connect(process.env.HEROKU_POSTGRESQL_YELLOW_URL, function(err, client) {

// pg.connect(process.env.DATABASE_URL, function(err, client) {

//   if (err) throw err;
//   console.log('Connected to postgres! Getting schemas...');

//   client
//     .query('SELECT table_schema,table_name FROM information_schema.tables;')
//     .on('row', function(row) {
//       console.log(JSON.stringify(row));
//     });
// });

// var sequelize = new Sequelize('postgres://micahwierenga@localhost:5432/project-3');


var sequelize = new Sequelize(process.env.HEROKU_POSTGRESQL_YELLOW_URL || 'postgres://guyliechty@localhost:5432/project3', {

	dialect: 'postgres',
	protocol: 'postgres',
	// port: match[4],
	// host: match[3],
	loggin: true
});


module.exports.Sequelize = Sequelize;
module.exports.sequelize = sequelize;

var User = sequelize.import('./user');
var Location = sequelize.import('./location');
var Activity = sequelize.import('./activity');

var UserActivity = sequelize.define('user_activity', {
	role: Sequelize.STRING
});

var UserLocation = sequelize.define('user_location', {
	role: Sequelize.STRING
});

User.belongsToMany(Location, {through: UserActivity});
Location.belongsToMany(User, {through: UserActivity});

User.belongsToMany(Activity, {through: UserLocation});
Activity.belongsToMany(User, {through: UserLocation});

module.exports.models = {
	User: User,
	Location: Location,
	Activity: Activity
};