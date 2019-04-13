let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let productSchema = new Schema({
    name: { type: String, required: [true, 'Name is required'] },
    description: { type: String, required: false},
    price: { type: Number,required: true, default: 0 },
    quantity: { type: Number, required: true, default: 0 },
    //likes: { type: Number, required: false },
    status: { type: String, required: true, default: 'A' },//D : deleted ; A : active
});


module.exports = mongoose.model('product', productSchema);