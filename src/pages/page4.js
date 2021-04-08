import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Firebase from "firebase";

class Page4 extends Component {
  constructor(props) {
    super(props);

    this.logOutUser = this.logOutUser.bind(this);
  } // end constructor

  logOutUser() {
    // Make a call to firebase authentication
    // this API will log the user out now.
    Firebase.auth().signOut();
  }

  render() {
    return (
      <div className="Logout">
        <button onClick={this.logOutUser}>Logout</button>
      </div>
    ); // end of return statement
  } // end of render function
} // end of class

export default withRouter(Page4);
