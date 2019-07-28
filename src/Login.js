import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import base, { firebaseApp } from './firebase';


class Login extends React.Component{

	componentDidMount(){
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.authHandler({ user });
			}
		})
	}
	authHandler = async (authData) =>{
		const userID = await authData.user.uid;
		this.props.isLoggedInAction(true)
		this.props.setUserId(userID)
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
		return (
		<nav className="login">
			<button className="facebook"
				onClick={() => this.authenticate('Facebook')}>Login</button>
		</nav>
		)
	}
}

// Login.propTypes = {
// 	authenticate: PropTypes.func.isRequired
// };
export default Login;