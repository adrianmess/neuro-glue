import React from 'react';
import Card from './Card';

class CardsList extends React.Component{
	constructor(props){
		super(props);
	}



	render() {
		return(
			<>
			<div>
				<ul>
					{Object.keys(this.props.cards).map(key =>
						<Card
							id="card-in-cardList"
							key={key}
							index={key}
							card={this.props.cards[key]}
							deleteCard={this.props.deleteCard}
						/>
					)}
				</ul>
			</div>
			</>
		);
	}
}

export default CardsList;