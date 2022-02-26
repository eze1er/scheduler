function getAppointmentsForDay(state, day) {

  // const appointments = [];
  const obj = {
    id: '',
    time: '',
    interview: ''
  };

    const dayForAppointment = state.days.find((apDay) => apDay.name === day);
    console.log('dayForAppointment:  ', dayForAppointment);

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

module.exports = {getAppointmentsForDay};