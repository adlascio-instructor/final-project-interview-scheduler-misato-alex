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

    console.log(appointments);
  }, [day])

  const socket = io("http://localhost:8000")

  function bookInterview(id, interview) {
    console.log(id, interview);
    //send server
    socket.emit("create", { appointment_id: id, interview, day });
    socket.on("receive_newAppoints", (data) => {
      setAppointments(data)
    })
  }


  function cancelInterview(id) {
    setAppointments((prev) => {
      const updatedAppointment = {
        ...prev[id],
        interview: null,
      };
      const appointments = {
        ...prev,
        [id]: updatedAppointment,
      };
      return appointments;
    });
    setDays((prev) => {
      const updatedDay = {
        ...prev[day],
        spots: prev[day].spots + 1,
      };
      const days = {
        ...prev,
        [day]: updatedDay,
      };
      return days;
    });
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
