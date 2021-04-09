import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import myFirebase from "/src/myFirebaseConfig";
import Firebase from "firebase";

class Page5 extends Component {
  constructor(props) {
    super(props);
    //In essence, we will create a copy of the Firebase database and store it in state dbData[]
    this.state = {
      dbData: []
    };

    //Inform react of events
    this.getMessagesFromDatabase = this.getMessagesFromDatabase.bind(this);
  } // end constructor

  componentDidMount() {
    // as soon as the component mounts, get the most recent messages from the firebase database.

    this.getMessagesFromDatabase();
  }
  //Alot of the code below is from firebase which handles the data
  getMessagesFromDatabase() {
    let ref = Firebase.database().ref("userData");

    ref.on("value", (snapshot) => {
      // json array
      let msgData = snapshot.val();
      let newMessagesFromDB = [];
      for (let m in msgData) {
        // create a JSON object version of our object. If the JSON data format changes in the database, this code will need to change
        let currObject = {
          userID: msgData[m].userID,
          details: {
            email: msgData[m].details.email,
            password: msgData[m].details.password,
            expenses: msgData[m].details.expenses,
            income: msgData[m].details.income
          }
        };
        // add it to our newStateMessages array.
        newMessagesFromDB.push(currObject);
      } // end for loop
      // set state
      this.setState({ dbData: newMessagesFromDB });
    }); // end of the on method
  } // end of getMessagesFromDatabase()

  render() {
    return (
      <div className="Logout">
        <h1>Private Content DB</h1>

        {this.state.dbData.length <= 0 && <p>Please wait ... data loading</p>}

        {this.state.dbData.length > 0 && ( //Should update live if the database changes
          <p>There are {this.state.dbData.length} objects from DB</p>
        )}

        <ul>
          {this.state.dbData.map((
            data,
            index //testing the map function on the data
          ) => (
            <li key={index}>
              <b> UserID: {data.details.userID} </b>{" "}
              <b> Email: {data.details.email}</b>{" "}
              <b> Password: {data.details.password} </b>
              <b> Expenses: {"€" + data.details.expenses + ","} </b>{" "}
              <b> Income: {"€" + data.details.income + ","} </b>
            </li>
          ))}
        </ul>
      </div>
    ); // end of return statement
  } // end of render function
} // end of class

export default withRouter(Page5);
