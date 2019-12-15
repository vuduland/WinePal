/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'inventory',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        comment: 'null',
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        comment: 'null',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      quantity: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        comment: 'null',
      },
      wine: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        comment: 'null',
        references: {
          model: 'wines',
          key: 'id',
        },
      },
      vendor: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: 'null',
      },
    },
    {
      tableName: 'inventory',
    }
  );
};
