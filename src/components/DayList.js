import React from "react";

// import "./DayListItem";
import DayListItem from "./DayListItem";

export default function DayList(props){
  const preparedDayData = function(day) {
    return Object.values(day);
}
  const preparedDay = preparedDayData(props);
  
  const parsedDay = preparedDay.map(day => <DayListItem key={day.DayList} {...day} />)
  return(
    <ul>
      <DayListItem 
        key={props.days[0].id}
        name={props.days[0].name} 
        spots={props.days[0].spots} 
        selected={props.days[0].name === props.day}
        setDay={props.setDay}  
      />
      <DayListItem
        key={props.days[1].id} 
        name={props.days[1].name} 
        spots={props.days[1].spots} 
        selected={props.days[1].name === props.day}
        setDay={props.setDay}  
      />
      <DayListItem 
        key={props.days[2].id}
        name={props.days[2].name}
        spots={props.days[2].spots} 
        selected={props.days[2].name === props.day}
        setDay={props.setDay}  
      />   
    </ul>
  )

}