import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { userData } from "./data.js";
import ReactEcharts from "echarts-for-react";
import $ from "jquery";
//导入折线图
import "echarts/lib/chart/line";
// 引入提示框和标题组件
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/markPoint";

const data = userData;
function flexibleSelectID(id) {
  return function (userObject) {
    return userObject.userID === id;
  };
}

class Page2 extends Component {
  piechartClick() {
    $("#piechart").toggle();
  }
  barchartClick() {
    $("#piechart").toggle();
  }

  render() {
    console.log(data);

    return (
      <div className="App">
        <h1>Data Object (Map Function/Filter Function Test): </h1>
        <p>Test Paragraph </p>
        {data.filter(flexibleSelectID(9)).map((
          d //Map/Filter function on the test data
        ) => (
          <div key={d.userID}>
            <li>
              <b>UserID: </b> {" " + d.userID + " "}
              <b> Name: </b> {" " + d.name + " "}
              <b> Expense: </b> {" " + d.expenses + " "}
              <b> Income: </b> {" " + d.income + " "}{" "}
            </li>
          </div>
        ))}
        <button onClick={this.piechartClick}> pie chart</button>
        <button onClick={this.barchartClick}> bar chart</button>
        <div id="piechart" display="none">
          <ReactEcharts
            option={{
              tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b}: {c} ({d}%)"
              },
              legend: {
                orient: "vertical",
                left: 10,
                data: ["income", "expense"]
              },
              series: [
                {
                  name: "Utilization",
                  type: "pie",
                  radius: ["50%", "70%"],
                  avoidLabelOverlap: false,
                  label: {
                    show: false,
                    position: "center"
                  },
                  emphasis: {
                    label: {
                      show: true,
                      fontSize: "30",
                      fontWeight: "bold"
                    }
                  },
                  labelLine: {
                    show: false
                  },
                  data: [
                    { value: 335, name: "income" },
                    { value: 310, name: "expense" }
                  ]
                }
              ]
            }}
          />
        </div>
        <div id="linechart" display="none">
          <ReactEcharts
            option={{
              tooltip: {
                trigger: "axis",
                axisPointer: {
                  // 坐标轴指示器，坐标轴触发有效
                  type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
                }
              },
              legend: {
                data: ["balance", "expense", "income"]
              },
              grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true
              },
              xAxis: [
                {
                  type: "value"
                }
              ],
              yAxis: [
                {
                  type: "category",
                  axisTick: {
                    show: false
                  },
                  data: ["mon", "tues", "wed", "thur", "fri", "sat", "sun"]
                }
              ],
              series: [
                {
                  name: "balance",
                  type: "bar",
                  label: {
                    show: true,
                    position: "inside"
                  },
                  emphasis: {
                    focus: "series"
                  },
                  data: [200, 170, 240, 244, 200, 220, 210]
                },
                {
                  name: "income",
                  type: "bar",
                  stack: "total",
                  label: {
                    show: true
                  },
                  emphasis: {
                    focus: "series"
                  },
                  data: [320, 302, 341, 374, 390, 450, 420]
                },
                {
                  name: "expense",
                  type: "bar",
                  stack: "total",
                  label: {
                    show: true,
                    position: "left"
                  },
                  emphasis: {
                    focus: "series"
                  },
                  data: [-120, -132, -101, -134, -190, -230, -210]
                }
              ]
            }}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(Page2);
