const db = require('../models/');

module.exports = function(sequelize, Sequelize) {
    return sequelize.define('tasks', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        description: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        state :{
            type: Sequelize.BOOLEAN(),
            allowNull: false
        },
        userid: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            references: {
                model: db.user,
                key: 'id'
            },
        },
    });
}
