import React from 'react';
import AddCard from './AddCard';
import Note from './Note';
import './App.css';
import base from './firebase';
import FlashCardEditorMain from './FlashCardEditorMain';
import { blockStatement } from '@babel/types';

class App extends React.Component {
constructor(props){
  super(props);
  this.state = {
    cards: {},
    selectedCardIndex: null,
    selectedCard: null,
    notes: {}
  }
}

componentDidMount(){
  this.refCards = base.syncDoc('User/Cards', {
    context: this,
    state: 'cards'
  });

  this.refNotes = base.syncDoc('User/Notes', {
    context: this,
    state: 'notes'
  })
}

componentWillUnmount(){
  base.removeBinding(this.refCards);
}


addCard = card => {
  // take copy of existing state
  const cards = { ...this.state.cards };
  // add new card to cards variable
  // Use Timestamp as keys
  cards[`card${Date.now()}`] = card;
  // set new fish object to state
  this.setState({
    cards,
    selectedCardIndex: null,
    selectCard: null,
  });
}

updateCard = (index, cardFront, cardBack) =>{
  const cardsCopy = JSON.parse(JSON.stringify(this.state.cards))
    cardsCopy[index].front = cardFront
    cardsCopy[index].back = cardBack

    this.setState({
      cards: cardsCopy
    })

}

deleteCard = (key) => {
  const cards = { ...this.state.cards};

  delete cards[key]
  this.setState({ cards })
}



  selectCard = (card, index) => this.setState({
    selectedCard: card,
    selectedCardIndex: index
  })

  render() {
    return (
      <>
      <FlashCardEditorMain
          cards={this.state.cards}
          deleteCard={this.deleteCard}
          addCard={this.addCard}
          updateCard={this.updateCard}
          selectCard={this.selectCard}
          selectedCard={this.state.selectedCard}
          selectedCardIndex={this.state.selectedCardIndex}
      />
      </>
    );
  }

}

export default App;
