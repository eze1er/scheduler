import React, { Fragment } from "react";

import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";

////////////

const onAdd = function () {
  console.log("here we need to implement onAdd");
  return "on";
};
const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];

export default function Appointment(props) {

  return (
    <article className="appointment">
      {props.time}
      {/* You need to add some props here to <Show /> */}
      {
        props.interview ? (
          <Show student={props.interview.student} interviewer={props.interview.appointment.name} />
        ) : (
          <Empty />
        )
      }
    </article>
  );
}

