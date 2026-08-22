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
  role: {
    type: String,
    enum: ['admin', 'lead-guide', 'guide', 'user'],
    default: 'user'
  },
  password: {
    type: String,
    required: [true, 'User password is required!'],
    minlength: 8,
    select: false
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
  },
  passwordChangedAt: Date
});

userSchema.pre('save', async function(next) {
  // if password doesn't modified => don't encrypt it
  if (!this.isModified('password')) return;

  // encrypt password
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm, only used to validate the password
  this.passwordConfirm = undefined;
});

userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  const compare = await bcrypt.compare(candidatePassword, userPassword);
  return compare;
};

userSchema.methods.changedPasswordAfter = function(JWTTimeStamp) {
  let passwordChangedAt;
  if (this.passwordChangedAt) {
    passwordChangedAt = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
  }
  if (passwordChangedAt) {
    const wtf = JWTTimeStamp < passwordChangedAt;
    return wtf;
  }

  return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
