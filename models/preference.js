module.exports = function(sequelize, Sequelize) {
	var model = sequelize.define('preference', {
		user_id: Sequelize.INTEGER,
		resort_id: Sequelize.INTEGER
	})
	return model;
};

