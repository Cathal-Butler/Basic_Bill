import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { userData } from "./data.js";

const data = userData;

class Page2 extends Component {
  render() {
    return (
      <div>
        {data.map((data) => {
          return (
            <div>
              <li>
                <b>UserID: </b> {" " + data.userID + " "}
                <b> Name: </b> {" " + data.name + " "}
                <b> Expense: </b> {" " + data.expenses + " "}
                <b> Income: </b> {" " + data.income + " "}{" "}
              </li>
            </div>
          );
        })}
      </div>
    );
  }
}

export default withRouter(Page2);
