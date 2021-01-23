import Sequelize from 'sequelize';

const orm = new Sequelize('local', 'postgres', '33Colonies', {
    host: 'localhost',
    dialect: 'postgres',
    operatorAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

orm.authenticate()
    .then(() => console.log('db connected...'))
    .catch(error => console.log(error));

export default orm;