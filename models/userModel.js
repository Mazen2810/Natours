const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User name is required!']
  },
  email: {
    type: String,
    required: [true, 'User email is required!'],
    unique: [true, 'User email has to be unique.'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  photo: {
    type: String
  },
  password: {
    type: String,
    required: [true, 'User password is required!'],
    minlength: 8
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password!']
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
