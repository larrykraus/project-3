module.exports = function(sequelize, Sequelize) {
	var model = sequelize.define('resort', {
		name: Sequelize.STRING,

		zip_code: Sequelize.STRING
		// user_id: Sequelize.INTEGER ---CONNECT LATER

	})
	return model;
};

