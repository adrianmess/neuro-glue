import React from 'react';
import CardsList from './CardsList';
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

        <form className="cards-list-main" onSubmit={this.addCard}>
          <h2>Create Card</h2>
          <input
          className="card-front"
          type="text"
          placeholder="Front"
          ref={this.cardFrontInput}
          />


          <input
          className="card-back"
          type="text"
          placeholder="Back"
          ref={this.cardBackInput}
          />
          <button className="button" type="submit">Add</button>
        </form>
        <CardsList/>

      </>
    );
  }

}

export default App;
