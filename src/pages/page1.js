import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Expense from "./ExpenseComponent/ExpenseComponent";
import Income from "./IncomeComponent/IncomeComponent";

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
        <h1>Peter, would you like to enter your Expense or Income? </h1>
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

export default withRouter(Page1);
