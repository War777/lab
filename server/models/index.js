const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

import { configs } from '../config/config';
// const config = require(__dirname + '/../config/config.json')[env];

let configuration = configs[env];
// console.log('\n\n\nconfig', configuration);

const db = {};

let sequelize;
if (configuration.use_env_variable) {
    sequelize = new Sequelize(process.env[configuration.use_env_variable], configuration);
} else {
    sequelize = new Sequelize(configuration.database, configuration.username, configuration.password, configuration);
}

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = sequelize['import'](path.join(__dirname, file));
        // console.log('Associating model', model);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
// console.log(db);
// module.exports = db;

export default db;

export const models = db.sequelize.models;
