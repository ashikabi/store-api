let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let popularitySchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'product' },
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    date: { type : Date, required: true ,default: Date.now },
    status: { type: String, required: true, default: 'A' },//D : deleted ; A : active
});


module.exports = mongoose.model('popularity', popularitySchema);