import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./page3.css";
import $ from "jquery";
//import {Table} from "bootstrap";
import yesBtn from "./img/yesBtn.png";
//import noBtn from "./img/noBtn.png";

let i = 0; //I

class Page3 extends Component {
  constructor(props) {
    super(props);
    this.add = this.add.bind(this);
    this.delete = this.delete.bind(this);
    this.edit = this.edit.bind(this);
    this.state = {
      lists: [],
      income: 1000,
      expense: 0,
      balance: 1000,
      ignore: false
    };
  }

  add() {
    let input = parseInt(this.state.income, 10);
    let output = parseInt(this.state.expense, 10);
    //let balance = parseInt( this.state.balance,10);

    let list = this.state.lists;
    let info = parseInt($("#addValue").val(), 10);
    let date = parseInt($("#addDate").val(), 10);
    let newExpense = output + info;
    list.push({ id: ++i, value: info, date: date }); //是++I
    this.setState({ lists: list });
    let newBalance = input - newExpense;
    if (newBalance >= 0) {
      this.setState({ expense: newExpense });
      this.setState({ balance: newBalance });
    } else {
      $("#messageBox").show();
      this.setState({ expense: newExpense });
      this.setState({ balance: newBalance });
    }
  }
  edit(e) {
    // let input = this.state.income;
    // let output = this.state.expense;
    // let balance = this.state.balance;
    $("#editBox").show();
    const index = e.target.getAttribute("data-index");
    let oldInvoice = parseInt(
      $("#" + index)
        .children()
        .eq(0)
        .text(),
      10
    );
    $("#editValue").val(oldInvoice);
    $("#editDate").val(
      $("#" + index)
        .children()
        .eq(1)
        .text()
    );
    const check = this.checking.bind(this);
    //console.log($("#" + index).children().eq(1).text());
    //off click:把之前绑定的click全部off，再绑定新的，这样保证绑定最新的，不然在点相当于绑定两个事件
    //动态绑定事件
    $("#submitBtn")
      .off("click")
      .click(function () {
        let info = parseInt($("#editValue").val(), 10);
        let date = parseInt($("#editDate").val(), 10);
        $("#" + index)
          .children()
          .eq(0)
          .text(info);
        $("#" + index)
          .children()
          .eq(1)
          .text(date);
        check(info, oldInvoice);
        $("#editBox").hide();
      });
  }

  //计算expense和balance判断要不要跳出warning
  checking(info, oldInvoice) {
    let input = parseInt(this.state.income, 10);
    let output = parseInt(this.state.expense, 10);
    //let balance = this.state.balance;
    let newExpense = info + output - oldInvoice;
    let newBalance = input - newExpense;
    this.setState({ expense: newExpense });
    this.setState({ balance: newBalance });
    if (newBalance < 0) {
      $("#messageBox").show();
    }
  }

  delete(e) {
    let input = parseInt(this.state.income, 10);
    let output = parseInt(this.state.expense, 10);
    let balance = parseInt(this.state.balance, 10);
    const index = e.target.getAttribute("data-index");
    //date:list 对应的index的 date
    const list = this.state.lists;
    let deleteValue = parseInt(
      $("#" + index)
        .children()
        .eq(0)
        .text(),
      10
    );
    $("#" + index).remove();
    this.setState({ lists: list });
    let newExpense = output - deleteValue;
    let newBalance = input - newExpense;
    this.setState({ expense: newExpense });
    this.setState({ balance: newBalance });
  }
  yesBtnClick() {
    $("#messageBox").hide();
  }

  render() {
    return (
      <div>
        <input type="text" id="addValue" placeholder="Enter Bill's amount" />
        <input type="text" id="addDate" placeholder="Enter bill's due date" />
        <button onClick={this.add}>add new invoice</button>

        <div>
          <span id="currentIncome">Income:{this.state.income}</span>
          <span id="currentExpense">Expense:{this.state.expense}</span>
          <span id="currentBalance">Balance:{this.state.balance}</span>
        </div>

        <table id="invoiceList">
          <thead id="invoiceListhead">
            <tr>
              <th>Invoice</th>
              <th>Date</th>
              <th>edit</th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody id="invoiceListbody">
            {this.state.lists.map((data) => {
              console.log(data);
              return (
                <List
                  key={data.id}
                  index={data.id}
                  info={data.value}
                  date={data.date}
                  delete={this.delete}
                  edit={this.edit}
                />
              );
            })}
          </tbody>
        </table>
        <div id="messageBox">
          <p id="message" />
          <p id="warning">
            No income to pay the new invoice, if continue, the balance will
            negative
          </p>
          <img
            id="yesBtn"
            className="messageBoxBtn"
            src={yesBtn}
            alt=""
            onClick={this.yesBtnClick}
          />
          {/* <img
            id="noBtn"
            className="messageBoxBtn"
            src={noBtn}
            alt=""
            onClick={this.noBtnClick}
          /> */}
        </div>
        <div id="editBox">
          <p id="message" />
          <input type="text" id="editValue" />
          <input type="text" id="editDate" />
          <img
            id="submitBtn"
            className="editBoxBtn"
            src={yesBtn}
            alt=""
            //onClick={this.submitBtnClick}
          />
        </div>
      </div>
    );
  }
}
class List extends Component {
  render() {
    return (
      <tr id={this.props.index} className="alt">
        <td>{this.props.info}</td>
        <td>{this.props.date}</td>
        <td>
          <button onClick={this.props.edit} data-index={this.props.index}>
            edit
          </button>
        </td>
        <td>
          <button onClick={this.props.delete} data-index={this.props.index}>
            delete
          </button>
        </td>
      </tr>
    );
  }
}
export default withRouter(Page3);
