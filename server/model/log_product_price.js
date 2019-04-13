var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var logPriceSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'product' },
    old_price: { type: Number,required: true, default: 0 },
    new_price: { type: Number,required: true, default: 0 },
    date: { type : Date, required: true ,default: Date.now },
    //user: { type: Schema.Types.ObjectId, ref: 'user' },
    status: { type: String, required: true, default: 'A' },//D : deleted ; A : active
});


module.exports = mongoose.model('log_product_price', logPriceSchema);