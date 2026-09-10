const Review = require('./../models/reviewModel');
const catchAsync = require('./../utils/catchAsync');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const Reviews = await Review.find();

  res.status(200).json({
    status: 'Success',
    result: Reviews.length,
    data: {
      Reviews
    }
  });
});

exports.addReview = catchAsync(async (req, res, next) => {
  let newReview = req.body;
  newReview.user = req.user._id;

  newReview = await Review.create(newReview);

  res.status(201).json({
    status: 'success',
    data: {
      newReview
    }
  });
});
