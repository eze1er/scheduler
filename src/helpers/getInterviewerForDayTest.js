const { getInterviewersForDay, getAppointmentsForDay } = require("./selectors")

const interviews = {
  1: {
    id: 1,
    time: "12pm",
    interview: {
    student: "Archie Cohen",
    interviewer: 3
    }
    },
    2: {
    id: 2,
    time: "1pm",
    interview: {
    student: "Chad Takahashi",
    interviewer: 3
    }
    },
    3: {
    id: 3,
    time: "2pm",
    interview: null
    },
    4: {
    id: 4,
    time: "3pm",
    interview: null
    }
};

const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3]
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5]
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": { id: 2, time: "1pm", interview: null },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "4": { id: 4, time: "3pm", interview: null },
    "5": {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 }
    }
  }
};

getInterviewersForDay(state, interviews)


test("getInterviewersForDay return a array", () => {
  const result = getInterviewersForDay(state, "3");
  expected(Array.isArray(result)).toBe(true);
});

// test("getInterviewersForDay returns an array with a length matching the number of interviews for that day", () => {
//   const result = getInterviewersForDay(state, "Monday");
//   expect(result.length).toEqual(4);
// });

// test("getInterviewersForDay returns an array containing the correct interviewer objects", () => {
//   const [first, second] = getInterviewersForDay(state, "Tuesday");
//   expect(first).toEqual(state.appointments["4"].interviewers);
//   expect(second).toEqual(state.appointments["5"].interviewers);
// });

// test("getInterviewersForDay returns an empty array when the days data is empty", () => {
//   const result = getInterviewersForDay({ days: [] }, "Monday");
//   expect(result.length).toEqual(0);
// });

// test("getInterviewersForDay returns an empty array when the day is not found", () => {
//   const result = getInterviewersForDay(state, "Wednesday");
//   expect(result.length).toEqual(0);
// });
/////////////////////
// function save(name, interviewer) {
//   const interview = {
//     student:name,
//     interviewer
//   };
//   TransitionEvent(SAVE);
//   props.bookInterview(props.id, interview)
//   .then(() => TransitionEvent(SHOW))
//   .catch(() => {TransitionEvent(ERROR_SAVE)});
// }

// function deleteInterview() {
//   transition(DELETE);
//   props.cancelInterview(props.id)
//   .then(() => TransitionEvent(EMPTY))
//   .catch(() => {TransitionEvent(ERROR_DELETE)});
// }