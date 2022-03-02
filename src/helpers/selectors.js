
export function getAppointmentsForDay(state, day) {

    if (state.day) {
    const dayForAppointment = state.days.find((apDay) => apDay.name === day);

    if (dayForAppointment) {
      const appointmentsIds = dayForAppointment.appointments;
      const appointments = appointmentsIds.map((elem) => {
        return state.appointments[elem];
      })
      return appointments;
    } else {
      return [];
    }
    }

};

export function getInterviewersForDay(state, day) {
  // console.log('THIS STATE: ', state );
  const dayForInterviewers = state.days.find((apDay) => apDay.name === day);

  if (dayForInterviewers) {
    const interviewersIds = dayForInterviewers.interviewers;
    const interviewers = interviewersIds.map((elem) => {
      return state.interviewers[elem];
    })
    return interviewers;
  } else {
    return [];
  }
}  

export const getInterview = function(state, interview) {
  return (interview && { ...interview, interviewer: state.interviewers[interview.interviewer]})
    
} 
