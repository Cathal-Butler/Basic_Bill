import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Page2 extends Component {
  render() {
    return (
      <div id="page1">
        <h1>This is the page where users view their financial data</h1>
      </div>
    );
  }
}

export default withRouter(Page2);
