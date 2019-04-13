const express = require('express');
const logPrice = require('../model/log_product_price');
const app = express();

app.get('/log/prices/product', (req, res) => {

    logPrice.find({ status: 'A' })//D : deleted ; A : active
    .sort('product')
    .exec((err, result) => {

        if (err) return res.status(500).json({
                                                err
                                             });
            logPrice.count({ status: 'A' }, (err, count) => {
            res.json({
                total : count,
                prices_history : result
            });
        }); 
    });
});

app.get('/log/prices/product/:id', (req, res) => {
    
    let id = req.params.id;

    logPrice.find({status : 'A', product : id})
                .sort('product')
                .exec((err, result) => {
                if (err) return res.status(500).json({
                                                        err
                                                     });
                
                if (!result || result.status==='D')
                    return res.status(400).json({
                                                    err: {
                                                            message: 'Product not exists'
                                                        }
                                                });

                    logPrice.count({ status: 'A',product : id }, (err, count) => {
                    res.json({
                        prices_history : result,
                        total : count
                     });
                });                                                
                
            });
});


module.exports = app;