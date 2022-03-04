// hooks for scheduler application
import { useEffect, useState } from "react";
import axios from "axios";

import "components/Application.scss";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

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

  // when appointment is booking we need to use this function for
  // set appointment end modify the spots remaining

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    // is the check for a new appointment or an update
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

  // function for cancelInterviews
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
    return axios.delete(`/api/appointments/${id}`).then((response) => {
      setState({
        ...state,
        appointments,
      });
    });
  }
  // function for count spotsRemaining. I should refactor it when I have time
  const spotsRemaining = function (origin, id, days) {
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
    return;
  };
  return { state, setDay, bookInterview, cancelInterview };
}
