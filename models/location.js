module.exports = function(sequelize, Sequelize) {
	var model = sequelize.define('location', {
		name: Sequelize.STRING,
		user_id: Sequelize.INTEGER
	})
	return model;
};

