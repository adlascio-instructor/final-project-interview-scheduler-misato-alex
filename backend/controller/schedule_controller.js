const {appointmentEachDay, getAppoints} = require("../helper/syntax");
const pool = require('../database');
const {getAppointments} = require("./days_controller");

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
    const data = await getAppoints(id);
    res.json(data);
  } catch (err) {
    console.log(err.message)
  }
};






