import React from 'react';
import Login from './Login';
import firebase from 'firebase';
import base, { firebaseApp } from './firebase';

class Header extends React.Component{
	constructor(){
		super()
	}

	authHandler = async (authData) => {
		const userID = await authData.user.uid;
		this.props.userLogin(userID);
		// const user = await base.fetch(this.props.userId, { context: this });

		// if (!user.owner) {
		// 	await base.post(`${this.props.userId}/owner`, {
		// 		data: authData.user.uid
		// 	});
		// }
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