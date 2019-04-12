var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var productSchema = new Schema({
    name: { type: String, required: [true, 'Name is required'] },
    description: { type: String, required: false},
    price: { type: Number,required: [true, 'Price is necessary'] },
    quantity: { type: Number, required: false, default: 0 },
    likes: { type: Number, required: false },
    status: { type: String, required: true, default: 'A' },
});


module.exports = mongoose.model('product', productSchema);