import React, { useEffect, useState } from "react";
import { Select } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import "react-datepicker/dist/react-datepicker.css";
// import "./AddNewBill.css";
import { categories } from "../Utils/contants";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

var payLoad;
const DilogBox = (props) => {
  let categoryList = [];
  var Id = props.Id;
  const [newBill, setNewBill] = useState({
    id: Id.id,
    description: Id.description,
    category: Id.category,
    amount: Id.amount,
    date: Id.date,
  });
  useEffect(() => {
    setNewBill(Id);
  }, [props.open]);
  //   setNewBill(Id);
  categories.map((val) => {
    categoryList.push(val.value);
  });
  const [startDate, setStartDate] = useState(Id.date);

  return (
    <Dialog open={props.open} onClose={props.handleclose}>
      <DialogTitle>Edit Bill</DialogTitle>
      <DialogContent>
        <div className="add-bill">
          <form className="form">
            <input
              style={{ width: "90%", height: "30px" }}
              type="text"
              placeholder={props.description}
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
              style={{ width: "90%", height: "30px" }}
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
            <div
              style={{ marginTop: "20px", marginBottom: "20px", width: "100%" }}
            >
              {/* <Select options={categories} placeholder="Category" /> */}
              <Select
                label="Select Categories"
                style={{ width: "40%", border: "1px solid black" }}
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
                  width: "40%",
                  marginLeft: "1vw",
                  border: "1px solid black",
                }}
                // label="Date"
                type="date"
                defaultValue={newBill.date}
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
          </form>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setNewBill(Id);
            return props.handleclose();
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            payLoad = newBill;
            props.editBill();
            return props.handleclose();
          }}
        >
          Save Bill
        </Button>
      </DialogActions>
    </Dialog>
  );
};
const mapStateToProps = (state) => {
  return {
    bill: state.bills,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    editBill: () =>
      dispatch({
        type: "EDITBILL",
        payload: { payLoad },
      }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DilogBox);
