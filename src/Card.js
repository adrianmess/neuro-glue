import React from 'react';
import './Card.css';

class Card extends React.Component {
	render() {
		const { front, back} = this.props.details;
		return (
			<>
			<div id="card-container">
			<div id="card-front" name="front">{front}</div>
			<div id="card-back" name="back">{back}</div>
			</div>
			{/* using inline function for button onClick handler */}
			<button id="card-button-remove" onClick={() => this.props.deleteCard(this.props.index)}>remove</button>
			</>
		)
	}
}

export default Card