const mongoose = require('mongoose')

const statusEnum = ["open", "picked-up", "in-transit", "delivered", "failed"]

const deliverySchema = mongoose.Schema({
   delivery_id: {
      type: String,
      validate: {
         validator: function (value) {
            const regex = /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/
            return regex.test(value);
         },
         message: 'This Package id is incorrect.'
      },
      required: true,
      unique: true
   },
   pickup_time: {type: Date},
   start_time: {type: Date},
   end_time: {type: Date},
   location: {type: Object, require: true},
   status: {
      type: String,
      enum: statusEnum,
      default: "open"
   },
   package_id: {
      type: String,
      validate: {
         validator: function (value) {
            const regex = /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/
            return regex.test(value);
         },
         message: 'This Package id is incorrect.'
      },
      required: true
   },
   package: {type: mongoose.Schema.Types.ObjectId, ref:'Package'}
})
module.exports = mongoose.model('Delivery', deliverySchema)