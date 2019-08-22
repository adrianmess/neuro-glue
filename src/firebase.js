import Rebase from "re-base";
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';        // for authentication
import 'firebase/storage';     // for storage
import 'firebase/database';    // for realtime database
import 'firebase/firestore';   // for cloud firestore
// for cloud functions

const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyDXYjVUgY1eZtnVXohdmsfv66vl_Sl2HVw",
	authDomain: "neuro-glue.firebaseapp.com",
	databaseURL: "https://neuro-glue.firebaseio.com",
	projectId: "neuro-glue",
	storageBucket: "neuro-glue.appspot.com",
	messagingSenderId: "717836149705"
});

const firestore = firebaseApp.firestore();
// const settings = { timestampsInSnapshots: true};
// firestore.settings(settings);
// re-base binding
const base = Rebase.createClass(firestore);

//named export
export { firebaseApp, firestore };

// default export
export default base;