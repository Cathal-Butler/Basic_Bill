import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Inputteddata extends React.Component {
  // Component gives users a summary of the data they just inputted
  render() {
    return (
      <div>
        <p>
          Will show confirmation of the inputted data once the submit button is
          clicked
        </p>
      </div>
    );
  }
}

class Page1 extends Component {
  render() {
    return (
      <div id="page1">
        <h1>Enter your data here: </h1>
        <div id="expense">
          <h2>Expense </h2>
          <form>
            <label>Input Date of Expense: </label>
            <input id="expensedate" type="date"></input>
          </form>
          <label>Amount: </label>
          <input id="expenseamount" type="number" placeholder="€" />
          <button id="submitexpense"> Submit Expense </button>
        </div>

        <div id="income">
          <h2>Income</h2>
          <form>
            <label>Input Date of Income: </label>
            <input id="incomedate" type="date"></input>
          </form>
          <label>Amount: </label>
          <input id="incomeamount" type="number" placeholder="€" />
          <button id="submitincome"> Submit Income </button>
        </div>

        <Inputteddata />
      </div> //end of page1 div
    );
  }
}

export default withRouter(Page1);
