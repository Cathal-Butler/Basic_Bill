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
      <div>
        <br />{" "}
        {this.state.currentUser !== null && (
          <div>
            <h2 class="display-5 text-white">
              Bye <i> {this.state.currentUser.email} </i>
            </h2>
            <br />
            <h2 class="display-5 text-white">Keep on saving! </h2>
          </div>
        )}
        <br />
        <br />
        <button
          type="button"
          class="btn btn-lg btn-light" //Bootstrap class
          onClick={this.logOutUser}
        >
          Logout
        </button>
        <br />
        <br />
        <br />
        <img
          id="piggy"
          src="https://i.pinimg.com/originals/81/d2/00/81d200d48f6d13e1c132ecf37b7606b1.gif"
          alt="logo"
        />
      </div> //Simple logout button
    ); // end of return statement
  } // end of render function
} // end of class

export default withRouter(Page4);
