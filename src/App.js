import React, { Component } from "react";
import "./styles.css";
import { Route, Switch, BrowserRouter as Router, Link } from "react-router-dom";
import $ from "jquery";
import MenuBtn from "./image/MenuBtn.png";
import home from "./pages/home";
import page1 from "./pages/page1";
import page2 from "./pages/page2";
import page3 from "./pages/page3";

class App extends Component {
  showMenu(menuText) {
    $("#menu").toggle();
    if (menuText !== "") {
      $("#menuText").html(menuText);
    }
  }

  render() {
    return (
      <div className="App">
        <div id="nav">
          <div id="menuText">Home</div>
          <img
            id="menuBtn"
            src={MenuBtn}
            onClick={this.showMenu.bind(this, "")}
            alt=""
          />
        </div>
        <Router>
          <div id="menu">
            <Link
              to="/"
              className="link"
              onClick={this.showMenu.bind(this, "Home")}
            >
              Log in and registratiom
            </Link>
            <Link
              to="/option1"
              className="link"
              onClick={this.showMenu.bind(this, "Page1")}
            >
              income and exponse
            </Link>
            <Link
              to="/option2"
              className="link"
              onClick={this.showMenu.bind(this, "Page2")}
            >
              view financial
            </Link>
            <Link
              to="/option3"
              className="link"
              onClick={this.showMenu.bind(this, "Page3")}
            >
              invoice scheduler
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
      </div>
    );
  }
}

export default App;
