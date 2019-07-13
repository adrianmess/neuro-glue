import React from 'react';
import CardsList from './CardsList';
import './App.css';

class App extends React.Component {
  addCard() {
    alert("Hey!");
  }
  render() {
    return (
      <>

        <form className="cards-list-main" onSubmit={this.addCard}>
          <h2>Create Card</h2>
          <input className="card-front" type="text" placeholder="Front"></input>
          <input className="card-back" type="text" placeholder="Back"></input>
          <button className="button" type="submit">Add</button>
        </form>
        <CardsList/>

      </>
    );
  }

}

export default App;
