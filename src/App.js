import React from 'react';
import AddCard from './AddCard';
import Note from './Note';
import './App.css';
import base from './firebase';
import FlashCardEditorMain from './FlashCardEditorMain';
import Header from './Header';
import Login from './Login';

class App extends React.Component {
constructor(props){
  super(props);
  this.state = {
    cards: '',
    selectedCardIndex: null,
    selectedCard: null,
    notes: {},
    isLoggedIn: false,
    userID: '',
  }
}

componentDidMount(){
  // if (this.state.isLoggedIn == true) {
  // const userID = this.state.userID;
  // this.refCards = base.syncDoc(`/User/${userID}`, {
  //   context: this,
  //   state: 'cards'
  // });
  // this.refCards = base.syncDoc('/User/Cards', {
  //   context: this,
  //   state: 'cards'
  // });
  // }

  // this.refNotes = base.syncDoc('User/Notes', {
  //   context: this,
  //   state: 'notes'
  // })
}

componentDidUpdate(){

}

// componentWillUnmount(){
//   base.removeBinding(this.refCards);
// }

  userLogin = uid => {
    this.setState({
      loggedIn: true,
      userID: uid
    })
    // this.refNotes = base.syncDoc(`User/${uid}`, {
    //   context: this,
    //   state: 'cards'
    // })
    this.refNotes = base.syncDoc(`${uid}/Cards`, {
      context: this,
      state: 'cards'
    })

    // this.refCards = base.syncDoc('User/Cards', {
    //   context: this,
    //   state: 'cards'
    // });
    console.log(this.refCards)

    const uids = { user: uid }
    this.setState({
      userid: uids
    })
  }

addCard = card => {

  // if (this.state.isLoggedIn == false) {
  //   this.setState({
  //     cards: card
  //   })

  //   localStorage
  //   .setItem('cards',
  //   JSON.stringify(this.state.cards));
  // }
  // localStorage
  //   .setItem('cards',
  //     JSON.stringify(this.state.cards));


  // if (this.state.loggedIn == false) {
  //   localStorage
  //     .setItem('cards',
  //       JSON.stringify(this.state.cards));
  // } else {

  // take copy of existing state
  const cards = { ...this.state.cards };
  // add new card to cards variable
  // Use Timestamp as keys
  cards[`card${Date.now()}`] = card;
  // set new fish object to state
  this.setState({
    cards,
    selectedCardIndex: '',
    selectedCard: '',
  });

}

updateCard = (index, cardFront, cardBack) =>{
  const cardsCopy = JSON.parse(JSON.stringify(this.state.cards))
    cardsCopy[index].front = cardFront
    cardsCopy[index].back = cardBack

    this.setState({
      cards: cardsCopy
    })

}

  newCard = () => {
    this.setState({
      selectedCardIndex: '',
      selectedCard: '',
    })
  }

deleteCard = (key) => {
  const cards = { ...this.state.cards};

  delete cards[key]
  this.setState({ cards })
}



  selectCard = (card, index) => this.setState({
    selectedCard: card,
    selectedCardIndex: index
  })

  render() {
    return (
      <>


        {this.isLoggedIn?
        <div>
        <div>
            <Header
              userLogin={this.userLogin}
            />
        </div>

            <div>
            <FlashCardEditorMain
              cards={this.state.cards}
              deleteCard={this.deleteCard}
              addCard={this.addCard}
              updateCard={this.updateCard}
              newCard={this.newCard}
              selectCard={this.selectCard}
              selectedCard={this.state.selectedCard}
              selectedCardIndex={this.state.selectedCardIndex}
              isLoggedIn={this.state.isLoggedIn} />
            </div>

          </div> : <div><Login /></div>  }

      </>
    );
  }

}

export default App;
