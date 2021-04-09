import React, { Component } from "react";
import Firebase from "firebase";
class Logon extends Component {
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

  render() {
    const { email, password, error } = this.state;

    const handleInput = this.handleInputChange;
    return (
      <div className="xyz">
        <h3>Sign in </h3>
        {
          /*If error, Firebase sends message */ error && (
            <p>ERROR: {error.message}</p>
          )
        }

        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Email Address: </label>
            <input
              type="email"
              name="email"
              placeholder="enter email"
              value={email}
              onChange={handleInput}
            />
          </div>
          <div>
            <label>Password: </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleInput}
            />
          </div>
          <button>Logon</button>
        </form>
      </div>
    );
  }
} //end of class

export default Logon;
