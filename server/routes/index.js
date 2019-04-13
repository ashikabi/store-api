const express = require('express');

const app = express();

app.use(require('./product'));
app.use(require('./user'));
app.use(require('./login'));
app.use(require('./popularity'));
app.use(require('./log_product_price'));
app.use(require('./log_purchase'));

module.exports = app;