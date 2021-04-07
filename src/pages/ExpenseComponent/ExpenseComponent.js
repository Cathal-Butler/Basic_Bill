import React from "react";
//Component for entering expense

const expense = (props) => {
  let expense = props.expense; //necessary for parent-child communication
  let onFormChange = props.onFormChange; //necessary for parent child communication
  let date = props.date;
  let onDateChange = props.onDateChange;

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

      <button class="btn btn-primary btn lg btn-block"> Submit Expense </button>
    </div>
  );
};

export default expense;
