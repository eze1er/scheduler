import React from "react";

// import "./DayListItem";
import DayListItem from "./DayListItem";

export default function DayList(props){
  const preparedDayData = function(day) {
    return Object.values(day);
}
  const preparedDay = preparedDayData(props.days);

 ///////////////// do I need this code above or not

  const dayListItems = preparedDay.map(day =>  <DayListItem
    key={day.id} 
    name={day.name} 
    spots={day.spots} 
    selected={day.name === props.value}
    setDay={props.onChange}
   />)
   /////////////////// day or props /////
  return(
    <ul>
      {dayListItems}
    </ul>
  )

}