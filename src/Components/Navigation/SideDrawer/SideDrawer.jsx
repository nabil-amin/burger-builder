import React from "react";
import "./SideDrawer.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";

const SideDrawer = (props) => {
  return (
    <>
      <Backdrop show={props.open} clicked={props.closed} />
      {props.open ? (
        <div className="SideDrawer" onClick={props.closed}>
          <Logo height="11%" />
          <nav>
            <NavigationItems isAuthenticated={props.isAuth} />
          </nav>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
export default SideDrawer;
