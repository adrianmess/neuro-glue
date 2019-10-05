import React from "react";
import PropTypes from "prop-types";
import firebase from "firebase/app";
import { firebaseApp } from "./firebase";

class Login extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
        this.props.setUserId(user.uid);
      }
    });
  }
  authHandler = async authData => {
    const userID = await authData.user.uid;
    this.props.setUserId(userID);
    // const user = await base.fetch(this.props.userId, { context: this });

    // if (!user.owner) {
    // 	await base.post(`${this.props.userId}/owner`, {
    // 		data: authData.user.uid
    // 	});
    // }
  };
  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  render() {

    return (
      <nav id="login">
        <button
          className="loginButton"
          id="facebook"
          onClick={() => this.authenticate("Facebook")}
        >
          Continue With Facebook
        </button>
        <button
          className="loginButton"
          id="google"
          onClick={() => this.authenticate("Google")}
        >
          Continue With Google
        </button>
        <button
          className="loginButton"
          id="github"
          onClick={() => this.authenticate("Github")}
        >
          Continue With GitHub
        </button>
      </nav>
    );
  }
}

// Login.propTypes = {
// 	authenticate: PropTypes.func.isRequired
// };
export default Login;
