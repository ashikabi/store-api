const express = require('express');

let app = express();
let Product = require('../model/product');


app.get('/product', (req, res) => {

    let from = req.query.from || 0;
    from = Number(from);

    Product.find({ status: 'A' })
        .sort('name')
        .skip(from)
        .limit(5)
        .exec((err, result) => {

            if (err) {
                return res.status(500).json({
                    err
                });
            }

            res.json({
                products : result
            });


        })

});


app.get('/product/:id', (req, res) => {

    let id = req.params.id;

    Product.findById(id)
        .exec((err, result) => {

            if (err) {
                return res.status(500).json({
                    err
                });
            }

            if (!result) {
                return res.status(400).json({
                    err: {
                        message: 'Product not exists'
                    }
                });
            }

            res.json({
                product : result
            });

        });

});



app.post('/product', (req, res) => {

    let body = req.body;

    let product = new Product({
        name : body.name,
        descripcion : body.descripcion,
        price : body.price,
        quantity : body.quantity,
        likes : body.likes,
        status : 'A'
    });

    product.save((err, result) => {

        if (err) {
            return res.status(500).json({
                err
            });
        }

        res.status(201).json({
            product: result
        });

    });

});

app.put('/product/:id', (req, res) => {

    let id = req.params.id;
    let body = req.body;

    Product.findById(id, (err, result) => {

        if (err) {
            return res.status(500).json({
                err
            });
        }

        if (!result) {
            return res.status(400).json({
                err: {
                    message: 'Product not exists'
                }
            });
        }

        result.name = body.name;
        result.description = body.description;
        result.price = body.price;
        result.quantity = body.quantity;
        result.likes = body.likes;

        result.save((err, productUpdated) => {

            if (err) {
                return res.status(500).json({
                    err
                });
            }

            res.json({
                product: productUpdated
            });

        });

    });


});

app.delete('/product/:id', (req, res) => {

    let id = req.params.id;

    Product.findById(id, (err, result) => {

        if (err) {
            return res.status(500).json({
                err
            });
        }

        if (!result) {
            return res.status(400).json({
                err: {
                    message: 'ID no existe'
                }
            });
        }

        result.status = 'D';

        result.save((err, productDeleted) => {

            if (err) {
                return res.status(500).json({
                    err
                });
            }

            res.json({
                product: productDeleted,
                message: 'Product was deleted successfully'
            });

        })

    })


});

module.exports = app;