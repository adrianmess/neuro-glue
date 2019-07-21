import React from 'react';
import CardsList from './CardsList';
import CardEditor from './CardEditor';
import './FlashCardEditorMain.css';


class FlashCardEditorMain extends React.Component{
	render(){
		return(
			<>
			<div id="cardList">
					<CardsList
						cards={this.props.cards}
						deleteCard={this.props.deleteCard}
					/>
			</div>
			<div id="cardEditor">
					<CardEditor
						cards={this.props.cards}
						addCard={this.props.addCard}
					/>
			</div>


			</>
		);
	}
}

export default FlashCardEditorMain;