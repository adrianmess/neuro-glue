import React from 'react';
// import Login from './Login';
import Dropdown from 'react-bootstrap/Dropdown';


class Header extends React.Component{
	constructor(){
		super()
	}

	selectCategories =(event, category) =>{

		event.preventDefault();
		console.log(category)
		this.props.history.push(`/flashcards/${category}`)
	}

	selectCardCategory(category){
		this.props.selectCardCategory(category);
	}

	render(){
		const {cards} = this.props;
		return(
			<>
				<Dropdown>
					<Dropdown.Toggle variant="success" id="dropdown-basic">
						Category
 				 </Dropdown.Toggle>
					<Dropdown.Menu>
						{Object.keys(cards).map(key =>
							<Dropdown.Item key={key}
								index={key}
								onClick={ () => {this.selectCardCategory(cards[key].Category)}}>
								{cards[key].Category}
							</Dropdown.Item>)}
					</Dropdown.Menu>
				</Dropdown>
			</>
		)
	}
}

export default Header