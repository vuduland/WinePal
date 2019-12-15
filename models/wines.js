/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'wines',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        primaryKey: true,
        comment: 'null',
        autoIncrement: true,
      },
      vintage: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        comment: 'null',
      },
      country: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: 'null',
      },
      region: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: 'null',
      },
      varietal: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: 'null',
      },
      producer: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: 'null',
      },
      ageability_index: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        comment: 'null',
      },
    },
    {
      tableName: 'wines',
    }
  );
};
