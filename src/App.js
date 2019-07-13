import React from 'react';
import CardsList from './CardsList';
import './App.css';

class App extends React.Component {
  handleClick() {
    alert("Hey!");
  }
  render() {
    return (
      <>

        <form className="cards-list-main">
          <h2>Create Card</h2>
          <input className="card-front" type="text" placeholder="Front"></input>
          <input className="card-back" type="text" placeholder="Back"></input>
          <button className="button" type="submit" onClick={this.handleClick}>Add</button>
        </form>
        <CardsList/>

      </>
    );
  }

}

export default App;
