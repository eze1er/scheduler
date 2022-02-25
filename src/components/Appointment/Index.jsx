import React from "react";

import "components/Appointment/styles.scss";

export default function Appointment(props) {

  return (
    <article className="appointment">
      {props.time ? <h3>Appointment at {props.time}</h3> : <h3>No Appointments</h3>}
      
    </article>
    
  
  )

}