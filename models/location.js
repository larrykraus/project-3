module.exports = function(sequelize, Sequelize) {
	var model = sequelize.define('location', {
		name: Sequelize.STRING
	})
	return model;
};

