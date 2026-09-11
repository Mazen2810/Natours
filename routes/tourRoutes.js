const express = require('express');
const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');
const reviewRouter = require('./../routes/reviewRoutes');

const router = express.Router();

// router.param('id', tourController.checkID);
router
  .route('/get-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/statTour').get(tourController.statTour);

router.route('/plan-monthly/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    // Authentication
    authController.protect,
    // Authorization
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

// POST tours/:tourId/reviews
// GET tours/:tourId/reviews
// GET tours/:tourId/reviews/:reviewId

// Redirect to reviewRouter if route has /:tourId/reviews
router.use('/:tourId/reviews', reviewRouter);

module.exports = router;
