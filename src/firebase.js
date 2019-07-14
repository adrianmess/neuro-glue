import Rebase from "re-base";
import firebase from "firebase";

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
export { firebaseApp };

// default export
export default base;