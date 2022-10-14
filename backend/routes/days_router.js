const express = require('express');
const { getDays, getAppointments, getAvailabe } = require('../controller/days_controller');
const daysRouter = express.Router();

// all days
daysRouter.route('/days').get(getDays);

// all the appointments
daysRouter.route('/appointments').get(getAppointments);

// appointments availabe
daysRouter.route('/aps_availabe').get(getAvailabe);

module.exports = daysRouter;