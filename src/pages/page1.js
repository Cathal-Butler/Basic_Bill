import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Expense from "./ExpenseComponent/ExpenseComponent";
import Income from "./IncomeComponent/IncomeComponent";
import myFirebase from "/src/myFirebaseConfig";
import Firebase from "firebase";
import { timers } from "jquery";

class Page1 extends Component {
  state = {
    showExpense: false, //For hiding/showing expense on button Click
    showIncome: false //For hiding/showing income on button click
  };

  constructor(props) {
    super(props);
    this.state = {
      expense: "",
      income: "",
      date: "",
      datei: "",
      dbData: [],
      authenticated: false,
      currentUser: null
    }; //track states of inputs

    //inform React of event functions
    this.onExpenseFormChange = this.onExpenseFormChange.bind(this);
    this.onInputFormChange = this.onInputFormChange.bind(this);
    this.onExpenseDateChange = this.onExpenseDateChange.bind(this);
    this.onIncomeDateChange = this.onIncomeDateChange.bind(this);
    this.getMessagesFromDatabase = this.getMessagesFromDatabase.bind(this);
    this.addExpense = this.addExpense.bind(this);
    this.addExpenseDate = this.addExpenseDate.bind(this);
    this.addIncome = this.addIncome.bind(this);
    this.addIncomeDate = this.addIncomeDate.bind(this);
  } //end constructor

  componentDidMount() {
    Firebase.auth().onAuthStateChanged((user) => {
      user
        ? this.setState(() => ({
            authenticated: true,
            currentUser: user
          }))
        : this.setState(() => ({
            authenticated: false,
            currentUser: null
          }));
    });
    // as soon as the component mounts, get the most recent messages from the firebase database.

    this.getMessagesFromDatabase();
  }
  //Alot of the code below is from firebase which handles the data
  getMessagesFromDatabase() {
    let user = Firebase.auth().currentUser; //For users to access their own specific data
    let uid = user.uid; //Grabs the automatically generated firebase authenticated user ID
    let ref = Firebase.database().ref("userData").child(uid); //CHANGE**.child(uid) is added so users access their own data only

    ref.on("value", (snapshot) => {
      // json array
      let msgData = snapshot.val();
      let newMessagesFromDB = [];
      for (let m in msgData) {
        // create a JSON object version of our object. If the JSON data format changes in the database, this code will need to change
        let currObject = {
          objectID: msgData[m].objectID,
          details: {
            expenses: msgData[m].details.expenses,
            expensesDate: msgData[m].details.expensesDate,
            income: msgData[m].details.income,
            incomeDate: msgData[m].details.incomeDate,
            invoiceAmount: msgData[m].details.invoiceAmount,
            invoiceDue: msgData[m].details.invoiceDue
          }
        };
        // add it to our newStateMessages array.
        newMessagesFromDB.push(currObject);
      } // end for loop
      // set state
      this.setState({ dbData: newMessagesFromDB });
    }); // end of the on method
  } // end of getMessagesFromDatabase()

  addExpense() {
    console.log("expense added");
    let user = Firebase.auth().currentUser;
    let uid = user.uid;
    let localMessages = this.state.dbData;
    localMessages[0].details.expenses.push(this.state.expense);
    Firebase.database().ref("/userData").child(uid).set(localMessages);
    this.setState({ dbData: localMessages });
  }
  //DELETE ACTIVITY

  addExpenseDate() {
    console.log("expense date added");
    let user = Firebase.auth().currentUser;
    let uid = user.uid;
    let localMessages = this.state.dbData;
    localMessages[0].details.expensesDate.push(this.state.date);
    Firebase.database().ref("/userData").child(uid).set(localMessages);
    this.setState({ dbData: localMessages });
  }

  addIncome() {
    console.log("income added");
    let user = Firebase.auth().currentUser;
    let uid = user.uid;
    let localMessages = this.state.dbData;
    localMessages[0].details.income.push(this.state.income);
    Firebase.database().ref("/userData").child(uid).set(localMessages);
    this.setState({ dbData: localMessages });
  }

  addIncomeDate() {
    console.log("income date added");
    let user = Firebase.auth().currentUser;
    let uid = user.uid;
    let localMessages = this.state.dbData;
    localMessages[0].details.incomeDate.push(this.state.datei);
    Firebase.database().ref("userData").child(uid).set(localMessages);
    this.setState({ dbData: localMessages });
  }

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
        <br />
        <img
          id="piggy"
          src="https://i.pinimg.com/originals/81/d2/00/81d200d48f6d13e1c132ecf37b7606b1.gif"
          alt="logo"
        />{" "}
        <br /> <br />
        {this.state.currentUser !== null && (
          <h4 class="text-white">
            Hello{" "}
            <i>
              <b>{this.state.currentUser.email}</b>
            </i>
            , please enter your expense or income below:{" "}
          </h4>
        )}
        <br />
        <button
          class="btn btn-secondary btn-lg btn-block btn-danger"
          onClick={this.toggleExpenseHandler}
        >
          Expense
        </button>
        <br />
        <button
          class="btn btn-secondary btn-lg btn-block btn-success"
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
              addExpense={this.addExpense}
              addExpenseDate={this.addExpenseDate}
              currentUser={this.state.currentUser}
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
              addIncome={this.addIncome}
              addIncomeDate={this.addIncomeDate}
              currentUser={this.state.currentUser}
            />
          </div>
        ) : null}
      </div> //end of page1 div
    );
  }
}

export default withRouter(Page1);
