import React from "react";
import moment from "moment"; //Readable date

const expense = (props) => {
  let expense = props.expense;
  let onFormChange = props.onFormChange;
  let date = props.date;
  let onDateChange = props.onDateChange;
  let addExpense = props.addExpense;
  let addExpenseDate = props.addExpenseDate;
  let currentUserEmail = props.currentUser.email;

  function submitAlert() {
    //Confirmation message when a user submits an expense
    alert(
      "Good work " +
        currentUserEmail +
        ", you have submitted an expense of €" +
        expense +
        " on the " +
        moment(date).format(`Do of MMMM YYYY`)
    );
  }

  function stopSubmit() {
    //Validation function
    //Users will only be allowed submit an expense or an income if:
    //1. The date is today or in the past
    //2. The date is not blank
    //3. The expense is not blank
    //4. The expense is not a negative value
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

      {stopSubmit() && ( //Let's user know why they are not meeting the validation requirements
        <p>
          {" "}
          <b>
            {" "}
            Please ensure that you have entered an expense value and the date
            you have selected is in the past{" "}
          </b>{" "}
        </p>
      )}

      {!stopSubmit() && ( //When valid data is entered, button is enabled
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
