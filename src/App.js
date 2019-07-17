import React from 'react';
import CardsList from './CardsList';
import AddCard from './AddCard';
import './App.css';
import base from './firebase';

class App extends React.Component {

state = {
  cards: {},
  notes: {}
};

componentDidMount(){
  this.refCards = base.syncDoc('User/Cards', {
    context: this,
    state: 'cards'
  });

  this.refNotes = base.syncDoc('User/Notes')
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

  render() {
    return (
      <>
        <CardsList
        cards={this.state.cards}
        deleteCard={this.deleteCard}
         />
        <AddCard addCard={this.addCard} />
      </>
    );
  }

}

export default App;
