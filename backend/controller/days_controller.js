const pool = require('../database');
const {getOneDayData, getAllData} = require("../helper/syntax");

exports.getAllDays = async (req, res) => {
  try {
    const days = await pool.query("SELECT * FROM days");
    await getAllData(days)
    res.json(days.rows);
  } catch (err) {
    console.log(err.message);
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await pool.query("SELECT * FROM appointments");
    res.json(appointments.rows);
    console.log('appointments', appointments.rows);
  } catch (err) {
    console.log('get appointments error', err.value);
  }
};

exports.getAvailabe = async (req, res) => {
  try {
    const available = await pool.query("SELECT * FROM available");
    res.json(available.rows);
    console.log('appointments available', available.rows);
  } catch (err) {
    console.log('appointments available error', err.value);
  }
};

