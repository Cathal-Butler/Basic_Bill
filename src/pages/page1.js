import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Page1 extends Component {
  constructor(props) {
    super(props);
    this.state = { expense: "" }; //set expense amount inputted to be null
    this.state = { income: "" }; //set income amount inputted to be null
    //inform React of event function
    this.onExpenseFormChange = this.onExpenseFormChange.bind(this);
    this.onInputFormChange = this.onInputFormChange.bind(this);
  } //end constructor

  onExpenseFormChange(event) {
    //assign the value of the number in the input box to expense
    this.setState({ expense: event.target.value });
  }

  onInputFormChange(event) {
    //assign the value of the number in the input box to income
    this.setState({ income: event.target.value });
  }

  render() {
    return (
      <div id="page1">
        <h1>Enter your data here: </h1>

        <Expense
          expense={this.state.expense} //Parent-Child Communication
          onFormChange={this.onExpenseFormChange}
        />

        <Income
          income={this.state.income} //Parent-child communication
          onForm2Change={this.onInputFormChange}
        />
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
            onChange={onFormChange} //Calls this function when
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
    let income = this.props.income; //necessary for parent child communication
    let onForm2Change = this.props.onForm2Change; //necessary for parent child communication
    return (
      <div>
        <h2>Income</h2>
        <form>
          <label>Input Date of Income: </label>
          <input type="date"></input>
        </form>
        <form>
          <label>Amount: </label>
          <input
            type="number"
            placeholder="€"
            value={income}
            onChange={onForm2Change} //Calls this function when input changed
          />
        </form>
        <p>The amount entered is: €{income}</p>
        <p>If this is correct, click the button below to submit your data: </p>
        <button> Submit Income </button>
      </div>
    );
  }
}

export default withRouter(Page1);
