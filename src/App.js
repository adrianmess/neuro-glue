import React from 'react';
import AddCard from './AddCard';
import Note from './Note';
import './App.css';
import base from './firebase';
import FlashCardEditorMain from './FlashCardEditorMain';
import Header from './Header';
import Login from './Login';
import FlashCardSetTitles from './FlashCardSetTitles';

class App extends React.Component {
constructor(props){
  super(props);
  this.state = {
    cards: '',
    selectedCardCategory: '',
    selectedCardIndex: null,
    selectedCard: null,
    notes: {},
    isLoggedIn: false,
    userID: '',
    cardCategory: '',
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

  //keep user signed in after refresh

}

componentDidUpdate(){

}

// componentWillUnmount(){
//   base.removeBinding(this.refCards);
// }

  setUserId = uid => {
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
    // console.log(this.refCards)

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

  selectCardCategory = (category) => this.setState({
    selectedCardCategory: category
  })

  isLoggedInAction = (boolean) =>{
    boolean?
    this.setState({
      isLoggedIn: true
    }) :
    this.setState({
      isLoggedIn: false
    })
  }


  render() {
    return (
      <>


        {this.state.isLoggedIn?
        <div>
        {/* <div>
            <Header
              setUserId={this.setUserId}
              cards={this.state.cards}
              history={this.props.history}
              selectCardCategory={this.selectCardCategory}
            />
        </div>

        <FlashCardSetTitles
            cards={this.state.cards}
            selectedCardCategory={this.state.selectedCardCategory}
        /> */}

            <FlashCardEditorMain
              cards={this.state.cards}
              deleteCard={this.deleteCard}
              addCard={this.addCard}
              updateCard={this.updateCard}
              newCard={this.newCard}
              selectCard={this.selectCard}
              selectedCard={this.state.selectedCard}
              selectedCardIndex={this.state.selectedCardIndex}
              isLoggedIn={this.state.isLoggedIn}
              cardCategory={this.state.cardCategory}
              />
          </div>
          :
          <div>
            <Login
              isLoggedInAction={this.isLoggedInAction}
              setUserId={this.setUserId}/>
          </div>
        }

      </>
    );
  }

}

export default App;
