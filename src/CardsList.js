import React from 'react';
import Card from './Card';

class CardsList extends React.Component{
	render() {
		return(
			<>
			<ul>
				{Object.keys(this.props.cards).map(key => <Card key={key} details={this.props.cards[key]}/> )}
			</ul>
			</>
		);
	}
}

export default CardsList;