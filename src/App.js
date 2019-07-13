import React from 'react';
import CardsList from './CardsList';
import AddCard from './AddCard';
import './App.css';

class App extends React.Component {
  cardFrontInput = React.createRef();
  cardBackInput = React.createRef();

  addCard = event => {
    // stop form from submitting
    event.preventDefault();
    //get text from input
    console.log(this.cardFrontInput.current.value);
    console.log(this.cardBackInput.current.value);

  }
  render() {
    return (
      <>
        <CardsList/>
        <AddCard/>
      </>
    );
  }

}

export default App;
