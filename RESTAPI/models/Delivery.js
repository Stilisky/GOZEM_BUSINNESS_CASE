const mongoose = require('mongoose')

const statusEnum = ["open", "picked-up", "in-transit", "delivered", "failed"]

const deliverySchema = mongoose.Schema({
   pickup_time: {type: Date, require: true},
   start_time: {type: Date, require: true},
   end_time: {type: Date, require: true},
   location: {type: Object, require: true},
   status: {
      type: String,
      enum: statusEnum,
      default: "open"
   },
   package_id: {type: mongoose.Schema.Types.ObjectId, ref:'Package'}
})
module.exports = mongoose.model('Delivery', deliverySchema)