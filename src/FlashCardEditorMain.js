import React from 'react';
import CardsList from './CardsList';
import CardEditor from './CardEditor';
import './FlashCardEditorMain.css';


class FlashCardEditorMain extends React.Component{
	constructor(props){
		super(props);
		this.state={
			whichItemActive: null,
			activeItemCardIndex: '',
		}

		this.setCardActive = this.setCardActive.bind(this);
		this.setEditorActive = this.setEditorActive.bind(this);
	}

	setCardActive(index){
		this.setState({
			whichItemActive: 'card',
			activeItemCardIndex: index
		})
	}

	setEditorActive(){
		this.setState({ whichItemActive: 'editor'})
	}


	render(){
		return(
			<>
			<div id="cardList">
					<CardsList
						cards={this.props.cards}
						deleteCard={this.props.deleteCard}
						selectCard={this.props.selectCard}
						selectedCardIndex={this.props.selectedCardIndex}
						whichItemActive={this.state.whichItemActive}
						setCardActive={this.setCardActive}
					/>
			</div>
			<div id="cardEditor">
					<CardEditor
						cards={this.props.cards}
						addCard={this.props.addCard}
						updateCard={this.props.updateCard}
						cardSelected={this.state.cardSelected}
						whichItemActive={this.state.whichItemActive}
						activeItemCardIndex={this.state.activeItemCardIndex}
						setEditorActive={this.setEditorActive}
					/>
			</div>
			</>
		);
	}
}

export default FlashCardEditorMain;