import React from 'react';
import {Link} from 'react-router-dom';
import SimpleMenu from './MaterialUI/CardCategoryMenu';

class Header extends React.Component{
	constructor(){
		super()
		this.state = {
			selectedCardCategory: ''
		}
	}

	render(){
		return(
			<>
			<div>
				<Link to="/Categories">Categories</Link>
				<Link to="/FlashCards">Flash Cards</Link>
			</div>
				{/* <SimpleMenu
				cards={this.props.cards}
				select={this.props.selectCardCategory}>
				</SimpleMenu> */}
			</>
		)
	}
}

export default Header