import React from "react";

import "components/DayListItem.scss";
import classNames from "classnames";



export default function DayListItem(props) {

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected ": props.selected,
    "day-list__item--full ": !props.spots
  });

  const formatSpots = (props) => {
    return props.spots === 0 ? 'no spots remaining'
    : props.spots === 1 ? '1 spot remaining'
    : props.spots === 2 ? '2 spots remaining' 
    : `${props.spots} spots remaining`;
  };
  const value = formatSpots(props);

  return (
    <li className={dayClass}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{value}</h3>
    </li>
  );
}

//where I supposed to display the action? by console log?