import Rebase from "re-base";
import firebase from "firebase/app";
import "firebase/auth"; // for authentication
import "firebase/storage"; // for storage
import "firebase/database"; // for realtime database
import "firebase/firestore"; // for cloud firestore
import firebaseConfig from "./firebaseConfig";

const firebaseApp = firebase.initializeApp(firebaseConfig);

const firestore = firebaseApp.firestore();
// const settings = { timestampsInSnapshots: true};
// firestore.settings(settings);
// re-base binding
const base = Rebase.createClass(firestore);

//named export
export { firebaseApp, firestore };

// default export
export default base;