import React, { Component } from "react";
import { withRouter } from "react-router-dom";
//import {userData} from "./data.js";
import ReactEcharts from "echarts-for-react";
import $ from "jquery";
//import userData from ".././localData";
//导入折线图
import "echarts/lib/chart/line";
// 引入提示框和标题组件
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/markPoint";
import userData from ".././localData.json";

const data = userData;

class Page2 extends Component {
  constructor(props) {
    super(props);

    //In essence, we will create a copy of the Firebase database and store it in state dbData[]
    this.state = {
      dataList: data
    };
    this.renderTable = this.renderTable.bind(this);
  } // end constructor
  piechartClick() {
    $("#piechart").toggle();
  }
  barchartClick() {
    $("#piechart").toggle();
  }
  test321() {
    var name = "333";

    return (
      <div>
        <p>hahaha{JSON.stringify(data)}</p>
      </div>
    );
  }
  // getInvoice(){
  //   var list=userData;
  //   var invoiceArr=list.map(function(e){
  //     return `${e.price};
  //   })
  //   console.log(invoiceArr);
  // }
  getMonthInvoice() {}
  filterCata(e) {
    return function (object) {
      return object.catagory === e;
    };
  }
  renderTable(userData) {
    var list = this.state.dataList;
    return (
      <div className="showTable">
        <strong>Fixrd invoice</strong>
        <table className="table table-sm table-bordered">
          <thead>
            <tr>
              <th>invoice fee</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {list.filterCata("fixed").map((e) => {
              <tr key={e.id}>
                <td>{e.price}</td>
                <td>{e.date}</td>
              </tr>;
            })}
          </tbody>
        </table>
      </div>
    );
  }

  render() {
    console.log(data);

    return (
      <div className="App">
        {console.log(JSON.stringify(data))}
        {this.test321()}
        {/* <h1>Data Object (Map Function/Filter Function Test): </h1>
        <p>Test Paragraph </p> */}
        {this.renderTable()}
      </div>
    );
  }
}

export default withRouter(Page2);
