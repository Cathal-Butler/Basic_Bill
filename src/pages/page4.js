import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Firebase from "firebase";
import "./page4.css";

class Page4 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null
    };

    this.logOutUser = this.logOutUser.bind(this);
  } // end constructor

  componentDidMount() {
    Firebase.auth().onAuthStateChanged((user) => {
      user
        ? this.setState(() => ({
            authenticated: true,
            currentUser: user
          }))
        : this.setState(() => ({
            authenticated: false,
            currentUser: null
          }));
    });
  }

  //Firebase will handle logout matters
  logOutUser() {
    // Make a call to firebase authentication
    // this API will log the user out now.
    Firebase.auth().signOut();
    window.location.assign("/"); //When a user logs out, assigns the final cookie has the homepage
  }

  render() {
    return (
      <div className="Logout" id="logout-bgimage">
        <h2 class="h2">
          {" "}
          {this.state.currentUser !== null && (
            <p>
              {" "}
              We are sorry to see you go <br />
              {this.state.currentUser.email}{" "}
            </p>
          )}
          We hope you enjoyed using Basic Bill
          <br />
          <br />
        </h2>
        <button
          style={{ float: "left" }} //Override default Bootstrap Style
          type="button"
          class="btn btn-lg btn-secondary" //Bootstrap class
          onClick={this.logOutUser}
        >
          Logout
        </button>
      </div> //Simple logout button
    ); // end of return statement
  } // end of render function
} // end of class

export default withRouter(Page4);
