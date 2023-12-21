import React from "react";
import "./NavigationItem.css";
import { Link, NavLink } from "react-router-dom";

const NavigationItem = (props) => {
  return (
    <li className="NavigationItem">
      <Link to={props.link}>{props.children}</Link>
    </li>
  );
};
export default NavigationItem;
