const mongoose = require('mongoose');
const { Schema } = mongoose;
const vehicleSchema = new Schema({
  plate:
      {
        type: String,
        required: true,
        unique: true
      },
  drivers:
      [{
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: false,
        autopopulate: false
      }],
  year:
      {
        type: String, required: true
      },
  model:
      {
        type: String, required: true
      },
  make:
      {
        type: String, required: true
      }
},
{
  timestamps: true
}
);
vehicleSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('vehicle', vehicleSchema);
