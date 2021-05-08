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
function flexibleSelectID(id) {
  return function (userObject) {
    return userObject.userID === id;
  };
}
function total(arr) {
  // console.log(arr +"show data");
  var s = 0;
  arr.forEach(function (val, idx, arr) {
    s += val;
  }, 0);
  // console.log("total income is "+s);
  return s;
  // return 0;
}

class Page2 extends Component {
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
  renderTable() {
    return (
      <div className="showTable">
        <strong>Fixrd invoice</strong>
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
      </div>
    );
  }
}

export default withRouter(Page2);
