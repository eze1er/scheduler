
import React from "react";

import { render, cleanup } from "@testing-library/react";

import Appointment from "components/Appointment";
import { time } from "eslint/lib/util/timing";



afterEach(cleanup);

describe("Appointment", () => {
  // this data is the props for appointment component
  const appointmentData = {
    time: "12pm",
    interview: { 
      interviewer: {id: 10, name: 'Samantha Stanic', avatar: 'https://i.imgur.com/okB9WKC.jpg'},
      student: "Ezechiel"},
    interviewers: [{id: 3, name: 'Mildred Nazir', avatar: 'https://i.imgur.com/T2WwVfS.png'}]
  }
  it("renders without crashing", () => {
    // render(<Appointment time={appointmentData.time} interview={appointmentData.interview} interviewers={appointmentData.interviewers}/>); or below
    render(<Appointment { ...appointmentData}/>);
  });
});