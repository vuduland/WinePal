var bcrypt = require('bcryptjs');

module.exports = function (sequelize, DataTypes) {
	var User = sequelize.define('User', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			comment: 'null',
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull: false,
			comment: 'null',
		},
		email: {
			type: DataTypes.STRING(100),
			allowNull: false,
			comment: 'null',
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: 'null',
		},
	});
	User.associate = models => {
		User.hasMany(models.Inventory, {
			onDelete: 'cascade',
		});
		User.hasMany(models.History, {
			onDelete: 'cascade',
		});
	};
	User.prototype.validPassword = function (password) {
		return bcrypt.compareSync(password, this.password);
	};
	User.beforeCreate(user => {
		user.password = bcrypt.hashSync(
			user.password,
			bcrypt.genSaltSync(10),
			null
		);
	});
	return User;
};
