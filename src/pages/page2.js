import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Firebase from "firebase";

// const data = userData;
// function flexibleSelectID(id) {
//   return function (userObject) {
//     return userObject.userID === id;
//   };
// }

class Page2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dbData: []
    };
    this.getMessagesFromDatabase = this.getMessagesFromDatabase.bind(this);
    this.logOutUser = this.logOutUser.bind(this);
  } // end constructor

  componentDidMount() {
    // as soon as the component mounts, get the most recent messages from the firebase database.

    this.getMessagesFromDatabase();
  }

  getMessagesFromDatabase() {
    let ref = Firebase.database().ref("userData");

    ref.on("value", (snapshot) => {
      // json array
      let msgData = snapshot.val();
      let newMessagesFromDB = [];
      for (let m in msgData) {
        // create a JSON object version of our object.
        let currObject = {
          userID: msgData[m].userID,
          details: {
            name: msgData[m].details.name,
            password: msgData[m].details.password
          }
        };
        // add it to our newStateMessages array.
        newMessagesFromDB.push(currObject);
      } // end for loop
      // set state = don't use concat.
      this.setState({ dbData: newMessagesFromDB });
    }); // end of the on method
  } // end of getMessagesFromDatabase()

  logOutUser() {
    // Make a call to firebase authentication
    // this API will log the user out now.
    Firebase.auth().signOut();
  }

  render() {
    return (
      <div className="Logout">
        <h1>Private Content DB</h1>

        {this.state.dbData.length <= 0 && <p>Please wait ... data loading</p>}

        {this.state.dbData.length > 0 && (
          <p>There are {this.state.dbData.length} objects from DB</p>
        )}

        <ul>
          {this.state.dbData.map((data, index) => (
            <li key={index}>
              <b>{data.details.name}</b> <i>{data.details.password}</i>
            </li>
          ))}
        </ul>
        <button onClick={this.logOutUser}>Logout</button>
      </div>
    ); // end of return statement
  } // end of render function
} // end of class

export default withRouter(Page2);
