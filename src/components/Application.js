import React, { useEffect, useState } from "react";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
// import InterviewerListItem from "./InterviewerListItem";
// import InterviewerList from "./InterviewerList";
import Appointment from "./Appointment";
// import Show from "components/Appointment/Show";
// import useVisualMode from "hooks/useVisualMode";

// import { action } from "@storybook/addon-actions/dist/preview";
// const SHOW = "SHOW";

export default function Application() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const setDay = (day) => setState({ ...state, day });

  const interviewersForDay = getInterviewersForDay(state, state.day);

  // const setDays = (days) => {
  //   //... your code here ...
  //   setState({ ...state, days })

  // }

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      const [days, appointments, interviewers] = all;

      setState((prev) => ({
        ...prev,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data,
      }));
    });
  }, []);
  //////////////////////


  const appointmentsList = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    console.log('Appointment ; ', appointment);
    console.log('Interview: ', interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewersForDay={interviewersForDay}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}

      />

    );

  });

  // bookInterviews
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then((response) => {
        console.log('response: ', response);
        setState({
          ...state,
          appointments,
        });
      })
      // .catch((error) => {
      //   console.log(error.toJSON());
      // });
    // return response;

  }

  // cancelInterviews
  function cancelInterview(id) {
    const response = axios.delete(`/api/appointments/${id}`);
    return response;
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
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>

      <section className="schedule">{appointmentsList}</section>
    </main>
  );
}
