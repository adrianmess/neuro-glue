import React from 'react';
import './Card.css';

class Card extends React.Component {
	render() {
		const { front, back} = this.props.details;
		return (
			<>
			<div id="card-container">
			<div id="card-front">{front}</div>
			<div id="card-back">{back}</div>
			</div>
			<button id="card-button-remove">remove</button>
			</>
		)
	}
}

export default Card