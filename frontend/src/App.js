import React, { useState, useEffect } from "react";

import "./App.scss";

import DayList from "./components/DayList";
import Appointment from "./components/Appointment";
import appointmentsData from "./components/__mocks__/appointments.json";
import axios from "axios";
import io from "socket.io-client"

export default function Application() {
  const [day, setDay] = useState(1);
  const [days, setDays] = useState([]);
  const [appointments, setAppointments] = useState(appointmentsData);


  useEffect(() => {
    axios.get('http://localhost:8000/days')
      .then((res) => {
        setDays(res.data)
      })
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:8000/schedule/daysInterviews/${day}`)
      .then((res) => {
        setAppointments(res.data)
      })
  }, [day])

  useEffect(() => {
    socket.on("receive_newAppoints", (data) => {
      console.log(data)
      setAppointments(data[0])
      setDays(data[1])
    })
  }, [appointments])

  const socket = io("http://localhost:8000")

  function bookInterview(id, interview) {
    //send server
    socket.emit("create", { appointment_id: id, interview, day });
  }

  function cancelInterview(id) {
    socket.emit("delete", {id})
  }

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={days} value={day} onChange={setDay} />
        </nav>
      </section>
      <section className="schedule">
        {Object.values(appointments).map((appointment) => (
          <Appointment
            key={appointment.id}
            {...appointment}
            bookInterview={(interview) =>
              bookInterview(appointment.id, interview)
            }
            cancelInterview={cancelInterview}
          />
        ))}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
