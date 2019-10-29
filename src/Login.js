import React from "react";
import PropTypes from "prop-types";
import firebase from "firebase/app";
import { firebaseApp } from "./firebase";

import "./Login.css";

import {
  FacebookLoginButton,
  GoogleLoginButton,
  GithubLoginButton,
  TwitterLoginButton,
  AmazonLoginButton,
  InstagramLoginButton,
  LinkedInLoginButton,
  MicrosoftLoginButton,
  BufferLoginButton
} from "react-social-login-buttons";

class Login extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
        this.props.setUserId(user.uid, user.photoUrl);
      }
    });
  }
  authHandler = async authData => {
    const userID = await authData.user.uid;
    const photoURL = await authData.user.photoURL;
    this.props.setUserId(userID, photoURL);
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
        <FacebookLoginButton
          className="loginButton"
          id="facebook"
          onClick={() => this.authenticate("Facebook")}
        />

        <GoogleLoginButton
          className="loginButton"
          id="google"
          onClick={() => this.authenticate("Google")}
        />

        <GithubLoginButton
          className="loginButton"
          id="github"
          onClick={() => this.authenticate("Github")}
        />
      </nav>
    );
  }
}

// Login.propTypes = {
// 	authenticate: PropTypes.func.isRequired
// };
export default Login;
