let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const uniqueValidator = require('mongoose-unique-validator');
mongoose.set('useCreateIndex', true);
let validRols = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} is not a valid rol'
};

let userSchema = new Schema({
    name: { type: String, required: [true, 'Name is required'] },
    email: { type: String, required: [true, 'Email is required'], unique: true, },
    password: { type: String, required: true},
    role: { type: String, required: true, default: 'USER_ROLE', enum: validRols},
    status: { type: String, required: true, default: 'A' },//D : deleted ; A : active
});

//we don't want to expose the password in the consults because is a sensitive value...
userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

userSchema.plugin(uniqueValidator, { message: '{PATH} should be unique' });

module.exports = mongoose.model('user', userSchema);