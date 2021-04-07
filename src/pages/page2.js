import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { userData } from "./data.js";

const data = userData;

function selectID(id) {
  return id.userID < 5;
}

class Page2 extends Component {
  render() {
    console.log(data[0]);

    return (
      <div className="App">
        <h1>Data Object (Map Function/Filter Function Test): </h1>
        <p>Test Paragraph </p>
        {data.filter(selectID).map((d) => (
          <div key={d.userID}>
            <li>
              <b>UserID: </b> {" " + d.userID + " "}
              <b> Name: </b> {" " + d.name + " "}
              <b> Expense: </b> {" " + d.expenses + " "}
              <b> Income: </b> {" " + d.income + " "}{" "}
            </li>
          </div>
        ))}
      </div>
    );
  }
}

export default withRouter(Page2);
