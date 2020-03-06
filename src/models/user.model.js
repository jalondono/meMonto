const mongoose = require('mongoose');
const { Schema } = mongoose;
const {compareSync, hashSync, genSaltSync} = require('bcryptjs');

const userSchema = new Schema(
    {
    email: {
        type: String, 
        required: true,
        unique: true,
        trim: true
        },
    password: {
        type: String, 
        required: true
        },
    type: {
        type: String,
        required: true,
        enum: ['normal', 'driver', 'admin', 'super'],
        default: 'normal'
        },
    name: {
        type: String,
        trim: true
    },
    photo: {
        type: String
    }, 
    twitterUser: {
        type: String,
    },
    vehicleId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: function() { return this.type === 'driver'; }

    },
    badgeId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: function() { return this.type === 'admin'; }
    }

},
    { timestamps: true }    
)

userSchema.pre('save', async function(next) {
    const user = this;
    try {
       if(!user.isModified('password')) {
        return next();
    }
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(user.password, salt);
    user.password = hashedPassword;
    next(); 
    }
    catch(err) {
        console.log(err)
        return next(err)
    }
})

userSchema.methods.checkPassword = function(password) {
    const passwordHash = this.password
    return compareSync(password, passwordHash);
}
module.exports = mongoose.model('user', userSchema);
