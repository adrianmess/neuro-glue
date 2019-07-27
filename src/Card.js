import React from 'react';
import renderHTML from 'react-render-html';
import './Card.css';



class Card extends React.Component {


	selectCard(card, index){
		this.props.selectCard(card, index);
	}

	render() {
		const card = this.props.card;
		const index = this.props.index;
		return (
			<>
			<div id="card-container"
					onClick={() => this.selectCard(card, index)}
			>
			<div id="card-front" name="front">
				{renderHTML(card.front)}
			</div>
			<div id="card-back" name="back">
				{renderHTML(card.back)}
			</div>
			</div>
			{/* using inline function for button onClick handler */}
			<button id="card-button-remove"
			onClick={() => this.props.deleteCard(this.props.index)}>remove</button>
			</>
		)
	}
}

export default Card