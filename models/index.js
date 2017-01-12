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

var sequelize = new Sequelize(process.env.HEROKU_POSTGRESQL_YELLOW_URL || 'postgres://micahwierenga@localhost:5432/project-3', {
	dialect: 'postgres',
	protocol: 'postgres',
	// port: match[4],
	// host: match[3],
	loggin: true
});


module.exports.Sequelize = Sequelize;
module.exports.sequelize = sequelize;

var User = sequelize.import('./user');
var Resort = sequelize.import('./resort');
var Preference = sequelize.import('./preference');
var Activity = sequelize.import('./activity');

var UserActivity = sequelize.define('user_activity', {
	role: Sequelize.STRING
});

var UserResort = sequelize.define('user_resort', {
	role: Sequelize.STRING
});

User.belongsToMany(Resort, {through: UserResort});
Resort.belongsToMany(User, {through: UserResort});

User.belongsToMany(Activity, {through: UserActivity});
Activity.belongsToMany(User, {through: UserActivity});

module.exports.models = {
	User: User,
	Resort: Resort,
	Preference: Preference,
	Activity: Activity
};