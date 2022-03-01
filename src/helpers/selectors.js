function getAppointmentsForDay(state, day) {

  // const appointments = [];
  const obj = {
    id: '',
    time: '',
    interview: ''
  };

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

const getInterview = function(state, interview) {
  for (const key in state) {
}
} 

module.exports = {getAppointmentsForDay, getInterview};