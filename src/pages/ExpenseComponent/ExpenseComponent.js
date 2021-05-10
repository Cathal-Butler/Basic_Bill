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

  function stopSubmit() {
    //Users will only be allowed submit an expense or an income if:
    //1. The date is today or in the past
    //2. The date is not blank
    //3. The income is not blank
    // Returns true if any of them are not met
    const currentTime = moment();
    if (
      moment(date) > currentTime ||
      date === "" ||
      expense === "" ||
      expense <= parseInt("0", 2)
    )
      return true;
  }

  return (
    <div
      class="card-body"
      style={{ textAlign: "left", backgroundColor: "rgb(251 236 236)" }}
    >
      <h2>Expense</h2>

      <form>
        <label style={{ width: "10.5rem" }}>Amount: </label>
        <input
          id="expenseAmount"
          type="number"
          min="0"
          placeholder="€"
          value={expense}
          onChange={onFormChange}
        />
      </form>
      <form>
        <label style={{ width: "10.5rem" }}>Input Date of Expense: </label>
        <input
          id="expenseDate"
          type="date"
          value={date}
          onChange={onDateChange}
        />
      </form>

      <p>
        The amount entered is: €{expense} on the [
        {moment(date).format(`Do of MMMM YYYY`)}]
      </p>
      <p>If this is correct, click the button below to submit your data: </p>
      {stopSubmit() && (
        <button
          id="submitExpense"
          class="btn btn-secondary btn lg btn-block btn-danger"
          disabled
        >
          Submit Expense
        </button>
      )}

      {stopSubmit() && ( //Shows unless all 3 requirements are met
        <p>
          {" "}
          <b>
            {" "}
            Please ensure that you have entered an expense value and the date
            you have selected is in the past{" "}
          </b>{" "}
        </p>
      )}

      {!stopSubmit() && ( //when all conditions of stopSubmit are met, condition will be false so submission will be allowed
        <button
          id="submitExpense"
          onClick={() => {
            addExpense();
            addExpenseDate();
            submitAlert();
          }}
          class="btn btn-primary btn lg btn-block btn-danger"
        >
          {" "}
          Submit Expense{" "}
        </button>
      )}
    </div>
  );
};

export default expense;
