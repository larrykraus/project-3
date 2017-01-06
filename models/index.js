var Sequelize = require('sequelize');

var sequelize = new Sequelize('postgres://micahwierenga@localhost:5432/project-3');

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
}