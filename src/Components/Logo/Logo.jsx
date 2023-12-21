import React from "react";
import burgerLogo from "../../assets/Images/27.1 burger-logo.png.png";
import "./Logo.css";

const Logo = (props) => {
  return (
    <div className="Logo" style={{ height: props.height }}>
      <img src={burgerLogo} alt="MyBurger" />
    </div>
  );
};
export default Logo;
