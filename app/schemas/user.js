const mongoose = require('mongoose');
const mongooseBcrypt = require('mongoose-bcrypt');

let userSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    role: {
        type: String,
        enum: ['admin', 'customer'],
        default: 'customer'
    },
});

userSchema.post('save', function (user, next) {
    User.count({}).then(count => {
        if (count == 1) {
            User.update({ '_id': user._id }, { role: "admin" }).then(result => {
                next();
            });
        } else {
            next();
        }
    })
});

userSchema.plugin(mongooseBcrypt);

const User = mongoose.model('User', userSchema);

module.exports = User