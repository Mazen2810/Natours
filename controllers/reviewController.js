const Review = require('./../models/reviewModel');
const catchAsync = require('./../utils/catchAsync');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };
  const Reviews = await Review.find(filter);

  res.status(200).json({
    status: 'Success',
    result: Reviews.length,
    data: {
      Reviews
    }
  });
});

exports.addReview = catchAsync(async (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user._id;

  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      newReview
    }
  });
});
