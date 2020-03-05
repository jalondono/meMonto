const mongoose = require('mongoose');
const {Schema} = mongoose;

const reviewSchema = new Schema({
    value: {
        type: Number,
        enum: [0, 1, 2, 3, 4, 5],
        default: 5,
        required: true,
        },
    userId: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
            autopopulate: false
        },
    vehicleId: {
        type: Schema.Types.ObjectId,
        required: true
    }
},
{ timestamps: true }    )

reviewSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('ratings', reviewSchema);