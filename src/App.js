import React from 'react';
import CardsList from './CardsList';
import AddCard from './AddCard';
import './App.css';

class App extends React.Component {

state = {
  cards: {}
};

addCard = card => {
  // take copy of existing state
  const cards = { ...this.state.cards };
  // add new card to cards variable
  cards[`card${Date.now()}`] = card;
  // set new fish object to state
  this.setState({
    cards: cards
  });
}

  render() {
    return (
      <>
        <CardsList/>
        <AddCard addCard={this.addCard} />
      </>
    );
  }

}

export default App;
