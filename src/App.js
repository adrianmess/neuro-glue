import React from 'react';
import AddCard from './AddCard';
import Note from './Note';
import './App.css';
import base from './firebase';
import FlashCardEditorMain from './FlashCardEditorMain';

class App extends React.Component {

state = {
  cards: {},
  selectedCardIndex: {},
  notes: {}
};

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
    cards
  });
}

deleteCard = (key) => {
  const cards = { ...this.state.cards};

  delete cards[key]
  this.setState({ cards })
}

selectCard = (index) =>{
console.log('State select card function');
}

  render() {
    return (
      <>
      <FlashCardEditorMain
          cards={this.state.cards}
          deleteCard={this.deleteCard}
          addCard={this.addCard}
          selectCard={this.selectCard}
          selectedCardIndex={this.state.selectedCardIndex}
      />
      </>
    );
  }

}

export default App;
