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
import SimpleAppMenuSmall from "./MaterialUI/SimpleAppMenuSmall";
import FlashCardSetsByTitle from "./MaterialUI/FlashCardSetsByTitle";
import MaterialCategoryList from "./MaterialUI/CategoryList";
import BigChart from "./charts/bigChart";

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
  }

  setUserId = uid => {
    this.setState({
      loggedIn: true,
      userID: uid
    });

    this.checkUIDExistance(uid);
  };

  checkUIDExistance = async uid => {
    // console.log("checkUID");
    await firestore
      .collection(`${uid}`)
      .get()
      .then(query => this.uidExistanceAction(query.size, uid));
  };
  uidExistanceAction = async (qSize, uid) => {
    if (qSize === 0) {
      await firestore
        .collection(`${uid}`)
        .doc(`Cards`)
        .set({});
    }
    this.rebaseSyncCards(uid);
  };
  rebaseSyncCards(uid) {
    this.refNotes = base.syncDoc(`${uid}/Cards`, {
      context: this,
      state: "cards"
    });
  }

  addTestScore = async cardScoresArray => {
    const { userID, currentCardSetID } = this.state;
    await firestore
      .collection(`${userID}`)
      .doc("Cards")
      .update({
        [`${currentCardSetID}.Scores`]: cardScoresArray
      });

    this.calcTestScoresAvg(userID, currentCardSetID);
  };

  // generate score average and update to firestore
  calcTestScoresAvg = (userID, currentCardSetID) => {
    const { cards } = this.state;
    const currentCardScores = cards[currentCardSetID]["Scores"];
    const allScores = [];
    currentCardScores.map(x => allScores.push(parseInt(x.scorePercentAsNum)));

    let avg = 0;
    for (let i = 0; i < allScores.length; i++) {
      avg += allScores[i];
    }

    const scoreAvg = (avg / allScores.length).toFixed(0);

    firestore
      .collection(`${userID}`)
      .doc("Cards")
      .update({
        [`${currentCardSetID}.ScoreAverage`]: scoreAvg
      });
  };

  addCard = (date, card) => {

    let userID = this.state.userID;
    let cardDate = "card123455187";
    firestore
      .collection(`${userID}`)
      .doc("Cards")
      .update({
        [`${cardDate}.Cards.date.back`]: "back of card update"
      });
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

  deleteCardSet = cardSetID => {
    const cards = { ...this.state.cards };

    if (cards[cardSetID] !== undefined) {
      delete cards[cardSetID];
      this.setState({
        cards,
        currentCardSetID: ""
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
              <div id="SimpleAppMenuSmall">
                <SimpleAppMenuSmall
                  clearSelectedCardSet={this.clearSelectedCardSet}
                  logout={this.logout}
                  selectedCardCategory={this.selectedCardCategory}
                />
              </div>

              <div id="SimpleAppMenu">
                <SimpleAppMenu
                  clearSelectedCardSet={this.clearSelectedCardSet}
                  logout={this.logout}
                  selectedCardCategory={this.selectedCardCategory}
                />
              </div>
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
                    currentCardSetID={this.state.currentCardSetID}
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
                    currentCardSetID={this.state.currentCardSetID}
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
