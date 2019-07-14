import React from 'react';
import Card from './Card';

class CardsList extends React.Component{
	render() {
		return(
			<>
			<ul>
				{Object.keys(this.props.cards).map(key =>
				<Card
				key={key}
				index={key}
				card={this.props.cards[key]}
				deleteCard={this.props.deleteCard}
				/> )}
			</ul>
			</>
		);
	}
}

export default CardsList;