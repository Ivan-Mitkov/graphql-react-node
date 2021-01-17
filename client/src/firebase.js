import * as firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyARR14qEf9io3yYGGGk8NO1Rc0jWBvXDO4",
  authDomain: "gqlreactnode-e949e.firebaseapp.com",
  projectId: "gqlreactnode-e949e",
  storageBucket: "gqlreactnode-e949e.appspot.com",
  // messagingSenderId: "391717706309",
  appId: "1:391717706309:web:e2b4e5141068257a14612c",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
