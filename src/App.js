import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <>

      <form className="cards-list-main">
        <h2>Create Card</h2>
        <input className="card-front" type="text" placeholder="Front"></input>
        <input className="card-back" type="text" placeholder="Back"></input>
        <button type="submit">Add</button>
      </form>

    </>
  );
}

export default App;
