import React, { Fragment, useState } from "react";

import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Empty from "components/Appointment/Empty";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import useVisualMode from "hooks/useVisualMode";

////////////
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVE";
const EDIT = "EDIT";
const CONFIRM = "CONFIRM";
const DELETE = "DELETE";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

const onAdd = function () {
  return "on";
};

export default function Appointment(props) {
  const { time, interview, interviewersForDay } = props;

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  // save function
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);
    console.log("this the save function props: ", props);

    props
      .bookInterview(props.id, interview)
      .then(() => {
        console.log('bookInterview.then: ')
        transition(SHOW)
      })
      .catch((error) => {
        console.log('bookInterview.catch: ')
        transition(ERROR_SAVE, true)
      });

  }

  function deleteInterview() {
    transition(DELETE);
    props
      .cancelInterview(props.id)
      .then(() => transition("EMPTY"))
      .catch(() => transition("ERROR_DELETE"));
  }

  function editInterview() {
    // const studentSave = props.interview.student;
    // const interviewerSave = interview.interviewer;
    console.log("props1: ", props);
    // console.log('props2: ', ...ProgressEvent.pros)
    transition(EDIT);
  }

  function onClose() {
    transition(SHOW, true);

  }
  return (
    <article className="appointment">
      <Header time={time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={interview.interviewer}
          onDelete={() => transition("CONFIRM")}
          onEdit={() => transition("EDIT")}
        />
      )}
      {mode === EDIT && (
        <Show
          student={props.interview.student}
          interviewer={interview.interviewer}
          onDelete={() => transition("CONFIRM")}
          onEdit={() => transition("EDIT")}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={interviewersForDay} onCancel={back} onSave={save} />
      )}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETE && <Status message={"Deleting"} />}
      {mode === CONFIRM && (
        <Confirm
          onDelete={deleteInterview}
          onCancel={back}
          message={"Deleting"}
        />
      )}
 
      {mode === ERROR_DELETE && <Error onClose={onClose} message={"Error: could not delete"} />}
      {mode === ERROR_SAVE && <Error onClose={() => {transition("EMPTY")}} message={"Error: could not save"} />}
    </article>
  );
}
