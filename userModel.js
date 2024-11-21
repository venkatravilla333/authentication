let mongoose = require('mongoose')

let userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true,
  },
  confirmpassword: {
    type: String,
    require: true,
  }
}, { timestamps: true })

let User = mongoose.model('users', userSchema)

module.exports = User

