import React from "react";
import Note from "./Note";
import "./App.css";
import firebase from "firebase/app";
import base, { firestore, firebaseApp } from "./firebase";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";
import FlashCardEditorMain from "./FlashCardEditorMain";
import Login from "./Login";
import FlashCardTest from "./FlashCardTest";
import FlashCardSetCategoriesList from "./FlashCardSetCategoriesList";
import SimpleAppMenu from "./MaterialUI/SimpleAppMenu";
import FlashCardSetsByTitle from "./MaterialUI/FlashCardSetsByTitle";
import MaterialCategoryList from "./MaterialUI/CategoryList";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: "",
      selectedCardCategory: "",
      selectedCardIndex: "",
      selectedCard: "",
      notes: {},
      userID: "",
      cardCategory: "",
      redirect: false,
      // #########################
      currentCardSetID: "",
      currentCardSet: "",
      currentCardSetCategory: "",
      currentCardSetTitle: "",
      currentCardSetScores: ""
    };
    this.addOrUpdateCard = this.addOrUpdateCard.bind(this);
  }

  componentDidMount() {
    if (this.state.isLoggedIn === true) {
      const userID = this.state.userID;
      this.refCards = base.syncDoc(`/User/${userID}`, {
        context: this,
        state: "cards"
      });
    }

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

  addOrUpdateCard(newCardSet) {
    let userID = this.state.userID;
    // console.log(this.state)
    let data = {
      card: {
        CardSetTitle: "JavaScript Functions",
        Cards: {
          date: {
            back: "Answer",
            front: "the TERM",
            notes: "notes"
          }
        },
        Category: "JavaSCript",
        Scores: {}
      },
      card123455187: {
        Cards: {
          "1564655054525": {
            back: "<p>asdasd</p>",
            front: "<p><em>asdasd</em></p>"
          },
          "1565222606874": {
            back: "<p>asdasd</p>",
            front: "<p>asdasd</p>"
          },
          "1565233966546": {
            back: "<p>asdasd</p>",
            front: "<p>asdasd</p>"
          },
          "1565234078559": {
            back: "<p>asdsad</p>",
            front: "<p>asdsa</p>"
          },
          "1565234164094": {
            back: "<p>asdasd</p>",
            front: "<p>asdasd</p>"
          },
          "1565234167750": {
            back: "<p>asdasd</p>",
            front: "<p>asdasd</p>"
          },
          "1565234213617": {
            back: "<p>asdsad</p>",
            front: "<p>asdasd</p>"
          },
          "1565234284539": {
            back: "<p>asdasd</p>",
            front: "<p>asdasd</p>"
          },
          "1565234427408": {
            back: "<p>asdasd</p>",
            front: "<p>is this being added?</p>"
          }
        }
      },
      carssd: {
        CardSetTitle: "JavaScript test",
        Cards: {
          date: {
            back: "Answer",
            front: "the TERM",
            notes: "notes"
          }
        },
        Category: "JavaSCript",
        Scores: {}
      },
      opposite: {
        CardSetTitle: "JavaScript Functions",
        Cards: {
          date: {
            back: "Answer",
            front: "the TERM",
            notes: "notes"
          }
        },
        Category: "Ruby",
        Scores: {}
      }
    };

    this.setState({ cards: data });

    // const JavaSCript = {
    //   CardSetTitle: "JavaScript Functions",
    //   Cards: {
    //     date: {
    //       back: "Answer",
    //       front: "the TERM",
    //       notes: "notes"
    //     }
    //   },
    //   Category: "JavaScript",
    //   Scores: {
    //     date: {}
    //   }
    // };

    // const carssd = {
    //   Category: 'JavaSCript',
    //   CardSetTitle: 'JavaScript Functions',
    //   Scores: {
    //     date: 'score'
    //   },
    //   Cards: {
    //     date: {
    //       front: 'the TERM',
    //       back: 'Answer',
    //       notes: 'notes'
    //     }
    //   }
    // };

    // console.log(newCardSet);

    // SET DATA !!!!!
    // console.log(data)

    // firestore.collection(`${userID}`).doc('Cards').update({
    //   [`${cardDate}.Cards.date.back`]: "back of card update"
    // })

    // firestore
    //   .collection(`${userID}`)
    //   .doc("Cards")
    //   .update({ JavaSCript });

    //ADD OR UPDATE cards in CARDS document

    // let cardsRef = firestore.collection(`${userID}`).doc("Cards");
    // return cardsRef.update({ data });

    // base.syncDoc(`${userID}/Cards`, data)
    //   .then(() => {
    //     //document is updated
    //   }).catch(err => {
    //     //handle error
    //   });
  }

  // componentWillUnmount(){
  //   base.removeBinding(this.refCards);
  // }

  setUserId = uid => {
    this.setState({
      loggedIn: true,
      userID: uid
    });
    // this.refNotes = base.syncDoc(`User/${uid}`, {
    //   context: this,
    //   state: 'cards'
    // })
    this.refNotes = base.syncDoc(`${uid}/Cards`, {
      context: this,
      state: "cards"
    });

    // this.refCards = base.syncDoc('User/Cards', {
    //   context: this,
    //   state: 'cards'
    // });
    // console.log(this.refCards)
  };

  addTestScore = async (date, scoreRatio) => {
    const { userID, currentCardSetID } = this.state;
    await firestore
      .collection(`${userID}`)
      .doc("Cards")
      .update({
        [`${currentCardSetID}.Scores.${date}`]: `${scoreRatio}`
      });

    this.calcTestScoresAvg(userID, currentCardSetID);
  };

  // generate score average and update to firestore
  calcTestScoresAvg = (userID, currentCardSetID) => {
    const { cards } = this.state;
    const currentCardScores = cards[currentCardSetID]["Scores"];
    const scores = Object.values(currentCardScores).map(x => eval(x));

    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    const addedScores = scores.reduce(reducer);
    const scoreAvg = ((addedScores / scores.length) * 100).toFixed(0);

    firestore
      .collection(`${userID}`)
      .doc("Cards")
      .update({
        [`${currentCardSetID}.ScoreAverage`]: scoreAvg
      });
  };

  addCard = (date, card) => {
    console.log(card);

    let userID = this.state.userID;
    let cardDate = "card123455187";
    firestore
      .collection(`${userID}`)
      .doc("Cards")
      .update({
        [`${cardDate}.Cards.date.back`]: "back of card update"
      });

    // console.log(cardsRef)
    // return cardsRef.update({ data })
    //   const card = {
    //    `${cardIndex}`: {
    //       front: cardFront,
    //       back: cardBack
    //     }
    //   }
    // console.log(card);
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
    //  ## const cards = { ...this.state.cards };
    // add new card to cards variable
    // Use Timestamp as keys
    // ##  cards[`card${Date.now()}`] = card;
    // set new fish object to state
    // ##
    //   this.setState({
    //     cards,
    //     selectedCardIndex: '',
    //     selectedCard: '',
    //   });
    // ##
  };

  updateCard = (index, cardFront, cardBack) => {
    const { currentCardSetID } = this.state;
    const cards = this.state.cards;
    const updatedCard = cards[currentCardSetID]["Cards"][index];

    updatedCard.front = cardFront;
    updatedCard.back = cardBack;

    this.setState({ cards });
  };

  newCard = () => {
    this.setState({
      selectedCardIndex: "",
      selectedCard: ""
    });
  };

  deleteCard = (e, index) => {
    e.preventDefault();
    const { currentCardSetID } = this.state;
    const cards = this.state.cards;
    const card = cards[currentCardSetID]["Cards"];
    delete card[index];

    this.setState({ cards });
  };

  deleteCardSet = ( cardSetID) => {
    const cards = { ...this.state.cards };

    console.log(cards[cardSetID]);
    console.log(cardSetID);

    if (cards[cardSetID] !== undefined) {
      delete cards[cardSetID];
      console.log(cards);
      this.setState({
        cards
      });
    }
  };

  selectCard = (card, index) =>
    this.setState({
      selectedCard: card,
      selectedCardIndex: index
    });

  selectCardCategory = (e, CardCategory) => {
    e.preventDefault();
    this.setState({
      selectedCardCategory: CardCategory,
      redirect: true
    });

    // document.getElementById('routerLink').click()
  };

  // selectedCardSet = () => {
  //   // event.preventDefault();
  //   const { cards, currentCardSetID } = this.state;
  //   // console.log(cards[`${currentCardSetID}`]);
  //   const cardSet = cards[`${currentCardSetID}`];
  //   // console.log(Object.keys(cardSet).map(key => cardSet[key]));
  //   // const list = {};
  //   // for (const card in cardSet) {
  //   //   // console.log(cardSet[card]);
  //   //   const cardsList = cardSet[card];
  //   //   Object.assign(list, cardsList);
  //   // }

  //   // if (!cardSetEmpty) {
  //   //   this.setState({
  //   //     currentCardSet: list
  //   //   });
  //   // }
  // };

  setCurrentCardSetTitle = (cardSetTitle, cardSetID) => {
    this.setState({
      currentCardSetTitle: cardSetTitle,
      currentCardSetID: cardSetID
    });
    this.setCurrentCardSet(cardSetID);
  };

  setCurrentCardSet = cardSetID => {
    const allCards = { ...this.state.cards };
    // console.log(allCards["1566766055824"]["Cards"]);
    const cards = allCards[cardSetID]["Cards"];
    this.setState({
      currentCardSet: cards
    });
  };

  setCurrentCardSetID = cardSetID => {
    this.setState({
      currentCardSetID: cardSetID
    });
  };

  clearSelectedCardSet = e => {
    this.setState({
      currentCardSet: "",
      currentCardSetID: "",
      currentCardSetTitle: ""
    });
  };

  editSelectedCard = (key, cardfront, cardback) => {
    const card = { front: cardfront, back: cardback };
    // console.log(card)
    this.setState({
      selectedCardIndex: key,
      selectedCard: card
    });
  };

  logout = async event => {
    event.preventDefault();
    await firebase.auth().signOut();
    this.setState({ userID: null });
  };

  render() {
    const { currentCardSet, currentCardSetTitle, cards } = this.state;

    return (
      <>
        {this.state.userID ? (
          <div id="main">
            <Router>
              <SimpleAppMenu
                clearSelectedCardSet={this.clearSelectedCardSet}
                logout={this.logout}
                selectedCardCategory={this.selectedCardCategory}
              />

              <Route
                path={`/flashcards/:${this.state.selectedCardCategory}`}
                component={FlashCardEditorMain}
              />

              <Route
                path="/Categories"
                render={props => (
                  <MaterialCategoryList
                    cards={cards}
                    selectCardCategory={this.selectCardCategory}
                  />
                )}
              />

              <Route
                path={`/Category/${this.state.selectedCardCategory}`}
                render={props => (
                  <FlashCardSetCategoriesList
                    cards={cards}
                    selectedCardCategory={this.state.selectedCardCategory}
                    setCurrentCardSetTitle={this.setCurrentCardSetTitle}
                  />
                )}
              />

              <Route
                path="/FlashCards"
                render={props => (
                  <FlashCardSetsByTitle
                    cards={cards}
                    setCurrentCardSetTitle={this.setCurrentCardSetTitle}
                    setCurrentCardSetID={this.setCurrentCardSetID}
                  />
                )}
              />

              <Route
                path={`/FlashCardTest/${currentCardSetTitle}`}
                render={props => (
                  <FlashCardTest
                    cards={cards}
                    currentCardSetTitle={currentCardSetTitle}
                    currentCardSet={currentCardSet}
                    addTestScore={this.addTestScore}
                  />
                )}
              />

              <Route
                path="/FlashCardEditor"
                render={props => (
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
                    addOrUpdateCard={this.addOrUpdateCard}
                    clearSelectedCardSet={this.clearSelectedCardSet}
                    deleteCardSet={this.deleteCardSet}
                    // ####################################
                    userID={this.state.userID}
                    selectedCardSet={this.selectedCardSet}
                    saveCurrentCardSet={this.saveCurrentCardSet}
                    setCurrentCardSetID={this.setCurrentCardSetID}
                    editSelectedCard={this.editSelectedCard}
                    currentCardSetID={this.state.currentCardSetID}
                  />
                )}
              />
            </Router>
          </div>
        ) : (
          <div>
            <Login setUserId={this.setUserId} />
          </div>
        )}
      </>
    );
  }
}

export default App;
