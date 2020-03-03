const mongoose = require('mongoose');
const {Schema} = mongoose;

const reviewSchema = new Schema({
    review: {type: String},
    rating: {type: Number},
    author: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
        autopopulate: true
    }
})
reviewSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('reviews', reviewSchema);