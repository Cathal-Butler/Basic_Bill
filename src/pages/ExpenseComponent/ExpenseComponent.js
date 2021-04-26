import React from "react";
import moment from "moment"; //Moment dependency added to allow date be viewed in more User Friendly Way
//Component for entering expense

const expense = (props) => {
  let expense = props.expense; //necessary for parent-child communication
  let onFormChange = props.onFormChange; //necessary for parent child communication
  let date = props.date;
  let onDateChange = props.onDateChange;
  let addExpense = props.addExpense;
  let addExpenseDate = props.addExpenseDate;
  let currentUserEmail = props.currentUser.email;

  function submitAlert() {
    alert(
      "Good work " +
        currentUserEmail +
        ", you have submitted an expense of €" +
        expense +
        " on the " +
        moment(date).format(`Do of MMMM YYYY`) //Human readable format
    );
  }

  return (
    <div class="card-body">
      <h2>Expense</h2>

      <form>
        <label>Amount: </label>
        <input
          type="number"
          placeholder="€"
          value={expense}
          onChange={onFormChange}
        />
      </form>
      <form>
        <label>Input Date of Expense: </label>
        <input type="date" value={date} onChange={onDateChange} />
      </form>

      <p>
        The amount entered is: €{expense} on the [
        {moment(date).format(`Do of MMMM YYYY`)}]
      </p>
      <p>If this is correct, click the button below to submit your data: </p>

      <button
        onClick={() => {
          addExpense();
          addExpenseDate();
          submitAlert();
        }}
        class="btn btn-primary btn lg btn-block"
      >
        {" "}
        Submit Expense{" "}
      </button>
    </div>
  );
};

export default expense;
