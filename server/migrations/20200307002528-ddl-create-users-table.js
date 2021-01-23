'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
        
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        
        CREATE TABLE IF NOT EXISTS users (
            id uuid DEFAULT uuid_generate_v4(),
            names TEXT NOT NULL,
            surnames TEXT,
            email TEXT NOT NULL,
            password TEXT NOT NULL,
            createdAt timestamp NOT NULL,
            updatedAt timestamp NOT NULL,
            PRIMARY KEY (id)
        );
    `);
    
  },

  down: (queryInterface, Sequelize) => {
  }
};
