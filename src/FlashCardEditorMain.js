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
      cardSetDate: Date.now(),
      cardSet: {},
      cardFront: "test-CardFront",
      cardBack: "test-CardBack",
      cardNote: "test-Notes"
    };
    this.createNewCardSet = this.createNewCardSet.bind(this);
  }

  //grab current card set from firebase and store locally in state

  // setDocToState = (allCards) =>{
  // 	this.setState({
  // 		allCards: allCards
  // 	})
  // }

  handleChange = event => {
    this.setState({
      cardSetTitle: event.target.value
    });
    // this.props.createTitle(this.state.cardCategory)
  };

  selectedCards() {}

  createNewCardSet = () => {
    const cardSetDate = this.state.cardSetDate;
    // const Cards
    const newCardSet = {
      [`cardSet${cardSetDate}`]: {
        CardSetTitle: `${this.state.cardSetTitle}`,
        Category: `${this.state.cardSetCategory}`,
        Cards: JSON.stringify(`${this.state.cardSet}`)
      }
    };

    console.log(this.state.cardSet);
    this.props.addOrUpdateCard(newCardSet);
  };

  addCard = card => {
    console.log(card);
    const cards = { ...this.state.cardSet };
    cards[`card${Date.now()}`] = card;

    this.setState({ cardSet: cards });
  };

  render() {
    return (
      <>
        <div id="flashCardEditorContainer">
          <p>
            <input
              placeholder="FlashCard Set Title"
              type="text"
              onChange={this.handleChange}
              value={this.state.cardSetTitle}
            />
          </p>
          <span />

          <button>Delete Set</button>
          <button
            // onClick={this.props.saveCurrentCardSet}
            onClick={this.createNewCardSet}
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
              currentCardSetCardsCardDate={
                this.props.currentCardSetCardsCardDate
              }
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
          <div id="cardEditor">
            <CardEditor
              cards={this.props.cards}
              addCard={this.addCard}
              updateCard={this.props.updateCard}
              newCard={this.props.newCard}
              newCardSet={this.newCardSet}
              selectedCard={this.props.selectedCard}
			  selectedCardIndex={this.props.selectedCardIndex}

			  cardSetTitle={this.state.cardSetTitle}

              userID={this.props.userID}
              currentCardSetID={this.props.currentCardSetID}
              currentCardSetCategory={this.props.currentCardSetCategory}
              currentCardSetTitle={this.props.currentCardSetTitle}
              currentCardSetScores={this.props.currentCardSetScores}
              currentCardSetCards={this.props.currentCardSetCards}
              currentCardSetCardsCardDate={
                this.props.currentCardSetCardsCardDate
              }
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
