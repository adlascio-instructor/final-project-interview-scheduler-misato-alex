const express = require('express');
const {getAllInterviewers, getAppointment, editInterview} = require("../controller/schedule_controller");
const scheduleRouter = express.Router();

//interviewers
scheduleRouter
  .route('/getInterviewers')
  .get(getAllInterviewers)

//getInterviews
scheduleRouter
  .route('/daysInterviews/:id')
  .get(getAppointment)

module.exports = scheduleRouter;