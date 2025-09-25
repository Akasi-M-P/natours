// CORE MODULES
const express = require("express");

// CUSTOM MODULES
const tourController = require("../controllers/tourController");

const route = express.Router();

route
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.createTour);

route
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = route;
