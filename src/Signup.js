import React, { Component } from "react";
import Firebase from "firebase";
import "./logon.css";

class Signup extends Component {
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
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        console.log("User logged on");
      })
      .catch((error) => {
        this.setState({ error: error });
      });
  }

  render() {
    const { email, password, error } = this.state;

    const handleInput = this.handleInputChange;
    return (
      <div className="form-signup">
        <h1>Sign Up Here! </h1> <br />
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
            Sign Up
          </button>
        </form>
      </div>
    );
  }
} //end of class

export default Signup;
