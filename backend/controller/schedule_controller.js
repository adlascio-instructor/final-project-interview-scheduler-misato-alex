const {appointmentEachDay} = require("../helper/syntax");
const pool = require('../database');

exports.getAllInterviewers = async (req, res) => {
  try {
    const interviewers = await pool.query("SELECT * FROM interviewers");
    res.json(interviewers.rows);
  } catch (err) {
    console.log(err.message)
  }
}

exports.getAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointments = await pool.query(appointmentEachDay(id));
    for (const ap of appointments.rows) {
      if(ap.interview_id != null) {
        const interviews = await pool.query(`SELECT * FROM interviews WHERE ${ap.interview_id} = interviews.interview_id`);
        ap.interview =interviews.rows[0];
        const interviewer = await pool.query(`SELECT * FROM interviewers WHERE ${ap.interview.interviewer_id} = interviewers.interviewer_id`)
        ap.interview.interviewer = interviewer.rows[0]
      }
    }
    const data = appointments.rows;
    res.json(data);
  } catch (err) {
    console.log(err.message)
  }
};






