const {getDaysList, getOneDayData, appointmentEachDay, getDaysSpot} = require("../helper/syntax");
const pool = require('../database');

exports.editInterview = async (req, res) => {
  try {
    req.io.on("connection", (socket) => {
      console.log("CONNECTED");
      socket.on("send", (data) => {
        console.log(data);
      })
    })
  } catch (err) {
    console.log(err)
  }
}


exports.getAllDays = async (req, res) => {
  try {
    const days = await pool.query("SELECT * FROM days");
    const spots = await pool.query(getOneDayData);
    days.rows.forEach( day => {
      spots.rows.forEach (spot => {
        if(spot.id === day.day_id) {
          day.spots = spot.spots;
        }
      })
    })
    console.log(days.rows);
    res.json(days.rows);
  } catch (err) {
    console.log(err.message);
  }
};

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
    const data = appointments.rows;
    res.json(data);
  } catch (err) {
    console.log(err.message)
  }
};






