const express = require('express');
const {getAllDays,getAllInterviewers, getAppointment, createInterview, editInterview} = require("../controller/schedule_controller");
const scheduleRouter = express.Router();

//Edit interview
scheduleRouter
  .route('/')
  .get(editInterview)

//days
scheduleRouter
  .route('/getAllDays')
  .get(getAllDays)

//interviewers
scheduleRouter
  .route('/getInterviewers')
  .get(getAllInterviewers)

//getInterviews
scheduleRouter
  .route('/daysInterviews/:id')
  .get(getAppointment)



module.exports = scheduleRouter;