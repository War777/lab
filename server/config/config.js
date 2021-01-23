export const configs = {
    development: {
      "username": "postgres",
      "password": "33Colonies",
      "database": "local",
      "host": "127.0.0.1",
      "dialect": "postgres"
    },
    test: {
      "username": "root",
      "password": null,
      "database": "database_test",
      "host": "127.0.0.1",
      "dialect": "postgres",
      "operatorsAliases": false
    },
    production: {
      "username": "root",
      "password": null,
      "database": "database_production",
      "host": "127.0.0.1",
      "dialect": "postgres",
      "operatorsAliases": false
    }
  };