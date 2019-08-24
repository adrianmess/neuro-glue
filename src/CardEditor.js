import React from "react";
import ReactQuill from "react-quill";
import { firestore } from "./firebase";

import "react-quill/dist/quill.snow.css";
import "./CardEditor.css";

class CardEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      cardFront: "",
      cardBack: ""
      // index: null,
    };

    this.handleChangeFront = this.handleChangeFront.bind(this);
    this.handleChangeBack = this.handleChangeBack.bind(this);
    this.addCard = this.addCard.bind(this);
    // this.bottomActive = this.bottomActive.bind(this);
    // this.topActive = this.topActive.bind(this);
  }

  handleChangeFront = async value => {
    await this.setState({ cardFront: value });
  };

  handleChangeBack = async value => {
    await this.setState({ cardBack: value });
  };

  // componentDidMount = () =>{
  // 	const topToolBar = document.getElementsByClassName('ql-toolbar')[0];
  // 	const bottomToolBar = document.getElementsByClassName('ql-toolbar')[1];

  // 	topToolBar.style.zIndex="101";
  // 	bottomToolBar.style.zIndex="100";
  // }

  topActive() {
    const topToolBar = document.getElementsByClassName("ql-toolbar")[0];
    const bottomToolBar = document.getElementsByClassName("ql-toolbar")[1];
    topToolBar.style.display = "inherit";
    bottomToolBar.style.display = "none";
  }

  bottomActive() {
    const topToolBar = document.getElementsByClassName("ql-toolbar")[0];
    const bottomToolBar = document.getElementsByClassName("ql-toolbar")[1];
    // topToolBar.style.display = "none";
    bottomToolBar.style.display = "inherit";
  }

  // ############################################
  // componentDidUpdate = () => {

  // 	if (this.props.selectedCardIndex !== this.state.index) {
  // 		this.setState({
  // 			front: this.props.selectedCard.front,
  // 			back: this.props.selectedCard.back,
  // 			index: this.props.selectedCardIndex
  // 		})
  // 	}
  // if (this.props.selectedCardIndex === this.state.index) {

  // }
  // }
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

    console.log(card);
    this.props.addCard(card);

    // const cardIndex = `card${Date.now()}`;

    // this.props.addCard(date, card);
  };
  // ############################################

  updateCard = () => {
    // const index = this.state.index;
    const cardFront = this.state.front;
    const cardBack = this.state.back;
    // this.props.updateCard( cardFront, cardBack)
  };

  addCard = () => {
    const { cardFront, cardBack } = this.state;
    const { userID, cardSetTitle } = this.props;
    const cdate = Date.now();

    console.log();
    if (cardSetTitle === "") {
      this.props.alertMissingTitle()
    }
    // let userID = this.state.userID;
    // let cardSetID = 'card123455187';
    // firestore.collection(`${userID}`).doc('Cards').update({
    // 	[`${cardSetID}.Cards.${cdate}.front`]: `${cardFront}`
    // })
    // firestore.collection(`${userID}`).doc('Cards').update({
    // 	[`${cardSetID}.Cards.${cdate}.back`]: `${cardBack}`
    // })
  };

  render() {
    return (
      <>
        <div id="reactQuill-container">
          <div id="reactQuill-subContainer">
            <div id="top-quill" onClick={this.topActive}>
              <ReactQuill
                name="front"
                value={this.state.cardFront ? this.state.cardFront : ""}
                onChange={this.handleChangeFront}
              />
            </div>

            <div id="bottom-quill" onClick={event => this.bottomActive(event)}>
              <ReactQuill
                name="back"
                value={this.state.cardBack ? this.state.cardBack : ""}
                onChange={this.handleChangeBack}
              />
            </div>
          </div>

          <button onClick={this.addCard}>Add Card</button>
          {this.state.index ? (
            <button id="updateCard-btn" onClick={this.updateCard}>
              Update
            </button>
          ) : null}

          {this.state.index ? (
            <button id="newCArd-btn" onClick={this.props.newCard}>
              New Card
            </button>
          ) : null}
        </div>
      </>
    );
  }
}

export default CardEditor;
