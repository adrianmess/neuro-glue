import React from "react";
import CardEditorList from "./CardEditorList";
import CardEditor from "./CardEditor";
import { firestore } from "./firebase";

import "./FlashCardEditorMain.css";

class FlashCardEditorMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allCards: {},
      cardSetTitle: "",
      cardSetCategory: "",
      cardSetDate: Date.now(),
      cardSetID: Date.now(),
      currentardSet: "",
      cardDate: "",
      cardTitle: "",
      cardFront: "",
      cardBack: "",
      cardNote: "",
      editCardState: ""
    };

    this.createNewCardSet = this.createNewCardSet.bind(this);
  }

  //grab current card set from firebase and store locally in state

  // setDocToState = (allCards) =>{
  // 	this.setState({
  // 		allCards: allCards
  // 	})
  // }

  componentWillMount() {
    const { cardSetID } = this.props;
    console.log("component will mount check fire base");
    this.createNewCardSet();
  }

  componentWillUnmount() {
    console.log("FlashCardEditorMain unmounted");
  }

  handleChange = event => {
    const { currentCardSetID, userID } = this.props;
    const { cardSetTitle } = this.state;

    this.setState({
      cardSetTitle: event.target.value
    });

    this.props.selectedCardSet();
  };

  componentDidUpdate() {
    const { currentCardSetID, userID } = this.props;
    const { cardSetTitle } = this.state;
    setTimeout(function() {
      firestore
        .collection(`${userID}`)
        .doc("Cards")
        .update({
          [`${currentCardSetID}.CardSetTitle`]: `${cardSetTitle}`
        });
    }, 2000);
  }

  selectedCards() {}

  createNewCardSet = () => {
    // let cardSetDate = this.state.cardSetDate;
    let cardSetID = Date.now();
    // const Cards
    let newCardSet = {
      [`cardSet${cardSetID}`]: {
        CardSetTitle: `${this.state.cardSetTitle}`,
        Category: `${this.state.cardSetCategory}`,
        Cards: `${this.state.cardSet}`
      }
    };

    this.props.setCurrentCardSetID(cardSetID);
    console.log("create new card set");
    this.setState({ allCards: newCardSet });
    // RESET
    // this.props.addOrUpdateCard(newCardSet);
  };

  addCard = card => {
    console.log(card);
    const cards = { ...this.state.cardSet };
    cards[`card${Date.now()}`] = card;

    this.setState({ cardSet: cards });
  };

  alertMissingTitle = () => {
    const alert = document.getElementById("alert_missing_title");
    alert.style.visibility = "initial";
    setTimeout(function() {
      alert.style.visibility = "hidden";
    }, 2000);
  };

  setCardState = cardState => {
    this.setState({
      editCardState: cardState
    });
  };

  render() {
    return (
      <>
        <div id="alert_missing_title">
          <h4>
            Before you create a card you must a Title for the Flash Card Set
          </h4>
        </div>
        <div id="flashCardEditorContainer">
          <p>
            <input
              placeholder="FlashCard Set Title"
              type="text"
              onChange={this.handleChange}
              value={this.state.cardSetTitle}
            />
            <input
              placeholder="FlashCard Set Category"
              type="text"
              onChange={this.handleChange}
              value={this.state.cardSetCategory}
            />
          </p>
          <span />

          <button>Delete Set</button>
          <button
            onClick={this.props.addOrUpdateCard}
            // onClick={this.createNewCardSet}
          >
            Save
          </button>

          <div id="cardList">
            <CardEditorList
              cards={this.props.cards}
              deleteCard={this.props.deleteCard}
              // selectCard={this.props.selectCard}
              // cardCategory={this.props.cardCategory}

              currentCardSet={this.props.currentCardSet}
              currentCardSetID={this.props.currentCardSetID}
              currentCardSetCategory={this.props.currentCardSetCategory}
              currentCardSetTitle={this.props.currentCardSetTitle}
              currentCardSetScores={this.props.currentCardSetScores}
              currentCardSetCards={this.props.currentCardSetCards}
              currentlySelectedCardID={this.props.currentlySelectedCardID}
              currentCardSetCardsCardFront={
                this.props.currentCardSetCardsCardFront
              }
              currentCardSetCardsCardFack={
                this.props.currentCardSetCardsCardFack
              }
              currentCardSetCardsCardFotes={
                this.props.currentCardSetCardsCardFotes
              }
              setCurrentCardSet={this.props.setCurrentCardSet}
              selectedCardSet={this.props.selectedCardSet}
              editSelectedCard={this.props.editSelectedCard}
              editCardState={this.state.editCardState}
              setCardState={this.setCardState}
            />
          </div>
          <div id="cardEditor">
            <CardEditor
              cards={this.props.cards}
              addCard={this.addCard}
              updateCard={this.props.updateCard}
              newCard={this.props.newCard}
              newCardSet={this.newCardSet}
              selectedCard={this.props.selectedCard}
              selectedCardIndex={this.props.selectedCardIndex}
              //   ############################
              cardSet={this.state.cardSet}
              cardSetTitle={this.state.cardSetTitle}
              alertMissingTitle={this.alertMissingTitle}
              setCurrentCardSetID={this.props.setCurrentCardSetID}
              editCardState={this.state.editCardState}
              setCardState={this.setCardState}
              //   ############################
              userID={this.props.userID}
              currentCardSetID={this.props.currentCardSetID}
              currentCardSetCategory={this.props.currentCardSetCategory}
              currentCardSetTitle={this.props.currentCardSetTitle}
              currentCardSetScores={this.props.currentCardSetScores}
              currentCardSetCards={this.props.currentCardSetCards}
              currentlySelectedCardID={this.props.currentlySelectedCardID}
              currentCardSetCardsCardFront={
                this.props.currentCardSetCardsCardFront
              }
              currentCardSetCardsCardFack={
                this.props.currentCardSetCardsCardFack
              }
              currentCardSetCardsCardFotes={
                this.props.currentCardSetCardsCardFotes
              }
            />
          </div>
        </div>
      </>
    );
  }
}

export default FlashCardEditorMain;
