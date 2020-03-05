const mongoose = require('mongoose');
const {Schema} = mongoose;

const reviewSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectID,
        required: true,
        ref: 'user',
        autopopulate: false,
    },
    vehicleId: {
        type: Schema.Types.ObjectID,
        required: true,
        ref: 'vehicle',
        autopopulate: false
    },
    ipAdress: {
        type: String
    },
    source: {
        type: String,
        required: true,
        enum: ["app", "facebook", "tweeter", "other"]
    },
    originalDate: {
        type: Date,
        required: function () {
            return this.source !== "app";
        }},
}, {
    timestamps: true
});
reviewSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('reviews', reviewSchema);