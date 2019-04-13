const express = require('express');
const logPurchase = require('../model/log_purchase');
const app = express();

app.get('/log/purchase/products', (req, res) => {

    logPurchase.find({ status: 'A' })//D : deleted ; A : active
    .sort('product')
    .exec((err, result) => {

        if (err) return res.status(500).json({
                                                err
                                             });
            logPurchase.count({ status: 'A' }, (err, count) => {
            res.json({
                total : count,
                purchase_history : result
            });
        }); 
    });
});

app.get('/log/purchase/products/:id', (req, res) => {
    
    let id = req.params.id;

    logPurchase.find({status : 'A', product : id})
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

                    logPurchase.count({ status: 'A',product : id }, (err, count) => {
                    res.json({
                        purchase_history : result,
                        total : count
                     });
                });                                                
                
            });
});


module.exports = app;