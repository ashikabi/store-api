const express = require('express');
const _ = require('underscore');
const User = require('../model/popularity');
const app = express();
const { IsValidToken } = require('../controller/authentication');

app.get('/likes', (req, res) => {

});

app.post('/like',[IsValidToken], (req, res)=> {

});


module.exports = app;