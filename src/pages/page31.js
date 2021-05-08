import React, { Component } from "react";
import { withRouter } from "react-router-dom";
///import myFirebase from "/src/myFirebaseConfig";
import firebase from "firebase/app";

import $ from "jquery";
import data from ".././localData";
import "./page3.css";
import yesBtn from "./img/submit.png";
//import {Table} from "bootstrap";
let i = 0; // tempo id
class page31 extends Component {
  constructor(props) {
    super(props);

    //In essence, we will create a copy of the Firebase database and store it in state dbData[]
    this.state = {
      dataList: data
    };
    this.deleteInvoice = this.deleteInvoice.bind(this);
    this.editInvoice = this.editInvoice.bind(this);
  } // end constructor

  //  getReference() {
  //     // [START rtdb_get_reference]
  //     var database = Firebase.database();
  //     // [END rtdb_get_reference]
  //   }

  // [END rtdb_write_new_user]
  getData() {
    let invoice = firebase.database().ref("invoice");

    console.log(invoice[0].billID);
  }

  test123() {
    data.push({ id: "123", name: "wangDeFa" });
    console.log("1个对象插入成功" + data);
  }
  add() {
    let cata = $("#addCatagory").val();
    let info = parseInt($("#addValue").val(), 10);
    let month = $("#addDate").val();
    data.push({ id: ++i, catagory: cata, price: info, date: month });

    //console.log(JSON.stringify(data));
    this.setState({ dataList: data });
    console.log("add data" + JSON.stringify(data));
  }
  deleteInvoice(e) {
    console.log(111);
    const index = e.target.getAttribute("data-index");
    //date:list 对应的index的 date
    const list = this.state.dataList;
    $("#" + index).remove();

    this.setState({ dataList: list });
    console.log("delete" + JSON.stringify(index));
  }

  editInvoice(e) {
    const list = this.state.dataList;
    $("#editBox").show();
    const index = e.target.getAttribute("data-index");
    $("#editCata").val(
      $("#" + index)
        .children()
        .eq(0)
        .text()
    );
    $("#editCata").val();
    let oldInvoice = parseInt(
      $("#" + index)
        .children()
        .eq(1)
        .text(),
      10
    );
    $("#editValue").val(oldInvoice);
    $("#editDate").val(
      $("#" + index)
        .children()
        .eq(2)
        .text()
    );
    $("#submitBtn")
      .off("click")
      .click(function () {
        let cata = $("#editCata").val();
        let info = parseInt($("#editValue").val(), 10);
        let date = $("#editDate").val();

        $("#" + index)
          .children()
          .eq(0)
          .text(cata);
        $("#" + index)
          .children()
          .eq(1)
          .text(info);
        $("#" + index)
          .children()
          .eq(2)
          .text(date);
        $("#editBox").hide();
      });
  }

  render() {
    return (
      <div>
        {console.log(JSON.stringify(data))}
        <input
          type="text"
          id="addCatagory"
          placeholder="type in fixed or flexible"
        />
        <input type="text" id="addValue" placeholder="Enter Bill's amount" />
        <input type="month" id="addDate" placeholder="Enter bill's due date" />
        <button onClick={this.add.bind(this)}>add new invoice</button>
        <table id="invoiceList" class="table table-dark">
          <thead id="invoiceListhead">
            <tr>
              <th>Catagory</th>
              <th>Invoice(Euro)</th>
              <th>Date</th>
              <th>edit</th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody id="invoiceListbody">
            {this.state.dataList.map((each) => {
              console.log(JSON.stringify(each));
              return (
                <List
                  key={each.id}
                  index={each.id}
                  cata={each.catagory}
                  info={each.price}
                  date={each.date}
                  deleteInvoice={this.deleteInvoice}
                  editInvoice={this.editInvoice}
                />
              );
            })}
          </tbody>
        </table>
        <div id="editBox">
          <p id="message" />
          <input type="text" id="editCata" />
          <input type="text" id="editValue" />
          <input type="month" id="editDate" />
          <img id="submitBtn" className="editBoxBtn" src={yesBtn} alt="" />
        </div>
        <div>{console.log(JSON.stringify(data))}</div>
      </div>
    );
  }
}

class List extends Component {
  render() {
    return (
      <tr id={this.props.index} className="alt">
        <td>{this.props.cata}</td>
        <td>{this.props.info}</td>
        <td>{this.props.date}</td>
        <td>
          <button
            onClick={this.props.editInvoice}
            data-index={this.props.index}
          >
            edit
          </button>
        </td>
        <td>
          <button
            onClick={this.props.deleteInvoice}
            data-index={this.props.index}
          >
            delete
          </button>
        </td>
      </tr>
    );
  }
}

export default withRouter(page31);
