import React, { useEffect, useState } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import InterviewerListItem from "./InterviewerListItem";
import InterviewerList from "./InterviewerList";
import Appointment from "./Appointment";
import { action } from "@storybook/addon-actions/dist/preview";

const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      appointment:{
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      appointment:{
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
  }
];





export default function Application() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });

  const setDays = (days) => {
    //... your code here ...
    setState({ ...state, days })

  }

  useEffect(() => {
    // const apiDay = `https://itunes.apple.com/search?term=beatles&country=CA&media=music&entity=album&attribute=artistTerm`;
    console.log('useEffect on!');
    axios.get("/api/days")
      .then(response => {
        setDays(response.data)
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  const appointmentsList = appointments.map((appointment) => {
    
    return (
      <Appointment 
        key={appointment.id}
        interviewers={interviewers}
        {...appointment}
      />
    );
    });

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
      <DayList
        days={state.days}
        day={state.day}
        setDay={setState}
/>

      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      
      </section>
      <section className="schedule">
       {appointmentsList }

      </section>

    </main>
  );
}

