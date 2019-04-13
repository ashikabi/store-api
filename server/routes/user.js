const express = require('express');
const _ = require('underscore');
const User = require('../model/user');
const app = express();

app.get('/user', (req, res) => {

    User.find({ status: 'D' }, 'name email role status')
        .exec((err, users) => {

            if (err)
                return res.status(400).json({
                    err
                });

            User.count({ estado: true }, (err, count) => {

                res.json({
                    users,
                    total: count
                });
            });
        });
});

app.post('/user', (req, res)=> {

    let body = req.body;

    let user = new User({
        name: body.name,
        email: body.email,
        password: body.password,
        role: body.role,
        status : 'A'
    });

    user.save((err, result) => {

        if (err)
            return res.status(400).json({
                err
            });

        res.json({
            user: result
        });
    });
});

app.put('/user/:id', (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'role']);

    User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userUpdated) => {

        if (err)
            return res.status(400).json({
                err
            });

        res.json({
            user: userUpdated
        });

    })

});

app.delete('/user/:id', (req, res) =>{

    let id = req.params.id;

    User.findByIdAndUpdate(id, {status : 'D'}, { new: true }, (err, userDeleted) => {

        if (err)
            return res.status(400).json({
                err
            });

        if (!userDeleted)
            return res.status(400).json({
                err: {
                    message: 'user not found'
                }
            });

        res.json({
            user: userDeleted
        });
    });
});



module.exports = app;