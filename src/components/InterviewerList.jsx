import React from "react";
import PropTypes from "prop-types";

import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  const interviewers = props.interviewers.map((interviewer) => {
    InterviewerList.propTypes = {
      interviewers: PropTypes.array.isRequired,
    };

    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={props.value ? interviewer.id === props.value.id : false}
        setInterviewer={() => props.onChange(interviewer)}
      />
    );
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
}
