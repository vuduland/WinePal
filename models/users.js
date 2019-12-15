/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
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
    },
    {
      tableName: 'users',
    }
  );
};
