const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'The Name is required'],
    unique: [true, 'The Name must be Unique']
  },
  rating: {
    type: Number,
    default: 4.5
  },
  price: {
    type: Number,
    require: [true, 'The Price is required']
  }
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
