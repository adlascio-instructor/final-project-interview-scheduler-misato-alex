const pool = require('./database');
const {createInterviewQuery, getAppoints, getAllData} = require("./helper/syntax");

exports.Sockets = (io) => {
  io.on("connection", (socket) => {
    socket.on("create", async (data) => {
      try {
        const appoint = await pool.query(`SELECT appointment_id FROM interviews WHERE appointment_id = ${data.appointment_id}`)
        //Create
        if(appoint.rows.length < 1) {
          const interviews = await pool.query("SELECT * FROM interviews");
          const id = interviews.rows.length + 2;
          const appoint = data.appointment_id;
          await pool.query(createInterviewQuery(id, data.interview.interviewer.interviewer_id, appoint, data.interview.student));
          const getAppointment = await getAppoints(data.day);
          const days = await pool.query("SELECT * FROM days");
          await getAllData(days);
          io.emit("receive_newAppoints", [getAppointment, days.rows]);

        } else {
          await pool.query(`UPDATE interviews SET student_name = ${"'" +data.interview.student + "'"}, interviewer_id = ${data.interview.interviewer.interviewer_id} WHERE appointment_id = ${appoint.rows[0].appointment_id}`);
          const days_id = await pool.query(`SELECT day_id FROM appointments WHERE appointment_id = ${appoint.rows[0].appointment_id}`);
          const getAppointment = await getAppoints(days_id.rows[0].day_id);
          const days = await pool.query("SELECT * FROM days");
          await getAllData(days);
          io.emit("receive_newAppoints", [getAppointment, days.rows]);
        }
      } catch (err) {
        console.log(err)
      }
    })

    socket.on("delete", async (data) => {
      try {
        await pool.query(`DELETE FROM interviews WHERE ${data.id} = appointment_id`);
        const days_id = await pool.query(`SELECT day_id FROM appointments WHERE appointment_id = ${data.id}`);
        const getAppointment = await getAppoints(days_id.rows[0].day_id);
        const days = await pool.query("SELECT * FROM days");
        await getAllData(days);
        io.emit("receive_newAppoints", [getAppointment, days.rows]);
      } catch (err) {
      }
    })

    // socket.on("disconnect", () => {
    //   console.log("the connection ended")
    // })
  })

}