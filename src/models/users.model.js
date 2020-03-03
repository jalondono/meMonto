const mongoose = require('mongoose');
const { Schema } = mongoose;
const {compareSync, hashSync, genSaltSync} = require('bcryptjs');

const userSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}
})

userSchema.methods.toJson() = function() {
    let user = this.toObject();
    delete user.password;
    return user;
}

userSchema.methods.checkPassword = function(password) {
    return compareSync(password, this.password);
}
userSchema.pre('save', async function(next) {
    const user = this;
    if(!user.isModified('password')) {
        return next();
    }
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(user.password, salt);
    user.password = hashedPassword;
    next();

})
module.exports = mongoose.model('user',userSchema);