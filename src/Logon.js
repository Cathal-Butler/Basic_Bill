import React, { Component } from "react";
import Firebase from "firebase";
import "./logon.css";
import Signup from "./Signup";

class Logon extends Component {
  state = {
    showSignUp: false //For showing and hiding the sign up component
  };

  constructor(props) {
    super(props);

    this.state = {
      //Handles users login state (for Firebase ) */
      email: "",
      password: "",
      error: null
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //Taking in what the user puts into Email/Password input box
  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  //Firebase handles authentication
  handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    Firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log("User logged on");
      })
      .catch((error) => {
        this.setState({ error: error });
      });
  }

  toggleSignUpHandler = () => {
    const doesShowSignUp = this.state.showSignUp;
    this.setState({ showSignUp: !doesShowSignUp });
  };

  render() {
    const { email, password, error } = this.state;

    const handleInput = this.handleInputChange;
    return (
      <div className="form-signin" id="logon-bgimage">
        <h1 class="h1">Welcome to Basic Bill! </h1> <br />
        <h1 class="h1">Please sign in to start saving money! </h1>
        <br />
        {
          /*If error, Firebase sends message */ error && (
            <p class="p">ERROR: {error.message}</p>
          )
        }
        <form onSubmit={this.handleSubmit}>
          <div class="mb-3">
            <label class="form-label" class="p">
              Email Address:{" "}
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleInput}
            />
          </div>
          <div class="mb-3">
            <label class="form-label" class="p">
              Password:{" "}
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={handleInput}
            />
          </div>
          <button type="submit" class="btn btn-light">
            Logon
          </button>{" "}
          <br />
          <button onClick={this.toggleSignUpHandler} class="btn btn-secondary">
            Sign Up{" "}
          </button>
        </form>
        {this.state.showSignUp === true ? (
          //Wrap Signup component in a div so it can be hidden or shown using hte ernary operator, if true, show it, else: :null (hide it)
          <div>
            <Signup />
          </div>
        ) : null}
      </div>
    );
  }
} //end of class

export default Logon;
