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
import Header from "./Header";
import Login from "./Login";
import FlashCardSetTitlesByCategory from "./FlashCardSetTitlesByCategory";
import FlashCardSetsByTitle from "./FlashCardSetsByTitle";
import FlashCardTest from "./FlashCardTest";
import FlashCardSetCategoriesList from "./FlashCardSetCategoriesList";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: "",
      selectedCardCategory: "",
      selectedCardIndex: null,
      selectedCard: null,
      notes: {},
      isLoggedIn: false,
      userID: "",
      cardCategory: "",
      redirect: false,
      // #########################
      currentCardSetID: "card123455187",
      currentCardSet: "",
      currentCardSetCategory: "",
      currentCardSetTitle: "",
      currentCardSetScores: "",
      currentCardSetCards: "",
      currentCardSetCardsCardDate: "",
      currentCardSetCardsCardFront: "",
      currentCardSetCardsCardFack: "",
      currentCardSetCardsCardFotes: ""
    };
    this.addOrUpdateCard = this.addOrUpdateCard.bind(this);
    // this.addCard = this.addCard.bind(this);
  }

  componentDidMount() {
    if (this.state.isLoggedIn == true) {
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
      card123455687: {
        Category: "JavaScript",
        CardSetTitle: "JavaScript Functions",
        Scores: {
          date: "score"
        },
        Cards: {
          date: {}
        }
      }
    };

    const JavaSCript = {
      CardSetTitle: "JavaScript Functions",
      Cards: {
        date: {
          back: "Answer",
          front: "the TERM",
          notes: "notes"
        }
      },
      Category: "JavaScript",
      Scores: {
        date: "score"
      }
    };

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

    firestore
      .collection(`${userID}`)
      .doc("Cards")
      .update({ JavaSCript });

    //ADD OR UPDATE cards in CARDS document

    // let cardsRef = firestore.collection(`${userID}`).doc('Cards')
    // return cardsRef.update({data})

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
    const cardsCopy = JSON.parse(JSON.stringify(this.state.cards));
    cardsCopy[index].front = cardFront;
    cardsCopy[index].back = cardBack;

    this.setState({
      cards: cardsCopy
    });
  };

  newCard = () => {
    this.setState({
      selectedCardIndex: "",
      selectedCard: ""
    });
  };

  deleteCard = key => {
    const cards = { ...this.state.currentCardSet };

    delete cards[key];
    this.setState({ currentCardSet: cards });
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

  selectedCardSet = event => {
    event.preventDefault();
    const { cards, currentCardSetID } = this.state;
    // console.log(cards[`${currentCardSetID}`]);
    const cardSet = cards[`${currentCardSetID}`];
    console.log(cardSet);
    const list = {};
    for (const card in cardSet) {
      console.log(cardSet[card]);
      const cardsList = cardSet[card];
      Object.assign(list, cardsList);
    }

    this.setState({
      currentCardSet: list
    });
  };

  saveCurrentCardSet = () => {
    this.setState({
      cards: this.state.currentCardSet
    });
  };

  setCurrentCardSetTitle = (cardSetTitle, cardSetID) => {
    this.setState({
      currentCardSetTitle: cardSetTitle,
      currentCardSetID: cardSetID
    });
    this.setCurrentCardSet(cardSetID);
  };

  setCurrentCardSet = cardSetID => {
    const allCards = { ...this.state.cards };
    const cards = allCards[cardSetID]["Cards"];
    this.setState({
      currentCardSet: cards
    });
  };

  isLoggedInAction = boolean => {
    boolean
      ? this.setState({
          isLoggedIn: true
        })
      : this.setState({
          isLoggedIn: false
        });
  };

  render() {
    const { currentCardSet, currentCardSetTitle, cards } = this.state;

    return (
      <>
        {this.state.isLoggedIn ? (
          <div>
            <Router>
              <Header
                setUserId={this.setUserId}
                cards={this.state.cards}
                history={this.props.history}
                userID={this.state.userID}
                selectCardCategory={this.selectCardCategory}
              />
              {/* <Link

                to={`/flashcards/:${category}`}>
                <span id="routerLink"
                  onClick={event => this.selectedCardSet(event)}>asdasd</span>
              </Link> */}

              {/* {routes.map(({ path, component: C, selectedCardCategory }) => (
                <Route
                  path={path}
                  render={(props) => <C {...props} selectedCardCategory={selectedCardCategory} />}
                />
              ))} */}

              <Route
                path={`/flashcards/:${this.state.selectedCardCategory}`}
                component={FlashCardEditorMain}
              />

              <Route
                path="/Categories"
                render={props => (
                  <FlashCardSetTitlesByCategory
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
                  />
                )}
              />
            </Router>

            <Router
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

              // ####################################
              userID={this.state.userID}
              saveCurrentCardSet={this.saveCurrentCardSet}
              currentCardSet={this.state.currentCardSet}
              currentCardSetID={this.state.currentCardSetID}
              currentCardSetCategory={this.state.currentCardSetCategory}
              currentCardSetTitle={this.state.currentCardSetTitle}
              currentCardSetScores={this.state.currentCardSetScores}
              currentCardSetCards={this.state.currentCardSetCards}
              currentCardSetCardsCardDate={this.state.currentCardSetCardsCardDate}
              currentCardSetCardsCardFront={this.state.currentCardSetCardsCardFront}
              currentCardSetCardsCardFack={this.state.currentCardSetCardsCardFack}
              currentCardSetCardsCardFotes={this.state.currentCardSetCardsCardFotes}
              />
              )}
            />
          </div>
        ) : (
          <div>
            <Login
              isLoggedInAction={this.isLoggedInAction}
              setUserId={this.setUserId}
            />
          </div>
        )}
      </>
    );
  }
}

export default App;
