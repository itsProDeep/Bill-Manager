import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { connect } from "react-redux";

const Overview = (props) => {
  const [amt, setAmt] = useState([]);
  // console.log(props.bill[0].date);
  useEffect(() => {
    var amount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    props.bill.map((val, idx) => {
      var month = val.date.slice(5, 7);
      amount[month - 1] += parseInt(val.amount);
    });
    setAmt(amount);
  }, [props.bill]);

  const state = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Amount",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: amt,
      },
    ],
  };
  return (
    <div>
      <div
        style={{
          margin: "20px",
          height: "50vh",
          width: "50vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Line
          data={state}
          options={{
            title: {
              display: true,
              text: "Average bill per month",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "right",
            },
          }}
        />
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    bill: state.bills,
  };
};
export default connect(mapStateToProps)(Overview);
