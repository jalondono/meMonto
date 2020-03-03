const mongoose = require('mongoose')
const  {Schema} = mongoose
const vehicleSchema = new Schema({
    license_plate: {type: String, required: true},
    /*reviews: [{
        type: Schema.Types.ObjectId,
        ref: "reviews",
        require: true,
        autopopulate: true
    }]
    */
});
vehicleSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('vehicle', vehicleSchema);