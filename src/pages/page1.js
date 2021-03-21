import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Page1 extends Component {
  state = {
    showExpense: false, //For hiding/showing expense on button Click
    showIncome: false //For hiding/showing income on button click
  };

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
    //assign the value of the date in the expense date input box to date
    this.setState({ date: event.target.value });
  }

  onIncomeDateChange(event) {
    //assign the value of the date in the income date input box to date
    this.setState({ datei: event.target.value });
  }

  toggleExpenseHandler = () => {
    //Will toggle the expense from hide/shown when button is clicked
    const doesShowExpense = this.state.showExpense;
    this.setState({ showExpense: !doesShowExpense });
  };

  toggleIncomeHandler = () => {
    const doesShowIncome = this.state.showIncome;
    this.setState({ showIncome: !doesShowIncome });
  };

  render() {
    return (
      <div id="page1">
        <h1>Select Income or Expense: </h1>
        <button
          class="btn btn-secondary btn-lg btn-block"
          onClick={this.toggleExpenseHandler}
        >
          Expense
        </button>
        <button
          class="btn btn-secondary btn-lg btn-block"
          onClick={this.toggleIncomeHandler}
        >
          Income
        </button>

        {this.state.showExpense === true ? (
          //Wrap expense component in a div so it can be hidden or shown using the ternary operator, if true, show it, else :null (hide it)
          <div>
            <Expense
              expense={this.state.expense} //Parent-Child Communication
              onFormChange={this.onExpenseFormChange}
              date={this.state.date}
              onDateChange={this.onExpenseDateChange}
            />
          </div>
        ) : null}

        {this.state.showIncome === true ? (
          //Wrap income component in a div so it can be hidden or shown using the ternary operator.
          <div>
            <Income
              income={this.state.income} //Parent-child communication
              onForm2Change={this.onInputFormChange}
              datei={this.state.datei}
              onDateiChange={this.onIncomeDateChange}
            />
          </div>
        ) : null}
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
      <div class="card-body">
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

        <button class="btn btn-primary btn lg btn-block">
          {" "}
          Submit Expense{" "}
        </button>
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
      <div class="card body">
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
        <button class="btn btn-primary btn lg btn-block">
          {" "}
          Submit Income{" "}
        </button>
      </div>
    );
  }
}

export default withRouter(Page1);
