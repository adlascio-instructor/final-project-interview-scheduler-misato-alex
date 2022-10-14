const pool = require('../database');
require('dotenv').config();

exports.getDays = async(req,res) => {
    try {
        const days = await pool.query("SELECT * FROM days");
        res.json(days.rows);
        console.log('days', days.rows);
    } catch (err) {
        console.log('get days error',err.message);
    }
};

exports.getAppointments = async(req,res) => {
    try {
        const appointments = await pool.query("SELECT * FROM appointments");
        res.json(appointments.rows);
        console.log('appointments', appointments.rows);
    } catch (err) {
        console.log('get appointments error',err.value);
    }
};

exports.getAvailabe = async(req,res) => {
    try {
        const available = await pool.query("SELECT * FROM available");
        res.json(available.rows);
        console.log('appointments available', available.rows);
    } catch (err) {
        console.log('appointments available error',err.value);
    }
};

