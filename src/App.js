import React, { Component } from "react";
import "./styles.css";
import { Route, Switch, BrowserRouter as Router, Link } from "react-router-dom"; //App uses routing to navigate from page to page (See Dependencies)
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.css"; //Styling purposes
import home from "./pages/home"; //Importing the pages for routing
import page1 from "./pages/page1";
import page2 from "./pages/page2";
import page3 from "./pages/page3";
import page4 from "./pages/page4";
import page5 from "./pages/page5";
import Logon from "./Logon"; //Importing logon component
import Signup from "./Signup"; //IMporting signup component
import Firebase from "firebase"; //App is connect to realtime firebase
import page31 from "./pages/page31";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //So firebase can handle users who are logged in v. not logged in
      authenticated: false,
      currentUser: null
    };
  }

  componentDidMount() {
    //Firebase handles this for us
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
        {this.state.authenticated && ( //Once a user has logged in, display the navbar
          <div id="nav">
            <div id="menuText">Home/Dashboard</div>
            {/* <img
              id="menuBtn"
              src="https://images.unsplash.com/photo-1586941962765-d3896cc85ac8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
              onClick={this.showMenu.bind(this, "")}
              alt=""
            /> */}
          </div>
        )}

        {this.state.authenticated && (
          <div id="container">
            <div onClick={this.showMenu.bind(this, "")} class="hamburger"></div>
            <div onClick={this.showMenu.bind(this, "")} class="hamburger"></div>
            <div onClick={this.showMenu.bind(this, "")} class="hamburger"></div>
          </div>
        )}

        {
          /*If user is not logged in, display the logon component */ !this.state
            .authenticated && <Logon />
        }

        {/* {!this.state.authenticated && <Signup />} */}

        {this.state.authenticated && ( //Display all of the pages if the user is logged in.
          <Router>
            <div id="menu">
              <Link
                to="/"
                className="link"
                onClick={this.showMenu.bind(this, "Home/Dashboard")}
              >
                Home/Dashboard
              </Link>
              <Link
                to="/option1"
                className="link"
                onClick={this.showMenu.bind(this, "Your Financial Data")}
              >
                View Financial Data
              </Link>
              <Link
                to="/option2"
                className="link"
                onClick={this.showMenu.bind(this, "Add your Expense & Income")}
              >
                Enter Expense and Income
              </Link>

              <Link
                to="/option3"
                className="link"
                onClick={this.showMenu.bind(this, "Invoice Scheduler")}
              >
                Invoice Scheduler
              </Link>
              <Link
                to="/option4"
                className="link"
                onClick={this.showMenu.bind(this, "Logout")}
              >
                Logout
              </Link>
              <Link
                to="/option5"
                className="link"
                onClick={this.showMenu.bind(this, "Firebase Test")}
              >
                Firebase Test
              </Link>
              <Link
                to="/option6"
                className="link"
                onClick={this.showMenu.bind(this, "demo")}
              >
                page3demo
              </Link>
            </div>
            <div id="main">
              <Switch /*This block of code handles the clicking(routing) from page to page in the application */
              >
                <Route exact path="/" component={home} />
                <Route exact path="/" component={page2} />
                <Route exact path="/option2" component={page1} />
                <Route exact path="/option1" component={page2} />
                <Route exact path="/option3" component={page3} />
                <Route exact path="/option4" component={page4} />
                <Route exact path="/option5" component={page5} />
                <Route exact path="/option5" component={page31} />
              </Switch>
            </div>
          </Router>
        )}
      </div>
    );
  }
}

export default App;
