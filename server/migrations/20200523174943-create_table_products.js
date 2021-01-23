'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      console.log(Sequelize.DataTypes.UUIDV4);
    return queryInterface.createTable('products', {
        id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        description: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
        },
        price: {
            type: Sequelize.DataTypes.DOUBLE,
            allowNull: false,
        },
        createdAt: Sequelize.DataTypes.DATE,
        updatedAt: Sequelize.DataTypes.DATE
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('products');
  }
};
