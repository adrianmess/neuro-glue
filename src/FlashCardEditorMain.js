import React from 'react';
import CardsList from './CardsList';
import CardEditor from './CardEditor';


class FlashCardEditorMain extends React.Component{
	render(){
		return(
			<>
			<CardsList
				cards={this.props.cards}
				deleteCard={this.props.deleteCard}
			/>
			<CardEditor
					cards={this.props.cards}
			/>

			</>
		);
	}
}

export default FlashCardEditorMain;