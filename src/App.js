import React from 'react';
import CardsList from './CardsList';
import AddCard from './AddCard';
import './App.css';

class App extends React.Component {


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
