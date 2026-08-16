const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User name is required!']
  },
  email: {
    type: String,
    required: [true, 'User email is required!'],
    unique: [true, 'User email has to be unique.'],
    lowercase: true
  },
  photo: {
    type: String
  },
  password: {
    type: String,
    required: [true, 'User password is required!']
  },
  passwordConfirm: {
    type: String,
    required: [true, 'User password is required!']
  }
});
