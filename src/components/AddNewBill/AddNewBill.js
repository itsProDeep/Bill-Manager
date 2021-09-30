import React, { Component, useEffect, useState } from "react";
import { Select } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./AddNewBill.css";
import { categories } from "../Utils/contants";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import MenuItem from "@material-ui/core/MenuItem";

var payLoad;

const AddNewBill = (props) => {
  let categoryList = [];

  categories.map((val) => {
    categoryList.push(val.value);
  });
  const [startDate, setStartDate] = useState(new Date());
  const [newBill, setNewBill] = useState({
    id: "",
    description: "",
    category: "",
    amount: "",
    date: startDate,
  });
  const history = useHistory();
  const routeChange = () => {
    let path = `allBills`;
    history.push(path);
  };

  return (
    <div className="add-bill">
      <form className="form">
        <input
          style={{ width: "41vw", height: "30px" }}
          type="text"
          placeholder="Description"
          value={newBill.description}
          onChange={(e) => {
            setNewBill({
              ...newBill,
              description: e.target.value,
            });
          }}
        />
        <br />
        <input
          style={{ width: "41vw", height: "30px" }}
          type="number"
          value={newBill.amount}
          placeholder="Amount"
          onChange={(e) => {
            setNewBill({
              ...newBill,
              amount: e.target.value,
            });
          }}
        />
        <div style={{ marginTop: "20px", marginBottom: "20px", width: "100%" }}>
          {/* <Select options={categories} placeholder="Category" /> */}
          <Select
            label="Select Categories"
            style={{ width: "20vw", border: "1px solid black" }}
            options={categoryList}
            id="Categories"
            labelId="label-Categories"
            value={newBill.category}
            onChange={(e) => {
              setNewBill({
                ...newBill,
                category: e.target.value,
              });
            }}
          >
            {categoryList.length > 0
              ? categoryList.map((val, index) => {
                  return (
                    <MenuItem value={val} key={index}>
                      {val}
                    </MenuItem>
                  );
                })
              : null}
          </Select>
          <TextField
            id="date"
            style={{
              width: "20vw",
              marginLeft: "1vw",
              border: "1px solid black",
            }}
            // label="Date"
            type="date"
            defaultValue="2017-05-24"
            InputLabelProps={{
              shrink: true,
            }}
            value={newBill.date}
            onChange={(e) => {
              setStartDate(e);
              return setNewBill({
                ...newBill,
                date: e.target.value,
              });
            }}
          />
        </div>
        {/* <DatePicker
          selected={startDate}
          onChange={(e) => {
            setStartDate(e);
            return setNewBill({
              ...newBill,
              date: e,
            });
          }}
        /> */}

        {/* <button onClick={save}>Save</button>
        <button onClick={clear}>Clear</button> */}
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Button onClick={routeChange}>Discard</Button>
          <Button
            onClick={() => {
              payLoad = newBill;
              props.addBill();
              return routeChange();
            }}
          >
            Create Bill
          </Button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    bill: state.bills,
  };
};
console.log("payload", payLoad);
const mapDispatchToProps = (dispatch) => {
  console.log("playLoad", { payLoad });
  return {
    addBill: () =>
      dispatch({
        type: "ADDBILL",
        payload: { payLoad },
      }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddNewBill);
