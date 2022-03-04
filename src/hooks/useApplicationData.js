// import React, { useEffect, useState } from "react";
import  { useEffect, useState } from "react";
import axios from "axios";

import "components/Application.scss";
// import Appointment from "../components/Appointment";
// import {
//   // getAppointmentsForDay,
//   // getInterview,
//   // getInterviewersForDay,
// } from "helpers/selectors";

export default function useApplicationData() {
 

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  // const dailyAppointments = getAppointmentsForDay(state, state.day);
  const setDay = (day) => setState({ ...state, day });

  // const interviewersForDay = getInterviewersForDay(state, state.day);

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

  // const appointmentsList = dailyAppointments.map((appointment) => {
  //   const interview = getInterview(state, appointment.interview);
  //   return (
  //     <Appointment
  //       key={appointment.id}
  //       id={appointment.id}
  //       time={appointment.time}
  //       interview={interview}
  //       interviewersForDay={interviewersForDay}
  //       bookInterview={bookInterview}
  //       cancelInterview={cancelInterview}
  //     />
  //   );
  // });
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

    if (state.appointments[id].interview) {
      spotsRemaining("modify", id, state.days);
    } else {
    spotsRemaining("create", id, state.days);
    }


    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then((response) => {
        setState({
          ...state,
          appointments,
        });
      });
  }
  // cancelInterviews
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    spotsRemaining("cancel", id, state.days);
    return axios.delete(`/api/appointments/${id}`)
      .then((response) => {
      setState({
        ...state,
        appointments,
      });
    });
  }

  const spotsRemaining = function(origin, id,  days){
    for (const day of days) {
      const findAppointment = day.appointments.includes(id);
      if (findAppointment) {
        if (origin === "cancel") {
          day.spots++;
        } 
        if (origin === "create") {
          day.spots--;
        }
      }
    }
    return 
  }
  return { state, setDay, bookInterview, cancelInterview };
}

// module.exports = {state, setDay, bookInterview, cancelInterview, appointmentsList}
