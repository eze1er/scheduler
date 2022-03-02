import React, { useEffect, useState } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "../components/DayList";
import Appointment from "../components/Appointment";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";

export default function useApplicationData() {
 

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const setDay = (day) => setState({ ...state, day });

  const interviewersForDay = getInterviewersForDay(state, state.day);

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

  const appointmentsList = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    console.log("Appointment ; ", appointment);
    console.log("Interview: ", interview);
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
        console.log("response: ", response);
        setState({
          ...state,
          appointments,
        });
      });
  }
  // cancelInterviews
  function cancelInterview(id) {
    const response = axios.delete(`/api/appointments/${id}`);
    console.log('Response:  ', response);
    return response;
  }
////////////////
//   const spotsRemaining = function(origin, days, day, appointments, spots){
//     for (const key in days) {
//       if (days.key = day) {
//         const spotsNumber = days.appointments.map(()) => days.appointments  {
//       }
//     }
//     if (origin === "cancel") {
//       spots--;
//     }
//     if (origin === "create") {
//       spots++;
//     }

//     return 
//   }
  return { state, setDay, bookInterview, cancelInterview };
}

// module.exports = {state, setDay, bookInterview, cancelInterview, appointmentsList}
