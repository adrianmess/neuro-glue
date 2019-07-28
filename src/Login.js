import React from 'react';
import PropTypes from 'prop-types';

const Login = (props) => (
	<nav className="login">
		<button className="facebook" onClick={() => props.authenticate('Facebook')}>Login</button>
	</nav>
)

Login.propTypes = {
	authenticate: PropTypes.func.isRequired
};
export default Login;