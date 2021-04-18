import React, { Component } from "react";
import { withRouter } from "react-router-dom";
///import myFirebase from "/src/myFirebaseConfig";
import firebase from "firebase/app";
import "firebase/database";
import $ from "jquery";

class page31 extends Component {
  constructor(props) {
    super(props);
    //In essence, we will create a copy of the Firebase database and store it in state dbData[]
    this.state = {
      invoice: []
    };

    
  } // end constructor

//  getReference() {
//     // [START rtdb_get_reference]
//     var database = Firebase.database();
//     // [END rtdb_get_reference]
//   }
  
  // [END rtdb_write_new_user]
  getData(){
    let invoice=firebase.database().ref("invoice");

    console.log(invoice[0].billID);
    
  }
render(){
  return{
    
  }

}
  
}
export default withRouter(page31);
