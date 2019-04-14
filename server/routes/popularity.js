const express = require('express');
const Popularity = require('../model/popularity');
let Product = require('../model/product');
const app = express();
const { IsValidToken } = require('../controller/authentication');

app.get('/likes', (req, res) => {

    Popularity.find({ status: 'A' })//D : deleted ; A : active
    .exec((err, result) => {

        if (err) return res.status(500).json({
                                                err
                                             });
        Popularity.count({ status: 'A' }, (err, count) => {
            res.json({
                total : count,
                likes : result
            });
        }); 
    });
});

app.get('/likes/:id', (req, res) => {
    
    let id = req.params.id;

    Popularity.find({status : 'A', product : id})
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

                Popularity.count({ status: 'A',product : id }, (err, count) => {
                    res.json({
                        like : result,
                        total : count
                     });
                });                                                
                
            });
});

app.post('/like/:id',[IsValidToken], (req, res)=> {

    let id = req.params.id;
    let user_id = req.user._id;

    Popularity.find({ status: 'A', product: id , user : user_id}) 
                .exec((err, result) => {

                    if (err) return res.status(500).json({
                                                            err
                                                        });
                    
                    if(result.length===0){
                        Product.findById(id)
                        .exec((err, prod) => {
                            if (err) return res.status(500).json({
                                                                    err
                                                                 });
                            
                            if (!prod || prod.status==='D')
                                return res.status(400).json({
                                                            err: {
                                                                    message: 'Product not exists'
                                                                }
                                                        });
            
                                let popularity = new Popularity({
                                    product : id,
                                    user : user_id,
                                    status: 'A'
                                });
                                popularity.save((err, like) => {
        
                                    if (err) return res.status(500).json({
                                                                            err
                                                                            });
                            
                                    res.status(201).json({
                                                            message : "you Liked this product!"
                                                            });
                            
                                });
                        });
                    }else
                        return res.status(500).json({
                            message : "You've already Liked this product"
                        });
                    
                });

});


module.exports = app;