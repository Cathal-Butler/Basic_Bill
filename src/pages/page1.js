import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Page1 extends Component {
  constructor(props) {
    super(props);
    this.state = { expense: "", income: "", date: "", datei: "" }; //track states of inputs

    //inform React of event functions
    this.onExpenseFormChange = this.onExpenseFormChange.bind(this);
    this.onInputFormChange = this.onInputFormChange.bind(this);
    this.onExpenseDateChange = this.onExpenseDateChange.bind(this);
    this.onIncomeDateChange = this.onIncomeDateChange.bind(this);
  } //end constructor

  onExpenseFormChange(event) {
    //assign the value of the number in the input box to expense
    this.setState({ expense: event.target.value });
  }

  onInputFormChange(event) {
    //assign the value of the number in the input box to income
    this.setState({ income: event.target.value });
  }

  onExpenseDateChange(event) {
    //assign the value of the date in the date input box to date
    this.setState({ date: event.target.value });
  }

  onIncomeDateChange(event) {
    this.setState({ datei: event.target.value });
  }

  render() {
    return (
      <div id="page1">
        <h1>Enter your data here: </h1>

        <Expense
          expense={this.state.expense} //Parent-Child Communication
          onFormChange={this.onExpenseFormChange}
          date={this.state.date}
          onDateChange={this.onExpenseDateChange}
        />

        <Income
          income={this.state.income} //Parent-child communication
          onForm2Change={this.onInputFormChange}
          datei={this.state.datei}
          onDateiChange={this.onIncomeDateChange}
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
    let date = this.props.date;
    let onDateChange = this.props.onDateChange;

    return (
      <div id="expense">
        <h2>Expense</h2>

        <form>
          <label>Amount: </label>
          <input
            type="number"
            placeholder="€"
            value={expense}
            onChange={onFormChange} //Calls this function when
          />
        </form>
        <form>
          <label>Input Date of Expense: </label>
          <input type="date" value={date} onChange={onDateChange} />
        </form>

        <p>
          The amount entered is: €{expense} on the [{date}]
        </p>
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
    let datei = this.props.datei;
    let onDateiChange = this.props.onDateiChange;

    return (
      <div>
        <h2>Income</h2>

        <form>
          <label>Amount: </label>
          <input
            type="number"
            placeholder="€"
            value={income}
            onChange={onForm2Change} //Calls this function when input changed
          />
        </form>
        <form>
          <label>Input Date of Income: </label>
          <input type="date" value={datei} onChange={onDateiChange}></input>
        </form>
        <p>
          The amount entered is: €{income} on the [{datei}]
        </p>
        <p>If this is correct, click the button below to submit your data: </p>
        <button> Submit Income </button>
      </div>
    );
  }
}

export default withRouter(Page1);
