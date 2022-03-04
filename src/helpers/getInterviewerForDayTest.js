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
