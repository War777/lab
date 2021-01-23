'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('product', {
    id: {
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};