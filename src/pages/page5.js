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
    this.generateRandomObject = this.generateRandomObject.bind(this);
  } // end constructor

  componentDidMount() {
    // as soon as the component mounts, get the most recent messages from the firebase database.

    this.getMessagesFromDatabase();
  }
  //Alot of the code below is from firebase which handles the data
  getMessagesFromDatabase() {
    let user = Firebase.auth().currentUser; //For users to access their own specific data
    let uid = user.uid; //Grabs the automatically generated firebase authenticated user ID
    let ref = Firebase.database().ref("userData").child(uid); //CHANGE**.child(uid) is added so users access their own data only

    ref.on("value", (snapshot) => {
      // json array
      let msgData = snapshot.val();
      let newMessagesFromDB = [];
      for (let m in msgData) {
        // create a JSON object version of our object. If the JSON data format changes in the database, this code will need to change
        let currObject = {
          objectID: msgData[m].objectID,
          details: {
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

  //CREATE ACTIVITY
  generateRandomObject() {
    let uuid = require("uuid"); //generate unique message ID
    let objectID = uuid.v4(); //auto generated objectID from Firebase
    let expensesLabel = [66, 44, 33];
    let incomeLabel = [27, 1503, 339];
    //create new message object which will be inserted into the DB.
    let newMsgObj = {
      objectID: objectID,
      details: {
        expenses: expensesLabel,
        income: incomeLabel
      }
    };

    let user = Firebase.auth().currentUser; //CHANGE*** Added to access user's data only
    let uid = user.uid; //CHANGE*** Access users firebase ID
    //access the messages held in state held above
    let localMessages = this.state.dbData;
    //add our new object, can use push here.
    localMessages.push(newMsgObj);
    //For basic write ops, can use set() to save data to specified ref, replacing any existing data at that path.
    //Using set() overwrites data at that specified location incl. any child data
    Firebase.database().ref("/userData").child(uid).set(localMessages); //CHANGE**** Added to access user's data only
    //restore state of this component back to the default
    //The entire array of JSON objects(incl. the new object) are pushed and state is set again
    this.setState({ dbData: localMessages });
  }

  //DELETE ACTIVITY

  //Filter callback function, want to filter out object required for deltion.
  //Want to match objects which don't match the userObjectID. The filter will return the
  //array of objects WITHOUT the object with the userObjectID
  filterByObjectID(userObjectID) {
    return function (userObject) {
      return userObject.objectID !== userObjectID;
    };
  } //end of filterByUserID

  //delete the user object form the user selection
  deleteObject(userObjectIDToDelete) {
    //get current state in array dbData holding our data
    const localUserObjects = this.state.dbData;

    //filter function needs to be applied to remove object we wish to delete
    //This is our dbData array WITHOUT the object for deletion.

    const updatedlocalUserObjects = localUserObjects.filter(
      this.filterByObjectID(userObjectIDToDelete)
    );

    //set state in the application. Now the local state is updated
    this.setState({ dbData: updatedlocalUserObjects });

    //updated FB DB using set from Firebase API
    //replace data at userData with the new dbData array (in state)
    //or using the local variable
    let user = Firebase.auth().currentUser; //CHANGE*** Added to get current users data
    let uid = user.uid; //CHANGE*** Added to get current users ID
    Firebase.database()
      .ref("/userData")
      .child(uid)
      .set(updatedlocalUserObjects); //CHANGE*** .child() added to access the users data only
  }

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
              <b> ObjectID: {data.objectID} </b>
              <b> Expenses: {"€" + data.details.expenses + ","} </b>{" "}
              <b> Income: {"€" + data.details.income + ","} </b>
            </li>
          ))}
        </ul>
        <button onClick={this.generateRandomObject}>Generate Object</button>

        <ul>
          {this.state.dbData.map((data, index) => (
            <li key={index}>
              <b> Object ID: {data.objectID} </b>{" "}
              <b> Expenses: {"€" + data.details.expenses + ","} </b>{" "}
              <b> Income: {"€" + data.details.income + ","} </b>
              <button onClick={() => this.deleteObject(data.objectID)}>
                Delete Object
              </button>
            </li>
          ))}
        </ul>
      </div>
    ); // end of return statement
  } // end of render function
} // end of class

export default withRouter(Page5);
