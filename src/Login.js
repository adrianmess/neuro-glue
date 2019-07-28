import React from 'react';

const Login = () => (
	<nav className="login">
		<button className="facebook" onClick={() => this.props.authenticate('Facebook')}>Login</button>
	</nav>
)

export default Login;