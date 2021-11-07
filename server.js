const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')
const cors = require("cors")

require('dotenv').config()

const app = express()

const port = process.env.PORT || 3000;

const usersRouter = require('./routes/user');
const tasksRouter = require('./routes/tasks');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require('./models');
db.sequelize.sync().then(async () => {
    const foundUser = await db.user.findOne({
        where: {name: 'test123'}
    })
    if(!foundUser){
        await db.user.create({
            name: 'test123',
            image: '1.png'
        }).then(async (user) => {
            await db.task.create({
                description: 'test task to be done',
                state: false,
                userid: user.id
            })
        })
    }
});

app.use("/api/users", usersRouter);
app.use("/api/tasks", tasksRouter);

app.use('/', serveStatic(path.join(__dirname, '/front/dist')))

app.get(/.*/, function (req, res) {
    res.sendFile(path.join(__dirname, 'front/dist/index.html'))
})

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => console.log(`Listening on port: ${port}`));
}

module.exports  = app

