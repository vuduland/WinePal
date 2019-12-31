/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const Inventory = sequelize.define('Inventory', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: 'null',
      autoIncrement: true,
    },
    quantity: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: 'null',
    },
    vendor: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: 'null',
    },
  });
  Inventory.associate = models => {
    Inventory.belongsTo(models.User, {
      foreignKey: 'UserId',
      allowNull: false,
    });
    Inventory.belongsTo(models.Wine, {
      foreignKey: 'WineId',
      allowNull: true,
    });
  };
  return Inventory;
};
