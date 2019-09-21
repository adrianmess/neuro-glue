import React from "react";
import ReactQuill from "react-quill";
import { firestore } from "./firebase";

import "react-quill/dist/quill.snow.css";
import "./CardEditor.css";
import "./FlashCardEditorMain.css";
import PlusButton from "./MaterialUI/AddPlusButton";
import NewCardButton from "./MaterialUI/CardEditor_NewCard_Button";
import UpdateCardButton from "./MaterialUI/CardEditor_Update_Button";

class CardEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      cardFront: "",
      cardBack: "",
      cardIndex: "null"
    };

    this.quillContainer = React.createRef();

    this.handleChangeFront = this.handleChangeFront.bind(this);
    this.handleChangeBack = this.handleChangeBack.bind(this);
    this.addCard = this.addCard.bind(this);
    // this.bottomActive = this.bottomActive.bind(this);
    // this.topActive = this.topActive.bind(this);
  }

  handleChangeFront = async value => {
    await this.setState({ cardFront: value });
    this.sendQuillContainerHeight();
  };

  handleChangeBack = async value => {
    await this.setState({ cardBack: value });
    this.sendQuillContainerHeight();
  };

  sendQuillContainerHeight = () => {
    this.props.setCardEditorHeight(this.quillContainer.current.clientHeight);
  };

  topActive() {
    const topToolBar = document.getElementsByClassName("ql-toolbar")[0];
    const bottomToolBar = document.getElementsByClassName("ql-toolbar")[1];
    topToolBar.style.visibility = "inherit";
    bottomToolBar.style.visibility = "hidden";
  }

  bottomActive() {
    const topToolBar = document.getElementsByClassName("ql-toolbar")[0];
    const bottomToolBar = document.getElementsByClassName("ql-toolbar")[1];
    topToolBar.style.visibility = "hidden";
    bottomToolBar.style.visibility = "inherit";
  }

  // ############################################
  componentDidUpdate = () => {
    // console.log(this.props.selectedCardIndex);
    if ((this.props.selectedCard && this.props.selectedCardIndex) !== "") {
      if (
        this.props.selectedCardIndex !== this.state.cardIndex &&
        this.props.editCardState !== "newCard"
      ) {
        this.setState({
          cardFront: this.props.selectedCard.front,
          cardBack: this.props.selectedCard.back,
          cardIndex: this.props.selectedCardIndex
        });

        //   if (this.props.selectedCardIndex === this.state.index) {
      }
    }
  };
  // ############################################

  // ############################################
  createCard = event => {
    event.preventDefault();
    const { cardFront, cardBack } = this.state;
    // const date = Date.now();
    const card = {
      front: cardFront,
      back: cardBack
    };

    this.props.addCard(card);
  };
  // ############################################

  updateCard = () => {
    const index = this.state.cardIndex;
    const cardFront = this.state.cardFront;
    const cardBack = this.state.cardBack;
    this.props.updateCard(index, cardFront, cardBack);
  };

  addCard = () => {
    const { cardFront, cardBack } = this.state;
    const {
      userID,
      cardSetTitle,
      cardSet,
      currentCardSetID,
      setCurrentCardSetID
    } = this.props;
    const cdate = Date.now();

    if ((cardFront && cardBack) === "") {
      return null;
    } else {
      firestore
        .collection(`${userID}`)
        .doc("Cards")
        .update({
          [`${currentCardSetID}.Cards.${cdate}.front`]: `${cardFront}`
        });
      firestore
        .collection(`${userID}`)
        .doc("Cards")
        .update({
          [`${currentCardSetID}.Cards.${cdate}.back`]: `${cardBack}`
        });
    }

    this.setState({
      cardFront: "",
      cardBack: "",
      cardIndex: ""
    });
  };

  newCard = () => {
    this.props.setCardState("newCard");
    this.setState({
      cardFront: "",
      cardBack: "",
      cardIndex: ""
    });
  };

  render() {
    return (
      <div id="reactQuill-container" ref={this.quillContainer}>
        <div id="reactQuill-subContainer">
          <div id="top-quill" onClick={this.topActive}>
            <ReactQuill
              name="front"
              value={this.state.cardFront ? this.state.cardFront : ""}
              onChange={this.handleChangeFront}
              className="reactQuillCustom"
            />
          </div>

          <div id="bottom-quill" onClick={event => this.bottomActive(event)}>
            <ReactQuill
              name="back"
              value={this.state.cardBack ? this.state.cardBack : ""}
              onChange={this.handleChangeBack}
              className="reactQuillCustom"
            />
          </div>
        </div>

        {this.props.editCardState === "updateCard" ? (
          <div id="update_new_card_button">
            <span id="updateCard-btn" onClick={this.updateCard}>
              <UpdateCardButton />
            </span>
            <span onClick={this.newCard}>
              <NewCardButton />
            </span>
          </div>
        ) : (
          <div id="plus_button">
            <span onClick={this.addCard}>
              <PlusButton />
            </span>
          </div>
        )}
      </div>
    );
  }
}

export default CardEditor;
