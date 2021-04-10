import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Firebase from "firebase";
import "./page4.css";

class Page4 extends Component {
  constructor(props) {
    super(props);

    this.logOutUser = this.logOutUser.bind(this);
  } // end constructor

  //Firebase will handle logout matters
  logOutUser() {
    // Make a call to firebase authentication
    // this API will log the user out now.
    Firebase.auth().signOut();
  }

  render() {
    return (
      <div className="Logout" id="logout-bgimage">
        <h2 class="h2">
          {" "}
          We are sorry to see you go...
          <br />
          We hope you enjoyed using Basic Bill!
          <br />
          Click the button below to logout!{" "}
        </h2>
        <button
          style={{ float: "left" }} //Override default Bootstrap Style
          type="button"
          class="btn btn-lg btn-primary" //Bootstrap class
          onClick={this.logOutUser}
        >
          Logout
        </button>
      </div> //Simple logout button
    ); // end of return statement
  } // end of render function
} // end of class

export default withRouter(Page4);
