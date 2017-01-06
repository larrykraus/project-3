module.exports = function(sequelize, Sequelize) {
	var model = sequelize.define('activity', {
		name: Sequelize.STRING
	})
	return model;
};

