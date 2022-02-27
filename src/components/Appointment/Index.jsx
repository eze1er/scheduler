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


export default function Appointment(props) {
  console.log('the props: ', props);
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

