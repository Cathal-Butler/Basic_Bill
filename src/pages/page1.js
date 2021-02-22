import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Page1 extends Component {
  render() {
    return <div id="page1">Input income and exponse</div>;
  }
}

export default withRouter(Page1);
