import React from 'react';
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
				<SimpleMenu
				cards={this.props.cards}
				select={this.props.selectCardCategory}>
				</SimpleMenu>
			</>
		)
	}
}

export default Header