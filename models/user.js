module.exports = function(sequelize, Sequelize) {
	var model = sequelize.define('user', {
		email: Sequelize.STRING,
		password: Sequelize.STRING,
		username: Sequelize.STRING,
		default_location: Sequelize.STRING,
		displayName: Sequelize.STRING,
		admin: Sequelize.BOOLEAN
	})
	return model;
};

