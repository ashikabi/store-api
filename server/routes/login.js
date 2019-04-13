const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const app = express();

app.post('/login', (req, res) => {

    let body = req.body;

    User.findOne({ email: body.email }, (err, result) => {

        if (err)
            return res.status(500).json({
                err
            });

        if (!result)
            return res.status(400).json({
                err: {
                    message: 'invalid user'
                }
            });

        if (body.password !== result.password)
            return res.status(400).json({
                err: {
                    message: 'invalid password'
                }
            });
        let token = jwt.sign({user: result}, process.env.SEED, { expiresIn: process.env.EXPIRED_TIME });

        res.json({
            user: result,
            token
        });
    });
});

module.exports = app;