require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(`${process.env.MONGO_URL_PASS}`,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('connected'))
.catch(() => console.log('error connect'))

module.exports = mongoose