import React from 'react';
import Login from './Login';

class Header extends React.Component{
	authenticate = () => {
		alert('yeah')
	}
	render(){
		return(
			<>
			<Login authenticate={this.authenticate}/>
			</>
		)
	}
}

export default Header