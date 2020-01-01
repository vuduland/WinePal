/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const History = sequelize.define('History', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: 'null',
      autoIncrement: true,
    },
    purchase_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: 'null',
    },
    notes: {
      type: DataTypes.TEXT(),
      allowNull: true,
      comment: 'null',
    },
    personal_rating: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: 'null',
    },
  });
  History.associate = models => {
    History.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  History.associate = models => {
    History.belongsTo(models.Wine, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return History;
};
