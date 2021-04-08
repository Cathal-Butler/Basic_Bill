import React, { Component } from "react";
// import our configuration for firebase.
import myFirebase from "./myFirebaseConfig";
import Firebase from "firebase";

class PrivateContentDB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dbData: []
    };
    this.getMessagesFromDatabase = this.getMessagesFromDatabase.bind(this);
  } // end constructor

  /*is invoked immediately after a component is mounted (inserted into the tree).
  If you use setState, this will cause a re-render and the component will be
  mounted again */
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

  render() {
    return (
      <div className="PrivateContentDB">
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
      </div>
    ); // end of return statement
  } // end of render function
} // end of class

export default PrivateContentDB;
