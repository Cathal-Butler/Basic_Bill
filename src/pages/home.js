import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div id="home">
        <h1>This is our Home Page</h1>
      </div>
    );
  }
}

export default withRouter(Home);
