let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let logPurchaseSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'product' },
    amount: { type: Number, required: true, default: 0 },
    date: { type : Date, required: true ,default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    status: { type: String, required: true, default: 'A' },//D : deleted ; A : active
});


module.exports = mongoose.model('log_purchase', logPurchaseSchema);