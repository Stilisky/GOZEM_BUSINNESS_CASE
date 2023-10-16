const mongoose = require('mongoose')

const packageSchema = mongoose.Schema({
   package_id: {
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
   description: {type: String, require: true},
   weight: {
      type: Number,
      validate: {
         validator: function (value) {
            return value >= 0;
         },
         message: 'Enter a positif number in grams.'
      }
   },
   width: {
      type: Number,
      validate: {
         validator: function (value) {
            return value >= 0;
         },
         message: 'Enter a positif number in cm.'
      }
   },
   height: {
      type: Number,
      validate: {
         validator: function (value) {
            return value >= 0;
         },
         message: 'Enter a positif number in cm.'
      }
   },
   depth: {
      type: Number,
      validate: {
         validator: function (value) {
            return value >= 0;
         },
         message: 'Enter a positif number in cm.'
      }
   },
   from_name : {type: String, require: true},
   from_address : {type: String, require: true},
   from_location : {type: Object, require: true},
   to_name : {type: String, require: true},
   to_address : {type: String, require: true},
   to_location : {type: Object, require: true},
   active_delivery_id: {
      type: String,
      validate: {
         validator: function (value) {
            const regex = /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/
            return regex.test(value);
         },
         message: 'This Package id is incorrect.'
      }
   },
   delivery: {type: mongoose.Schema.Types.ObjectId, ref:'Delivery'}
})
module.exports = mongoose.model('Package', packageSchema)