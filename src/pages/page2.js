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
import 'bootstrap/dist/css/bootstrap.min.css';
import yesBtn from "./img/yesBtn.png";
const data = userData;

function filterFixedData(e) {
  return function (object) {
    return object.catagory === e;
  };
}
function filterYear(e) {
  return function (object) {
    return object.date;
  };
}
class Page2 extends Component {
  constructor(props) {
    super(props);

    //In essence, we will create a copy of the Firebase database and store it in state dbData[]
    this.state = {
      dataList: data
    };
    this.renderTable = this.renderTable.bind(this);
    this.getYearData=this.getYearData.bind(this);
  } // end constructor
  piechartClick() {
    $("#pieChart").toggle();
  }
  barchartClick() {
    $("#barChart").toggle();
  }
 
  renderTable(userData) {
    var list = this.state.dataList;
    return (
      <div className="showTable">
        <strong>Fixed invoice</strong>
        <table className="table table-sm table-bordered">
          <thead>
            <tr>
              <th>invoice fee</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {list.filter(filterFixedData("fixed")).map((e) => {
              return (
                <tr key={e.id}>
                  <td>{e.price}</td>
                  <td>{e.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
  getYearData() {
    var list = this.state.dataList;
    var year = $("#typeYear").val();
    var filterList=list.filter(filterFixedData(year));
    console.log(JSON.stringify(filterList));
  }
  render() {
    console.log(JSON.stringify(data));

    return (
      <div className="App">
        {console.log(JSON.stringify(data))}
        {this.renderTable()}
        <div className="chooseYear">
          <p>Please type in the year of invoice:</p>
          <input type="text" id="typeYear" placeholder="2019-2023" />
         
          <button onClick={this.getYearData}>
          onClick
          </button>
        </div>
        <div>
        <nav class="navbar navbar-inverse navbar-fixed-top" id="sidebar-wrapper"
role="navigation">
  <ul class="nav sidebar-nav">
    <li class="dropdown"> <a href="#" class="dropdown-toggle" data-toggle="dropdown"> <i class="fa fa-fw fa-plus"> </i> Dropdown <span class="caret"> </span> </a>
      <ul class="dropdown-menu" role="menu">
        <li class="dropdown-header"> Dropdown heading </li>
        <li> <a href="#typeYear"> Action </a> </li>
        <li> <a href="#submitBtn"> Another action </a> </li>
        <li> <a href="#"> Something else here </a> </li>
        <li> <a href="#"> Separated link </a> </li>
        <li> <a href="#"> One more separated link </a> </li>
      </ul>
    </li>
  </ul>
</nav>
{/* <img
            id="submitBtn"
            className="editBoxBtn"
            src={yesBtn}
            alt=""
          /> */}
        </div>
      </div>
    );
  }
}

export default withRouter(Page2);
