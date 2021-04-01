import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { userData } from "./data.js";

const data = userData;

class Page2 extends Component {
  render() {
    return (
      <div id="page1">
        <li>Practice mapping/filtering json object</li>
      </div>
    );
  }
}

export default withRouter(Page2);
