import React from "react";
import CardEditor from "./CardEditor";
import firebase from "firebase/app";
import { firestore } from "./firebase";

import DeleteSetButton from "./MaterialUI/CardEditor_DeleteSet_Button";
import CategorySelect from "./MaterialUI/CardEditor_CategorySelect_Button";

import MaterialCardEditorList from "./MaterialUI/CardEditorList";

import "./FlashCardEditorMain.css";
import { ContactSupportOutlined } from "@material-ui/icons";

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
      editCardState: "",
      uniqueCategories: []
    };

    this.cardEditorRef = React.createRef();
    this.createNewCardSet = this.createNewCardSet.bind(this);
  }

  componentWillMount() {
    const { currentCardSetID } = this.props;

    if (currentCardSetID === "") {
      this.createNewCardSet();
    } else {
      this.loadCardInfo(currentCardSetID);
    }
  }
  loadCardInfo = currentCardSetID => {
    const card = { ...this.props.cards };
    const cardSetTitle = card[currentCardSetID]["CardSetTitle"];
    const cardSetCategory = card[currentCardSetID]["Category"];
    this.setState({
      cardSetTitle,
      cardSetCategory
    });
  };

  componentWillUnmount = () => {
    const allCards = { ...this.props.cards };
    const { currentCardSetID, userID } = this.props;
    const { cardSetTitle, cardSetCategory } = this.state;
    // const cardSetUndefined = allCards[currentCardSetID] === undefined;
    const cardSetUndefined = Object.values(x => allCards[currentCardSetID][x])
      .length;
    // const noChars = new RegExp(/^\W*$/);

    if (
      cardSetUndefined === (undefined || 0) &&
      cardSetTitle === "" &&
      cardSetCategory === ""
    ) {
      firestore
        .collection(`${userID}`)
        .doc("Cards")
        .update({
          [`${currentCardSetID}`]: firebase.firestore.FieldValue.delete()
        });
      this.props.clearSelectedCardSet();
    }
  };

  handleTitleChange = event => {
    this.setState({
      cardSetTitle: event.target.value
    });
  };

  setCardEditorHeight = height => {
    document
      .getElementById("cardEditor")
      .style.setProperty("height", height + "px", "important");
  };

  componentDidUpdate() {
    const { currentCardSetID, userID } = this.props;
    const { cardSetTitle, cardSetCategory } = this.state;
    const spaceStart = new RegExp(/^\s/);
    const noChars = new RegExp(/^\W*$/);

    if (
      cardSetTitle &&
      cardSetCategory !== undefined &&
      currentCardSetID !== ""
    ) {
      firestore
        .collection(`${userID}`)
        .doc("Cards")
        .update({
          [`${currentCardSetID}.CardSetTitle`]: `${cardSetTitle}`
        });

      firestore
        .collection(`${userID}`)
        .doc("Cards")
        .update({
          [`${currentCardSetID}.Category`]: `${cardSetCategory}`
        });
      // }, 2000);
    }
  }

  updateCategory = category => {
    this.setState({
      cardSetCategory: category
    });
  };

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
    this.setState({ allCards: newCardSet });
    // RESET
    // this.props.addOrUpdateCard(newCardSet);
  };

  addCard = card => {
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

  cardListEmptyCheck = e => {
    e.preventDefault();
    const cardSet = this.props.cards;
    const cardSetID = this.props.currentCardSetID;
    const cards = cardSet[cardSetID];
    const cardsListLength = Object.keys(cards["Cards"]).length;
    if (cardsListLength === 0) {
      this.setState({
        editCardState: ""
      });
    }
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
          <div id="flashCardEditorContainer_top_fixed">
            <h2>Flash Card Editor</h2>
            <div id="flashCardEditor_input_fields">
              {this.state.cardSetTitle !== "" ? (
                <input
                  id="input-with-title"
                  placeholder=""
                  type="text"
                  onChange={this.handleTitleChange}
                  value={this.state.cardSetTitle}
                />
              ) : (
                <input
                  id="input-no-title"
                  placeholder="Title"
                  type="text"
                  onChange={this.handleTitleChange}
                  value={this.state.cardSetTitle}
                />
              )}

              <br />
            </div>

            <div id="card_editor_buttons">
              <div id="DeleteSetButton">
                <DeleteSetButton />
              </div>
              <div id="SelectCategoryButton">
                <CategorySelect
                  cards={this.props.cards}
                  currentCardSetID={this.props.currentCardSetID}
                  cardSetCategory={this.state.cardSetCategory}
                  currentCardSetID={this.props.currentCardSetID}
                  userID={this.props.userID}
                  updateCategory={this.updateCategory}
                />
              </div>
            </div>
          </div>
          <div id="card_editor_main-list-and-editor">
            <div id="cardListContainer">
              <div id="cardList">
                <MaterialCardEditorList
                  id="cardListComponent"
                  cards={this.props.cards}
                  deleteCard={this.props.deleteCard}
                  cardListEmptyCheck={this.cardListEmptyCheck}
                  currentCardSetID={this.props.currentCardSetID}
                  selectedCardSet={this.props.selectedCardSet}
                  editSelectedCard={this.props.editSelectedCard}
                  editCardState={this.state.editCardState}
                  setCardState={this.setCardState}
                />
              </div>
            </div>

            <div id="cardEditor" ref={this.cardEditorRef}>
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
                setCardEditorHeight={this.setCardEditorHeight}
                //   ############################
                userID={this.props.userID}
                currentCardSetID={this.props.currentCardSetID}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default FlashCardEditorMain;
