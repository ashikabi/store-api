const express = require('express');
let Product = require('../model/product');
let LogPrice = require('../model/log_product_price');
let LogPurchase = require('../model/log_purchase');

let app = express();

//getting the whole list of products using pagination with 5 products per page
app.get('/products', (req, res) => {

    let from = req.query.from || 0;
    from = Number(from);
    let step = req.query.step || 5;

Product.find({ status: 'A' })//D : deleted ; A : active
        .sort('name')
        .skip(from)
        .limit(step)
        .exec((err, result) => {

            if (err) return res.status(500).json({
                                                    err
                                                 });

            res.json({
                        products : result
                     });
        })
});

//getting the whole list of products using pagination with 5 products per page and just those products that has stock
app.get('/product/availables', (req, res) => {
    let from = req.query.from || 0;
        from = Number(from);
    let step = req.query.step || 5;

    Product.find({ status: 'A', //D : deleted ; A : active
                   quantity: {$gt: 0} }) // quantity > 0
            .sort('name')
            .skip(from)
            .limit(step)
            .exec((err, result) => {

                if (err) return res.status(500).json({
                                                        err
                                                     });

                res.json({
                            products : result
                         });
            })
});

//getting the detail of one specific product
app.get('/product/:id', (req, res) => {
    let id = req.params.id;
    Product.findById(id)
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

                res.json({
                            product : result
                         });
            });
});

//getting a list of products searching by name (such as a like in transact sql)
app.get('/product/search/:name', (req, res) => {
    
    let regex = new RegExp(req.params.name, "i")

    Product.find({ status: 'A', name: regex }) 
            .sort('name')
            .exec((err, result) => {

                if (err) return res.status(500).json({
                                                        err
                                                     });

                res.json({
                            products : result
                         });
            })
});


//adding a new product
app.post('/product', (req, res) => {

    let body = req.body;

    let product = new Product({
                                name : body.name,
                                descripcion : body.descripcion,
                                price : body.price || 0,
                                quantity : body.quantity || 0,
                                //likes : body.likes,
                                status : 'A'
                            });

    product.save((err, result) => {

        if (err) return res.status(500).json({
                                                err
                                             });

        res.status(201).json({
                                product: result
                             });

    });

});

//updateting one product
app.put('/product/:id', (req, res) => {

    let id = req.params.id;
    let body = req.body;

    Product.findById(id, (err, result) => {

        if (err) return res.status(500).json({
                                                err
                                             });

        if (!result || result.status==='D')
            return res.status(400).json({
                err: {
                    message: 'Product not exists'
                }
            });

        result.name = body.name;
        result.description = body.description;
        //result.price = body.price;
        //result.quantity = body.quantity;
        //result.likes = body.likes;

        result.save((err, productUpdated) => {

            if (err) return res.status(500).json({
                                                    err
                                                 });

            res.json({
                        product: productUpdated
                     });

        });

    });

});

//modifying the price of one product and inserting a log of that change
app.put('/product/price/:id', (req, res) => {

    let id = req.params.id;
    let new_price = req.body.price;
    let old_price = 0;

    Product.findById(id, (err, result) => {

        if (err) {
            return res.status(500).json({
                err
            });
        }

        if (!result || result.status==='D') {
            return res.status(400).json({
                err: {
                    message: 'Product not exists'
                }
            });
        }
        old_price = result.price;
        result.price = new_price; 
        result.save((err, productUpdated) => {

            if (err) {
                return res.status(500).json({
                    err
                });
            }

            let log_price = new LogPrice({
                product: result._id,
                old_price,
                new_price,
                //me falta implementar usuario
                //date : Date.now,
                status : 'A'
            });

            log_price.save((err, log) => {

                if (err) {
                    return res.status(500).json({
                        err
                    });
                }
        
                res.status(201).json({
                    log,
                    product: productUpdated
                });
        
            });

        });

    });

});

//modifying the stock quantity of one product.
app.put('/product/stock/:id', (req, res) => {

    let id = req.params.id;
    let new_quantity = req.body.quantity;

    Product.findById(id, (err, result) => {

        if (err) {
            return res.status(500).json({
                err
            });
        }

        if (!result || result.status==='D') {
            return res.status(400).json({
                err: {
                    message: 'Product not exists'
                }
            });
        }
        
        result.quantity = new_quantity; 
        result.save((err, productUpdated) => {

            if (err) {
                return res.status(500).json({
                    err
                });
            }

            res.status(201).json({
                product: productUpdated
            });

        });

    });

});

//performing a purchase : decreasing the stock quantity and inserting in log_purchase
app.put('/product/purchase/:id', (req, res) => {

    let id = req.params.id;
    let amount = req.body.quantity;

    Product.findById(id, (err, result) => {

        if (err) {
            return res.status(500).json({
                err
            });
        }

        if (!result || result.status==='D') {
            return res.status(400).json({
                err: {
                    message: 'Product not exists'
                }
            });
        }
        let current_amount = result.quantity;
        
        if (current_amount >=  amount){
            result.quantity = current_amount - amount; 
            result.save((err, productUpdated) => {

                if (err) {
                    return res.status(500).json({
                        err
                    });
                }

                let log_purchase = new LogPurchase({
                    product: result._id,
                    amount,
                    //me falta implementar usuario
                    //date : Date.now,
                    status : 'A'
                });
    
                log_purchase.save((err, log) => {
    
                    if (err) {
                        return res.status(500).json({
                            err
                        });
                    }
            
                    res.status(201).json({
                        log,
                        product: productUpdated
                    });
                });

            });
        }else
            return res.status(400).json({
                err: {
                    message: "There isn't enough products in the stock"
                }
            });
    });

});

app.delete('/product/:id', (req, res) => {

    let id = req.params.id;

    Product.findById(id, (err, result) => {

        if (err) return res.status(500).json({
                                                err
                                             });

        if (!result || result.status==='D')
            return res.status(400).json({
                                            err: {
                                                    message: 'ID no existe'
                                                }
                                        });

        result.status = 'D';

        result.save((err, productDeleted) => {

            if (err)
                return res.status(500).json({
                    err
                });

            res.json({
                product: productDeleted,
                message: 'Product was deleted successfully'
            });
        })
    })
});

module.exports = app;