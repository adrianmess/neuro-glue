import React from 'react';
import Login from './Login';
import firebase from 'firebase';
import { firebaseApp } from './firebase';

class Header extends React.Component{

	authHandler = async (authData) => {
		console.log(authData)
	}
	authenticate = provider => {
		const authProvider = new firebase.auth[`${provider}AuthProvider`]();
		firebaseApp
		.auth()
		.signInWithPopup(authProvider)
		.then(this.authHandler);
	};
	render(){
		return(
			<>
			<Login authenticate={this.authenticate}/>
			</>
		)
	}
}

export default Header