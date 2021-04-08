import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Firebase from "./myFirebaseConfig"; //CHECK THIS IMPORT NAME!!

class Page2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dbData: []
    };
    this.getMessagesFromDatabase = this.getMessagesFromDatabase.bind(this);
  }

  getMessagesFromDatabase() {
    let ref = Firebase.database().ref("userData");

    ref.on("value", (snapshot) => {
      let msgData = snapshot.val();
      let newMessagesFromDB = [];
      for (let m in msgData) {
        //create a JSON object version of our object
        let currObject = {
          userID: msgData[m].userID,
          details: {
            name: msgData[m].details.name,
            password: msgData[m].details.password
          } //end of details
        }; //end of curr object
        //add it to our newStateMessages array
        newMessagesFromDB.push(currObject);
      }
      //set state = don't use concat
      this.setState({ dbData: newMessagesFromDB });
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Hello </h1>
        <p>There are {this.state.dbData.length} object from DB </p>

        <ul>
          {this.state.dbData.map((data, index) => (
            <li key={index}>
              <b>Name: {data.details.name} </b>
              Password:{data.details.password}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
export default withRouter(Page2);
