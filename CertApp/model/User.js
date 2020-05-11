const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const UserSchema = new Schema({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  institution_name: {
    type: String
  },
  passwordCheckGen: {
    type: String
  },
  passwordCheck: {
    type: String
  },
  accountNumberGen: {
    type: String
  },
  accountNumberCheck: {
    type: String
  },
  moduleName: {
    type: String
  },
  moduleGrade: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String
  }
})

module.exports = User = mongoose.model('users', UserSchema)