import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { userData } from "./data.js";

const data = userData;
function flexibleSelectID(id) {
  return function (userObject) {
    return userObject.userID === id;
  };
}

class Page2 extends Component {
  render() {
    console.log(data);

    return (
      <div className="App">
        <h1>Data Object (Map Function/Filter Function Test): </h1>
        <p>Test Paragraph </p>
        {data.filter(flexibleSelectID(9)).map((d) => (
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
