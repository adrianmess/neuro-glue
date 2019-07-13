import React from 'react';
import CardsList from './CardsList';
import AddCard from './AddCard';
import './App.css';

class App extends React.Component {

state = {
  cards: {}
};

addCard = card => {
  console.log('fish')
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
