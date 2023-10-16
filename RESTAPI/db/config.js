const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/gozem',{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('connected'))
.catch(() => console.log('error connect'))

module.exports = mongoose