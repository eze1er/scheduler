import React, {useState} from "react";

import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  console.log('PROPSin the FORM', props)
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
// reset function when Oncancel is on
  const reset = () => {
    setStudent("");
    setInterviewer("");
    // props.onCancel();
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
          onChange={(event) => setStudent(event.target.value)} />
      </form>

      <InterviewerList 
        onChange={setInterviewer}
        interviewers={props.interviewers}
        value={interviewer}
      />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={reset}>Cancel</Button>
        <Button confirm onClick={() => props.onSave(student, interviewer)}>Save</Button>
      </section>
    </section>
  </main>
  )
}