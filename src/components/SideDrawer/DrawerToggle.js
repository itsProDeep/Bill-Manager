import React from "react";
import "./DrawerToggle.css";
const drawerToggleButton = (props) => {
  return (
    <button className="toggle-button" onClick={props.click}>
      <div className="button-line"></div>
      <div className="button-line"></div>
      <div className="button-line"></div>
    </button>
  );
};
export default drawerToggleButton;
