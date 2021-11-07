const db = require("../models");
const User = db.user;
const Task = db.task;

exports.delete = (req, res) => {
    Task.findOne({ where: { id: req.params.taskid } })
        .then(data =>{
            if (data) {
                data.destroy().then(() =>{
                    res.status(201).send({
                        msg: 'Task removed'
                    });
                })
            } else {
                res.status(400).send({
                    msg: 'Can\'t find task with that id'
                });
            }
        })
};

exports.get = async (req, res) => {
    let users,tasks=[];

    await User.findAll().then((data) =>{
        users = data.map((r) => {
            return r.dataValues;
        });
    })

    if(users){
        for (let key of Object.keys(users)) {
            await Task.findAll({
                where: { userid: users[key].id}
            }).then((data) =>{
                tasks.push({
                        user: users[key],
                        tasks: data.map((r) => {
                            return r.dataValues;
                        })
                    }
                )
            })
        }
        if (tasks){
            res.status(200).send(tasks);
        }
    }
};

exports.getByUserId = async (req, res) => {
    let userid = req.params.userId, tasks, user;

    await User.findOne({
        where:{ id: userid }
    }).then((data) =>{
        user = data
    })

    if(user){
            await Task.findAll({
                where: { userid: userid }
            }).then((data) =>{
                if (data) {
                    tasks = { data: {user: user, tasks: data } }
                }
            })
        if (tasks){
            res.status(200).send(tasks);
        }
    }
};

exports.updateTaskState = async (req, res) => {
    let taskId = req.params.taskId;
    if(taskId) {
        const foundTask = await Task.findOne({
            where: { id: taskId },
        });
        if (foundTask === null) {
            res.status(400).send('No task with that id in the database.');
        }else{
            await foundTask.update({ state: !foundTask.state})
                .catch(err => {
                    res.status(400).send({
                        msg: err
                    });
                });

            await foundTask.save().then(() => {
                res.status(201).send({
                    msg: 'Task state updated'
                });
            })
        }
    }
};

exports.updateTask = async (req, res) => {
    let taskId = req.params.taskid;
    if(taskId) {
        const foundTask = await Task.findOne({
            where: { id: taskId },
        });
        if (foundTask === null) {
            res.status(400).send('No task with that id in the database.');
        }else{
            await foundTask.update({ description: req.body.description})
                .catch(err => {
                    res.status(400).send(err);
                });

            await foundTask.save().then(() => {
                res.status(201).send({
                    msg: 'Task description updated'
                });
            })
        }
    }
};

exports.add = async (req, res) => {
    let userId = req.params.userid;
    if(userId) {
        const foundUser =  User.findOne({
            where: { id: userId },
        });
        if (foundUser === null) {
            res.status(400).send('No user with that id in the database.');
        }else{
             await Task.create({ description: req.body.description, state: 0, userid: userId })
                 .then(() => {
                    res.status(201).send({
                        msg: 'Task added to user'
                    });
                })
                .catch(err => {
                    res.status(400).send({
                        msg: err
                    });
                });
        }
    }
};
