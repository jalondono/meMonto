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
        type: Schema.Types.ObjectID,
        required: true
      },
  superadmin:
      {
        type: String,
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
        }]
},
{
  timestamps: true
}
);
badgeSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('badge', badgeSchema);
