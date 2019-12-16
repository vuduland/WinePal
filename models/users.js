var bcrypt = require('bcryptjs');

module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define(
    'users',
    {
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
    },
    {
      tableName: 'users',
    }
  );
  users.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  users.beforeCreate(user => {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });
  return users;
};
