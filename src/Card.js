import React from 'react';
import renderHTML from 'react-render-html';
import './Card.css';



class Card extends React.Component {
	constructor(props){
		super(props);

		this.cardSelected = this.cardSelected.bind(this);
	}

	cardSelected(){
		this.props.setCardActive(this.props.index);
	}

	render() {
		const { front, back} = this.props.card;
		return (
			<>
			<div id="card-container"
			onClick={() => this.props.selectCard(this.props.index)}
			onClick={this.cardSelected}
			>
			<div id="card-front" name="front">
				{renderHTML(front)}
			</div>
			<div id="card-back" name="back">
				{renderHTML(back)}
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