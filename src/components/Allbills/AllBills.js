import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { categories } from "../Utils/contants";
import { Button, TableSortLabel } from "@material-ui/core";
import { useHistory } from "react-router";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";
import "./Allbills.css";
// import TextField from "@mui/material/TextField";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
import Dilogbox from "./Dilogbox";

var payLoad;
const Allbills = (props) => {
  // console.log("aaya", props.bill);
  const [Bills, setBills] = useState(props.bill);
  const [filtered, setfiltered] = useState([]);
  const [cat, setcat] = useState("All Categories");
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [editId, setEditId] = useState(false);
  const [budget, setBudget] = useState(false);
  const [amount, setAmount] = useState(false);
  const [num, setNum] = useState(false);
  const routeChange = () => {
    let path = `addNewBill`;
    history.push(path);
  };
  var totalAmount = 0;

  let categoryList = ["All Categories"];

  categories.map((val) => {
    categoryList.push(val.value);
  });
  useEffect(() => {
    let temp = [];
    let temp2 = [];
    props.bill.map((val) => {
      temp.push(val);
      temp2.push(parseInt(val.amount));
    });
    setfiltered(temp);
    setAmount(temp2);
  }, [props.bill]);

  let obj = {
    id: "",
    description: "",
    category: "",
    amount: "",
    date: "",
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (val) => {
    console.log("val", categories);
    let filterArr = [];
    if (val === "All Categories") {
      props.bill.map((item) => {
        console.log("item", item);
        obj = {
          id: item.id,
          description: item.description,
          category: item.category,
          amount: item.amount,
          date: item.date,
        };
        console.log("obj", obj);
        filterArr.push(obj);
        console.log("filterd", filtered);
      });
      setfiltered(filterArr);
    } else
      props.bill.map((item) => {
        if (val === item.category) {
          console.log("item", item);
          obj = {
            id: item.id,
            description: item.description,
            category: item.category,
            amount: item.amount,
            date: item.date,
          };
          console.log("obj", obj);
          filterArr.push(obj);
          console.log("filterd", filtered);
        }
      });
    setfiltered(filterArr);
  };
  const handleBudget = () => {
    let amt = [];
    amount.map((val) => {
      amt.push(val);
    });
    amt.sort();
    amt.reverse();
    console.log("amoutn", amt);
    let x = budget;
    console.log("x", x);
    let y = 0;
    let count = 0;
    amt.map((val) => {
      if (val + y <= x) {
        count++;
        y += val;
      }
    });
    setNum(count);
  };

  return (
    <div>
      <div className="table-container">
        <table>
          <tr>
            <td></td>
            <td>
              <Select
                label="Select Categories"
                options={categoryList}
                id="Categories"
                labelId="label-Categories"
                value={cat}
                onChange={(e) => {
                  console.log("e", e.target.value);
                  setcat(e.target.value);
                  handleChange(e.target.value);
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
            </td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th>Description</th>
            <th>Categories</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
          {filtered &&
            filtered.map((item, index) => (
              <tr key={item.id}>
                {Object.values(item).map((val, idx) => {
                  if (idx > 0) {
                    if (idx === 3) {
                      totalAmount += parseInt(val);
                    }
                    return <td>{val}</td>;
                  }
                })}
                <td>
                  <Button
                    onClick={() => {
                      setEditId(item);
                      // console.log("id", editId);
                      return handleClickOpen();
                    }}
                    style={{ margin: "2.5px" }}
                  >
                    Edit
                  </Button>
                  <Button
                    style={{ margin: "2.5px" }}
                    onClick={() => {
                      payLoad = item.id;
                      return props.delBill();
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}

          <tr>
            <td></td>
            <td>Total Amount:</td>
            <td>{totalAmount}</td>
            <td></td>
            <td>
              <Button onClick={routeChange}>Create New Bill</Button>
            </td>
          </tr>
        </table>
        <div style={{ margin: "20px" }}>
          <input
            style={{ width: "80%", height: "30px" }}
            // label="Monthly Budget"
            type="number"
            value={budget}
            placeholder="Monthly Budget"
            onChange={(e) => {
              setBudget(e.target.value);
            }}
          />
          <Button style={{ margin: "5px" }} onClick={handleBudget}>
            Add Budget
          </Button>
          <p> Minimum Bills to be paid:{num}</p>
        </div>
      </div>

      <Dilogbox
        Id={editId}
        open={open}
        handleopen={handleClickOpen}
        handleclose={handleClose}
      />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    bill: state.bills,
  };
};
const mapDispatchToProps = (dispatch) => {
  console.log("in Del");
  return {
    delBill: () =>
      dispatch({
        type: "DELBILL",
        payload: { payLoad },
      }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Allbills);
