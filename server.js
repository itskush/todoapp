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
db.sequelize.sync();

app.use("/api/users", usersRouter);
app.use("/api/tasks", tasksRouter);
//here we are configuring dist to serve app files
app.use('/', serveStatic(path.join(__dirname, '/front/dist')))

app.get(/.*/, function (req, res) {
    res.sendFile(path.join(__dirname, 'front/dist/index.html'))
})

app.listen(port)
console.log(`app is listening on port: ${port}`)

