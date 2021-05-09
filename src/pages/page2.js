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
import "bootstrap/dist/css/bootstrap.min.css";
import yesBtn from "./img/yesBtn.png";
const data = userData;

function filterFixedData(e) {
  return function (object) {
    return object.catagory === e;
  };
}
function filterYear(e) {
  return function (object) {
    return object.date.substring(0, 4) === e;
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
    this.getYearData = this.getYearData.bind(this);
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
    var filterList = list.filter(filterYear(year));
    console.log(JSON.stringify(filterList));
    var jsonLength = filterList.length;
    console.log(jsonLength);
    if (jsonLength===0) {
      $("#yearSearchWarning").show();
    }

  }
  testTotal(){
    
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

          <button onClick={this.getYearData}>onClick</button>
        </div>
        <div>
          <nav
            class="navbar navbar-inverse navbar-fixed-top"
            id="sidebar-wrapper"
            role="navigation"
          >
            <ul class="nav sidebar-nav">
              <li class="dropdown">
                {" "}
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                  {" "}
                  <i class="fa fa-fw fa-plus"> </i> Dropdown{" "}
                  <span class="caret"> </span>{" "}
                </a>
                <ul class="dropdown-menu" role="menu">
                  <li class="dropdown-header"> Charts </li>
                  <li>
                    {" "}
                    <a href="#typeYear"> Pie Chart </a>{" "}
                  </li>
                  <li>
                    {" "}
                    <a href="#submitBtn"> Bar Chart </a>{" "}
                  </li>
                  <li>
                    {" "}
                    <a href="#"> Tables </a>{" "}
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
         
    <div class="yearSearchWarning" id="yearSearchWarning" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Warning</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>There is no data in specified year.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>


        </div>
      </div>
    );
  }
}

export default withRouter(Page2);
