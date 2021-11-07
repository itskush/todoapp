const dbConfig = require("../config/db.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    },
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

sequelize.sync().then(() => {
    db.user.create({
        name: 'test123',
        image: '1.png'
    }).then((user) => {
        db.task.create({
            description: 'test task to be done',
            state: false,
            userid: user.id
        })
    })
});

module.exports = db;
