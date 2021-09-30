import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./Toolbar.css";
import DrawerToggle from "../SideDrawer/DrawerToggle";
import overview from "../Overview/Overview";
import addNewBill from "../AddNewBill/AddNewBill";
import allbills from "../Allbills/AllBills";
const toolbar = (props) => {
  return (
    <Router>
      <header className="toolbar">
        <nav className="toolbar_nav">
          <div className="toolbar_toggle-button">
            <DrawerToggle click={props.onDrawerClick} />
          </div>
          <div className="toolbar_logo">
            <Link to={"/"}>Bill Manager</Link>
          </div>
          <div className="spacer" />
          <div className="toolbar_items ">
            <ul>
              <li>
                <Link to={"/"}>Overview</Link>
              </li>
              <li>
                <Link to={"/addNewBill"}> Add New Bill</Link>
              </li>
              <li>
                <Link to={"/allBills"}> All Bills</Link>
              </li>
            </ul>
          </div>
        </nav>
        <Switch>
          <Route exact path="/" component={overview} />
          <Route path="/addNewBill" component={addNewBill} />
          <Route path="/allBills" component={allbills} />
        </Switch>
      </header>
    </Router>
  );
};

export default toolbar;
