import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Page1 extends Component {
  render() {
    return (
      <div id="page1">
        <h1>This is the page where users input their income and expenses </h1>
      </div>
    );
  }
}

export default withRouter(Page1);
