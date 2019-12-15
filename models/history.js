/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'history',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        primaryKey: true,
        comment: 'null',
        autoIncrement: true,
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
      user_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        comment: 'null',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      purchase_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        comment: 'null',
      },
      notes: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: 'null',
      },
      personal_rating: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        comment: 'null',
      },
      ageability_index: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        comment: 'null',
      },
    },
    {
      tableName: 'history',
    }
  );
};
