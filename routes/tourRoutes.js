/* eslint-disable prettier/prettier */
const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');

const router = express.Router();

// Alias which created by middleware and show 5 max ratings and cheapest itemsrouter
router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

//Aggregation pipeline -matching and grouping
router.route('/tour-stats').get(tourController.getTourStats);

//Aggregation pipeline -unwinding and projecting
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

//Regular routes
router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

module.exports = router;
