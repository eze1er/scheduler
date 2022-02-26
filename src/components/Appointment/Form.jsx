import React, {useState} from "react";

import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
// reset function when Oncancel is on
  const reset = (props) => {
    setStudent("");
    setInterviewer("");
  };

  return (
  <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off" onSubmit={event => event.preventDefault()}>
        <input
          className="appointment__create-input text--semi-bold"
          name={student}
          type="text"
          placeholder="Enter Student Name"
          onClick={(event) => setStudent(event.target.value)} />
      </form>

      <InterviewerList 
        onChange={props.setInterviewer}
        interviewers={props.interviewers}
        value={props.interviewer}
      />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={reset}>Cancel</Button>
        <Button confirm onClick={props.onSave}>Save</Button>
      </section>
    </section>
  </main>
  )
}