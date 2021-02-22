import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Page3 extends Component {
  render() {
    return (
      <div id="page1">
        <h1>This is the Invoice Scheduler page</h1>
      </div>
    );
  }
}

export default withRouter(Page3);
