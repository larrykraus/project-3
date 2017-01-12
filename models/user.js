module.exports = function(sequelize, Sequelize) {
	var model = sequelize.define('user', {
		email: Sequelize.STRING,
		password: Sequelize.STRING,
		username: Sequelize.STRING,
		default_location: Sequelize.STRING,
		// displayName: Sequelize.STRING,
		admin: Sequelize.BOOLEAN
	})
	return model;
};

// 'use strict'
// var bcrypt = require('bcrypt-nodejs');
// var crypto = require('crypto');

// var instanceMethods = {
//   getGravatarUrl: function(size) {
//     if (!size) size = 200;

//     if (!this.email) {
//       return 'https://gravatar.com/avatar/?s=' + size + '&d=retro';
//     }

//     var md5 = crypto.createHash('md5').update(this.email).digest('hex');
//     return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + '&d=retro';
//   },
//   hasSetPassword: function() {
//     return this.password != null && this.password.length > 0;
//   }
// };

// var beforeSaveHook = function(user, options, fn) {
//   if(user.changed('password')) {
//     this.encryptPassword(user.password, function(hash, err) {
//       user.password = hash;
//       fn(null, user);
//     });
//     return;
//   }
//   fn(null, user);
// };

// module.exports = function(db, DataTypes) {
//   var User = db.define('User', {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       allowNull: false,
//       primaryKey: true
//     },
//     email: {
//       type: DataTypes.STRING,
//       unique: true,
//       allowNull: false,
//       isEmail: true
//     },
//     username: {
//       type: DataTypes.STRING,
//       unique: true,
//       allowNull: false
//     },
//     password: DataTypes.STRING,
//     default_location: DataTypes.STRING,
//     resetPasswordExpires: DataTypes.DATE,
//     resetPasswordToken: DataTypes.STRING,
//     admin: DataTypes.BOOLEAN
//     // createdAt: DataTypes.DATE,
//     // updatedAt: DataTypes.DATE
//   }, 
//   {
//     tableName: 'users',
//     instanceMethods: instanceMethods,
//     classMethods: {
//       associate: function(models) {
//         //User.hasMany(models.Role);
//       },
//       encryptPassword: function(password, cb) {
//         if (!password) {
//           cb('', null);
//           return;
//         }

//         bcrypt.genSalt(10, function(err, salt) {
//           if (err) { cb(null, err); return; }
//           bcrypt.hash(password, salt, null, function(hErr, hash) {
//             if (hErr) { cb(null, hErr); return; }
//             cb(hash, null);
//           });
//         });
//       },
//       findUser: function(email, password, cb) {
//         User.findOne({
//           where: { email: email }
//         })
//         .then(function(user) {
//           if(user == null || user.password == null || user.password.length === 0) {
//             cb('User / Password combination is not correct', null);
//             return;
//           }
//           bcrypt.compare(password, user.password, function(err, res) {
//             if(res)
//               cb(null, user);
//             else
//               cb(err, null);
//           });
//         })
//         .catch(function(serr) { cb(serr, null); });
//       }
//     },
//     hooks: {
//       beforeUpdate: beforeSaveHook,
//       beforeCreate: beforeSaveHook
//     }
//   }
//   );

//   return User;
// };

