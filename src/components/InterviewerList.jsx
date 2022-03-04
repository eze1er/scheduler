import React from "react";
import PropTypes from 'prop-types'; 

import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss"

export default function InterviewerList(props) {
  const interviewers = props.interviewers.map((interviewer) => {

    InterviewerList.propTypes = {
      interviewers: PropTypes.array.isRequired
    };
    // console.log('setInter : ', setInterviewer)

    // const [inputValue, setInputValue] = React.useState("");

    const onChangeHandler = event => {
      console.log('hello');
    };

    return (
      <InterviewerListItem 
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        // onChange={setInterviewer}
        selected={interviewer.id === props.value}
        // setInterviewer={() => props.onChange(interviewer.id)}    
      />
    );
    
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers}
      </ul>
    </section>
  );
}

