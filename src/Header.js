import React from 'react';
import {Link} from 'react-router-dom';
import SimpleMenu from './MaterialUI/CardCategoryMenu';
import './Header.css';

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
				<Link to="/Categories" className="headerLinks">Categories</Link>
				<Link to="/FlashCards" className="headerLinks">Flash Cards</Link>
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