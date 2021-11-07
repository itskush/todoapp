"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('tasks', {
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
                },
            })
    },

    down: (queryInterface, Sequelize) => {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.dropTable('users');
        */
        return queryInterface.dropTable('tasks')
    }
};
