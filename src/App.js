import React, { Component, useState } from "react";
import Toolbar from "./components/Toolbar/Toolbar";
import SideDrawer from "./components/SideDrawer/SideDrawer";
import Backdrop from "./components/Backdrop/Backdrop";
function App() {
  const [sideDraweropen, setSideDrawerOpen] = useState(false);
  const handleDrawerToggle = () => {
    setSideDrawerOpen(() => {
      return !sideDraweropen;
    });
  };
  const handleBackdrop = () => {
    setSideDrawerOpen(false);
  };

  let backdrop;
  if (sideDraweropen) {
    backdrop = <Backdrop click={handleBackdrop} />;
  }
  return (
    <div style={{ height: "100%" }}>
      <Toolbar onDrawerClick={handleDrawerToggle} />
      <SideDrawer show={sideDraweropen} />
      {backdrop}
    </div>
  );
}

export default App;
