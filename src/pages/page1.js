import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Page1 extends Component {
  constructor(props) {
    super(props);
    this.state = { expense: 0 }; //set expense amount inputted to be 0
    //inform React of event function
    this.onSearchFormChange = this.onSearchFormChange.bind(this);
  } //end constructor

  onSearchFormChange(event) {
    //assign the value of the number in the input box to expense
    this.setState({ expense: event.target.value });
  }

  render() {
    return (
      <div id="page1">
        <h1>Enter your data here: </h1>

        <Expense
          expense={this.state.expense}
          onFormChange={this.onSearchFormChange}
        />

        <Income />
      </div> //end of page1 div
    );
  }
}

//Component for entering expense
class Expense extends Component {
  render() {
    let expense = this.props.expense; //necessary for parent-child communication
    let onFormChange = this.props.onFormChange; //necessary for parent child communication

    return (
      <div id="expense">
        <h2>Expense</h2>
        <form>
          <label>Input Date of Expense: </label>
          <input type="date"></input>
        </form>

        <form>
          <label>Amount: </label>
          <input
            type="number"
            placeholder="€"
            value={expense}
            onChange={onFormChange}
          />
        </form>
        <p>The amount entered is: €{expense}</p>
        <p>If this is correct, click the button below to submit your data: </p>

        <button> Submit Expense </button>
      </div>
    );
  }
}

//Component for entering income
class Income extends Component {
  render() {
    return (
      <div id="income">
        <h2>Income</h2>
        <form>
          <label>Input Date of Income: </label>
          <input type="date"></input>
        </form>
        <form>
          <label>Amount: </label>
          <input type="number" placeholder="€" />
          <button> Submit Income </button>
        </form>
      </div>
    );
  }
}

export default withRouter(Page1);
