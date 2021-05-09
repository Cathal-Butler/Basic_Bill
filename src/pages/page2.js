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
// import yearArray from ".././year.json";
import "bootstrap/dist/css/bootstrap.min.css";
import "./page2.css";
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
      dataList: data,
      yearList:new Array(12),
      fix:0,
      unfix:0
    };
    this.renderTable = this.renderTable.bind(this);
    this.getYearData = this.getYearData.bind(this);
  } // end constructor
  

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


  getFixedTotal(){
    var fixedTotal=0;
    var unfixedTotal=0;
      for(var i=0;i<data.length;i++){
        if(data[i].catagory==="fixed"){
        fixedTotal+=data[i].price;
        }else{
        unfixedTotal+=data[i].price;
        }
      }     
    this.setState({fix:fixedTotal});
    this.setState({unfix:unfixedTotal});
  }

  getYearData() {
    var list = this.state.dataList;
    var year = $("#typeYear").val();
    var filterList = list.filter(filterYear(year));
    console.log(JSON.stringify(filterList));
    var jsonLength = filterList.length;
    console.log(jsonLength);
    if (jsonLength === 0) {
      $("#yearSearchWarning").show();
    }
  var monthInvoice=new Array(12);
  for(var i=0;i<12;i++){
      monthInvoice[i]=0;
  }

 for(var j=0;j<jsonLength;j++){
  var month=filterList[j].date.substring(5);
 
    switch (month){
      case "01": monthInvoice[0]+=parseInt(filterList[j].price,10); break;
      case "02": monthInvoice[1]+=parseInt(filterList[j].price,10); break;
      case "03": monthInvoice[2]+=parseInt(filterList[j].price,10); break;
      case "04": monthInvoice[3]+=parseInt(filterList[j].price,10); break;
      case "05": monthInvoice[4]+=parseInt(filterList[j].price,10); break;
      case "06": monthInvoice[5]+=parseInt(filterList[j].price,10); break;
      case "07": monthInvoice[6]+=parseInt(filterList[j].price,10); break;
      case "08": monthInvoice[7]+=parseInt(filterList[j].price,10); break;
      case "09": monthInvoice[8]+=parseInt(filterList[j].price,10); break;
      case "10": monthInvoice[9]+=parseInt(filterList[j].price,10); break;
      case "11": monthInvoice[10]+=parseInt(filterList[j].price,10); break;
      case "12": monthInvoice[11]+=parseInt(filterList[j].price,10); break;
      default:return null;
      }
    
    }
    console.log("month invoice"+ monthInvoice);
    this.setState({yearList:monthInvoice});
   
  }
  
    

 
  closeAlert(){
    $("#yearSearchWarning").hide();
  }
  barchartClick() {
    $("#barChart").toggle();
  }
  piechartClick() {
    $("#pieChart").toggle();
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

          <button onClick={this.getFixedTotal}>getTotal</button>

          <button onClick={this.getYearData}>onClick</button>
        </div>
        <div>
        <button type="button" class="btn btn-secondary" onClick={this.piechartClick()} >pie Chart</button>
        <br/>
        <br/>
        <button type="button" class="btn btn-secondary" onClick={this.barchartClick()}>bar chart</button>
        <br/>
        <br/>
      

          <div
            class="yearSearchWarning"
            id="yearSearchWarning"
            tabindex="-1"
            role="dialog"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Warning</h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <p>There is no data in specified year.</p>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={this.closeAlert}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

<div id="pieChart">
<ReactEcharts
           option = {{
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                top: '5%',
                left: 'center'
            },
            series: [
                {
                    name: "Utilization",
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '40',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        {value: this.state.fix, name: "fixed invoice"},
                        {value:this.state.unfix, name: "unfixed invoice"}
                      ]
                    }
                  ]
                }}
              />
</div>

       
          
      
      

<div id="barChart">

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
                data: ["invoice"]
              },
              grid: {
                left: "4%",
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
                  data: [
                    "Jan",
                    "feb",
                    "Mar",
                    "Apr",
                    "May",
                    "June",
                    "July",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec"
                  ]
                }
              ],
              series: [
                {
                  name: "price",
                  type: "bar",
                  label: {
                    show: true,
                    position: "inside"
                  },
                  emphasis: {
                    focus: "series"
                  },
                  data: Array.from(this.state.yearList)
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
