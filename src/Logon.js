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
      <div
        class="card"
        className="form-signin"
        style={{
          backgroundImage:
            "url(" +
            "https://images.unsplash.com/photo-1586021280718-53fbadcb65a7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80" +
            ")",
          backgroundPosition: "center",
          backgroundSize: "100em",
          backgroundRepeat: "no-repeat",
          height: "555px"
        }}
      >
        <h3 style={{ color: "white" }}>Sign in </h3>
        {
          /*If error, Firebase sends message */ error && (
            <p>ERROR: {error.message}</p>
          )
        }

        <form onSubmit={this.handleSubmit}>
          <div class="mb-3">
            <label class="form-label" style={{ color: "white" }}>
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
            <label class="form-label" style={{ color: "white" }}>
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
          </button>
        </form>
      </div>
    );
  }
} //end of class

export default Logon;
