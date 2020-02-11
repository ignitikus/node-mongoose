const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
   name:{type: String, default:''},
   email:{type: String, unique:true, default:''},
   password:{type: String, default:''},
   date: {type: Date, default: Date.now}
})

module.exports = mongoose.model('user', UserSchema)