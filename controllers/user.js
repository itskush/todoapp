const db = require("../models");
const User = db.user;

exports.create = (req, res) => {
    User.findOne({ where: { name: req.params.username } })
        .then(data =>{
            if (data) {
                res.status(500).end('Name already exists.');
            } else {
                const image = Math.floor(Math.random() * 7) + 1 + '.png';
                User.create({ name: req.params.username, image: image })
                .then(() => {
                    res.status(201).send({
                        msg: 'User created'
                    });
                })
                .catch(err => {
                    res.status(400).send({
                        msg: err
                    });
                });
            }
        })
};

exports.update = (req, res) => {
    User.findOne({ where: { id: req.params.userid } })
        .then(data =>{
            if (data) {
                data.update({name: req.body.name })
                data.save().then(() => {
                    res.status(200).send(data);
                })
            }
        })
};

exports.delete = (req, res) => {
    User.findOne({ where: { id: req.params.userid } })
        .then(data =>{
            if (data) {
               data.destroy().then(() =>{
                   res.status(201).send({
                       msg: 'User deleted'
                   });
               })
            } else {
                res.status(400).send('Can\'t find user with that id');
            }
        })
};

exports.deleteUsername = (req, res) => {
    User.findOne({ where: { id: req.params.username } })
        .then(data =>{
            if (data) {
                data.destroy().then(() =>{
                    res.status(201).send({
                        msg: 'User deleted'
                    });
                })
            } else {
                res.status(400).send('Can\'t find user with that id');
            }
        })
};


exports.findUsers = (req, res) => {
    User.findAll()
        .then(data =>{
            if (data) {
                res.status(200).send(data);
            } else {
                res.status(400).send('No Users Found');
            }
        })
};


exports.findUser = (req, res) => {
    User.findOne({ where: { id: req.params.username } })
        .then(data =>{
            if (data) {
                res.status(201).send(data);
            } else {
                res.status(400).send('Can\'t find user with that id');
            }
        })
    User.findAll()
        .then(data =>{
            if (data) {
                res.status(200).send(data);
            } else {
                res.status(400).send('No Users Found');
            }
        })
};

