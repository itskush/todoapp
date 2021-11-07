module.exports = function(sequelize, Sequelize) {
    return sequelize.define('users', {
        id: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        image: {
            type: Sequelize.TEXT,
            allowNull: true
        },
    });
}
