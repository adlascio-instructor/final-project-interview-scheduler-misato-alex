const express = require('express');
const {getAppointments, getAvailabe, getAllDays} = require('../controller/days_controller');
const daysRouter = express.Router();

// all days
daysRouter
  .route('/')
  .get(getAllDays);

// all the appointments
daysRouter.route('/appointments').get(getAppointments);

// appointments availabe
daysRouter.route('/aps_availabe').get(getAvailabe);

module.exports = daysRouter;