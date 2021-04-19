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
        window.location.assign("/"); //When a user logs in, it redirects them to the home/dashboard page
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
        <h1 class="h1">
          {" "}
          <br />
          <br />
          <b>Welcome to Basic Bill </b>{" "}
        </h1>
        <h1 class="h1">Please sign in to start saving money! </h1>
        <br />
        {
          /*If error, Firebase sends message but only if SignUp button has not been clicked
          and email address is blank and password is blank */ error &&
            this.state.showSignUp === false &&
            { email } === null &&
            { password } === null(<p class="p">ERROR: {error.message}</p>)
        }
        <form onSubmit={this.handleSubmit}>
          <div class="mb-3, form">
            <label class="form-label, p">Email Address: </label>
            &nbsp; &nbsp;
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleInput}
            />
            &nbsp; &nbsp; &nbsp;
          </div>
          <div class="mb-3, form">
            <label class="form-label, p">Password: </label>
            &nbsp; &nbsp;
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={handleInput}
            />
          </div>
          &nbsp; &nbsp;
          <button type="submit" class="btn btn-light">
            Logon
          </button>{" "}
          <br />
          <br />
          <br />
          <button onClick={this.toggleSignUpHandler} class="btn btn-light">
            New to Basic Bill? Click here to Sign Up!{" "}
          </button>
        </form>
        {this.state.showSignUp === true ? (
          //Wrap Signup component in a div so it can be hidden or shown using hte ernary operator, if true, show it, else: :null (hide it)
          <div>
            <Signup />
          </div>
        ) : null}

        <br />
        <br />
        <br />
        <br />
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/255px-Flag_of_Europe.svg.png" />
      </div>
    );
  }
} //end of class

export default Logon;
