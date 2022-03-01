import React, { Fragment } from "react";

import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";

////////////

const onAdd = function () {
  return "on";
};


export default function Appointment(props) {
  return (
    <article className="appointment">
      {props.time}
      {/* You need to add some props here to <Show /> */}
      {
        props.interview ? (
          <Show student={props.interview.student} interviewer={props.interviewers[props.interview.interviewer].name} />
        ) : (
          <Empty />
        )
      }
    </article>
  );
}

