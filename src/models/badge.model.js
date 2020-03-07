const mongoose = require('mongoose');
const { Schema } = mongoose;
const badgeSchema = new Schema({
  name:
      {
        type: String,
        required: true,
        unique: true
      },
  logo:
      {
        type: Schema.Types.ObjectID
      },
  superadmin:
      {
        type: Schema.Types.ObjectID,
        ref: 'user',
        required: false,
        autopopulate: false
      },
  admins:
      [{
        type: Schema.Types.ObjectID
      }],
  drivers:
        [{
          type: Schema.Types.ObjectID
        }],
  vehicles:
        [{
          type: Schema.Types.ObjectID
        }],
    createdBy:
        {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        required: true
        },
        active:
        {
            type: Boolean,
            default: true
        }
},
{
  timestamps: true
}
);
badgeSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('badge', badgeSchema);
