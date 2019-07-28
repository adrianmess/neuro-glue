import React from 'react';
import CardsList from './CardsList';
import CardEditor from './CardEditor';
import './FlashCardEditorMain.css';


class FlashCardEditorMain extends React.Component{
	constructor(props){
		super(props);
			this.state= {
				cardCategory: ''
			}
	}

handleChange = event => {
	this.setState({
		cardCategory: event.target.value
	})
	// this.props.createTitle(this.state.cardCategory)
}

	render(){
		return(
			<>
			<div id="flashCardEditorContainer">

				{this.props.isLoggedIn?
				<p>
					<input
					placeholder= "FlashCard Set Title"
					type= "text"
					onChange={this.handleChange}
					value={this.state.cardSetTitle}></input>
				</p>: <span></span>}
				<button>Delete Set</button>
					<div id="cardList">
						<CardsList
							cards={this.props.cards}
							deleteCard={this.props.deleteCard}
							selectCard={this.props.selectCard}
						/>
					</div>
					<div id="cardEditor">
						<CardEditor
							cards={this.props.cards}
							addCard={this.props.addCard}
							updateCard={this.props.updateCard}
							newCard={this.props.newCard}
							selectedCard={this.props.selectedCard}
							selectedCardIndex={this.props.selectedCardIndex}
						/>
					</div>
			</div>

			</>
		);
	}
}

export default FlashCardEditorMain;