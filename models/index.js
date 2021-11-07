const dbConfig = require("../config/db.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    port: dbConfig.PORT,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    },
    logging:false
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./users")(sequelize, Sequelize);
db.task = require("./tasks")(sequelize, Sequelize);

db.user.hasMany(db.task,{
    foreignKey: 'userid', foreignKeyConstraint: true
});


db.task.belongsTo(db.user,{
    foreignKey: 'userid',
    targetKey: 'id' ,
    foreignKeyConstraint: true
});

module.exports = db;
