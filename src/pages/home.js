import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div id="home">
        <h1>This is our Home Page</h1>
        <input name="email" type="text" placeholder="Enter your email.." />
        <input name="password" type="password" placeholder="Password.." />
        <button type="submit">Sign In</button>
        <p>
          <button type="submit">Registration</button>
        </p>
      </div>
    );
  }
}

export default withRouter(Home);
