'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    id: {
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    names: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    surnames: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    createdAt: {
        field: 'createdat',
        type: DataTypes.DATE,
    },
    updatedAt: {
        field: 'updatedat',
        type: DataTypes.DATE,
    },
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};