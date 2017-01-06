module.exports = function(sequelize, Sequelize) {
	var model = sequelize.define('user', {
		email: Sequelize.STRING,
		password: Sequelize.STRING,
		username: Sequelize.STRING,
		default_location: Sequelize.STRING,
		first_name: Sequelize.STRING,
		last_name: Sequelize.STRING,
		admin: Sequelize.BOOLEAN
	})
	return model;
};

