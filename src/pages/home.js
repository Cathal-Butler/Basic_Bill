import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import myFirebase from "/src/myFirebaseConfig";
import Firebase from "firebase";
import "./home.css";

/*Perhaps this page should be changed to a Dashboard page if we are going to stick with the Logon component */

class Home extends Component {
  constructor(props) {
    super(props);
    //In essence, we will create a copy of the Firebase database and store it in state dbData[]
    this.state = {
      dbData: [],
      authenticated: false,
      currentUser: null
    };

    //Inform react of events
    this.getMessagesFromDatabase = this.getMessagesFromDatabase.bind(this);
    this.generateRandomObject = this.generateRandomObject.bind(this);
  } // end constructor

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
        // create a JSON object version of our object which is blank for now. If the JSON data format changes in the database, this code will need to change
        let currObject = {
          objectID: msgData[m].objectID,
          details: {
            expenses: msgData[m].details.expenses,
            expensesDate: msgData[m].details.expensesDate,
            income: msgData[m].details.income,
            incomeDate: msgData[m].details.incomeDate,
            invoiceAmount: msgData[m].details.invoiceAmount,
            invoiceDue: msgData[m].details.invoiceDue
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
    let expensesLabel = [""];
    let expensesDateLabel = [""];
    let incomeLabel = [""];
    let incomeDateLabel = [""];
    let invoiceAmountLabel = [""];
    let invoiceDueLabel = [""];
    //create new message object which will be inserted into the DB.
    let newMsgObj = {
      objectID: objectID,
      details: {
        expenses: expensesLabel,
        expensesDate: expensesDateLabel,
        income: incomeLabel,
        incomeDate: incomeDateLabel,
        invoiceAmount: invoiceAmountLabel,
        invoiceDue: invoiceDueLabel
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

  //The below code features a map function which is in progress. The goal is to display the latest element in the array
  render() {
    return (
      //The below conditional rendering, creates a default empty object for the user once they click the button
      //Once the user has an object, the button will not appear again
      <div id="home">
        {this.state.dbData.length <= 0 && (
          <button onClick={this.generateRandomObject} class="btn btn-primary">
            Click here to get started{" "}
          </button>
        )}

        {this.state.dbData.length > 0 && (
          <div>
            <img
              id="piggy"
              src="https://i.pinimg.com/originals/81/d2/00/81d200d48f6d13e1c132ecf37b7606b1.gif"
              alt="logo"
            />{" "}
            <br /> <br />
            <h1 class="display-5 text-white">
              <u>
                {" "}
                <strong>Your latest Details: </strong>
              </u>
            </h1>
          </div>
        )}

        <br />
        <br />

        <div class="row">
          <div class="col-sm-6">
            <div class="card text-white card text-center bg-success mb-3">
              <div class="card-body">
                <h3 class="card-title">Latest Income:</h3>
                <h4 class="card-subtitle mb-2 text-white">
                  <br />
                  {this.state.dbData.map((data, index) => (
                    <div>
                      <ul key={index}>
                        €{data.details.income[data.details.income.length - 1]}{" "}
                        <br />
                        <br />
                        {
                          data.details.incomeDate[
                            data.details.incomeDate.length - 1
                          ]
                        }
                      </ul>
                    </div> //end of most recent/expense or income div
                  ))}
                </h4>
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="card text-white card text-center bg-danger mb-3">
              <div class="card-body">
                <h3 class="card-title">Latest Expense:</h3>
                <h4 class="card-subtitle mb-2 text-white">
                  <br />
                  {this.state.dbData.map((data, index) => (
                    <div>
                      <ul key={index}>
                        €
                        {
                          data.details.expenses[
                            data.details.expenses.length - 1
                          ]
                        }{" "}
                        <br />
                        <br />
                        {
                          data.details.expensesDate[
                            data.details.expensesDate.length - 1
                          ]
                        }
                      </ul>
                    </div> //end of most recent/expense or income div
                  ))}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div> //end of home div
    );
  }
}
export default withRouter(Home);
