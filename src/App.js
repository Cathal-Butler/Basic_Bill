import React, { Component } from "react";
import "./styles.css";
import { Route, Switch, BrowserRouter as Router, Link } from "react-router-dom";
import $ from "jquery";
import home from "./pages/home";
import "bootstrap/dist/css/bootstrap.css";
import page1 from "./pages/page1";
import page2 from "./pages/page2";
import page3 from "./pages/page3";
import PrivateContentDB from "./PrivateContentDB";
import Logon from "./Logon";
import Logout from "./Logout";
import Firebase from "firebase";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false,
      currentUser: null
    };
  }

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
  showMenu(menuText) {
    $("#menu").toggle();
    if (menuText !== "") {
      $("#menuText").html(menuText);
    }
  }

  render() {
    return (
      <div className="App">
        {this.state.authenticated && (
          <div id="nav">
            <div id="menuText">Login/Sign-Up</div>
            <img
              id="menuBtn"
              src="https://images.unsplash.com/photo-1586941962765-d3896cc85ac8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
              onClick={this.showMenu.bind(this, "")}
              alt=""
            />
          </div>
        )}

        {!this.state.authenticated && <Logon />}
        {this.state.authenticated && <Logout />}

        {this.state.authenticated && (
          <Router>
            <div id="menu">
              <Link
                to="/"
                className="link"
                onClick={this.showMenu.bind(this, "Home")}
              >
                Login or Sign-Up
              </Link>
              <Link
                to="/option1"
                className="link"
                onClick={this.showMenu.bind(this, "Data Entry")}
              >
                Enter Income and Expense
              </Link>
              <Link
                to="/option2"
                className="link"
                onClick={this.showMenu.bind(this, "Your Financial Data")}
              >
                View Financial Data
              </Link>
              <Link
                to="/option3"
                className="link"
                onClick={this.showMenu.bind(this, "Invoice Scheduler")}
              >
                Invoice Scheduler
              </Link>
            </div>
            <div id="main">
              <Switch>
                <Route exact path="/" component={home} />
                <Route exact path="/option1" component={page1} />
                <Route exact path="/option2" component={page2} />
                <Route exact path="/option3" component={page3} />
              </Switch>
            </div>
          </Router>
        )}
      </div>
    );
  }
}

export default App;
