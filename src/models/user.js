var mongoose = require('mongoose');
var validator = require('validator');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error("age cannot be negative")
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("invalid email")
            }
        }
    },
    password: {

        type: String,
        required: true,
        trim: true,
        validate(value) {
            if ((value.includes('password') || value.length < 6)) {
                throw new Error("invalid password")
            }
        }
    },
    tokens: [

        {
            token: {
                type: String,
                required: true
            }
        }

    ]



})
//for webtokens
userSchema.methods.getWebToken = async function () {
    const user = this;
    const token = jwt.sign({
        _id: user._id.toString()
    }, 'abcdefgh')
    user.tokens = user.tokens.concat({
        token
    });
    user.save();
    return token;
}

//for hashing password
userSchema.statics.findByCredentials = async function (email, password) {
    const user = await userModel.findOne({
        email
    });
    if (!user) {
        throw new Error("unable to login");
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        throw new Error("unable to login");
    }
    return user;
}



userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);

        next();
    }
})
var userModel = new mongoose.model('UserModel', userSchema);

module.exports = userModel;