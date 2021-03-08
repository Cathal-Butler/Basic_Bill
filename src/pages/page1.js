import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Page1 extends Component {
  render() {
    return (
      <div id="page1">
        <h1>Enter your data here: </h1>
        <Income />
        <Expense />
      </div> //end of page1 div
    );
  }
}

class Expense extends Component {
  render() {
    return (
      <div>
        <h2>Expense </h2>
        <form>
          <label>Input Date of Expense: </label>
          <input id="expensedate" type="date"></input>
        </form>
        <label>Amount: </label>
        <input id="expenseamount" type="number" placeholder="€" />
        <button id="submitexpense"> Submit Expense </button>
      </div>
    );
  }
}

class Income extends Component {
  render() {
    return (
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
    );
  }
}

export default withRouter(Page1);
