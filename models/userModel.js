const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    required: [true, 'Please confirm your password!'],
    validate: {
      validator: function(el) {
        return el === this.password;
      },
      message: 'Password are not the same.'
    }
  }
});

userSchema.pre('save', async function(next) {
  // if password doesn't modified => don't encrypt it
  if (!this.isModified('password')) return;

  // encrypt password
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm, only used to validate the password
  this.passwordConfirm = undefined;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
