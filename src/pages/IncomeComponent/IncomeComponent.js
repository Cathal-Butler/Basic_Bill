import React from "react";
//Component for entering income
const income = (props) => {
  let income = props.income; //necessary for parent child communication
  let onForm2Change = props.onForm2Change; //necessary for parent child communication
  let datei = props.datei;
  let onDateiChange = props.onDateiChange;

  function submitAlert() {
    alert(
      "Hooray, you have submitted an income of €" + income + " on the " + datei
    );
  }
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
      <button onClick={submitAlert} class="btn btn-primary btn lg btn-block">
        {" "}
        Submit Income{" "}
      </button>
    </div>
  );
};
export default income;
