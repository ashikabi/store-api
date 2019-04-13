const express = require('express');

const app = express();

app.use(require('./product'));
app.use(require('./user'));
app.use(require('./login'));
app.use(require('./popularity'));

module.exports = app;