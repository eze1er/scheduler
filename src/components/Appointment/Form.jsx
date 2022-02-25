import React, {useState} from "react";

import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
const [interviewer, setInterviewer] = useState(props.interviewer || null);
  
  // const reset = (props) => {
  //   setStudent("");
  // };
  return (
  <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off">
        <input
          className="appointment__create-input text--semi-bold"
          name="name"
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
        <Button danger onClick={props.onCancel}>Cancel</Button>
        <Button confirm onClick={props.onSave}>Save</Button>
      </section>
    </section>
  </main>
  )
}