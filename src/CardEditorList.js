import React from "react";
import renderHTML from "react-render-html";

class CardEditorList extends React.Component {
  constructor() {
    super();
  }

  selectCard(e, key, cardfront, cardback) {
    e.preventDefault();
    this.props.editSelectedCard(key, cardfront, cardback);
    this.props.setCardState("updateCard");
  }

  render() {
    const cardSet = this.props.cards;
    const cardSetID = this.props.currentCardSetID;
    const cards = {};

    Object.assign(cards, cardSet[`${cardSetID}`]);

    const cardsList = cards["Cards"];

    if (cardsList !== undefined) {
      return Object.keys(cardsList).map(key => {
        return (
          <div>
            <div>
              <div
                key={key}
                id="card-container"
                onClick={event =>
                  this.selectCard(
                    event,
                    key,
                    cardsList[key].front,
                    cardsList[key].back
              )
                }
              >
                <div id="card-front" name="front">
                  {cardsList[key].front === undefined ? (
                    <span />
                  ) : (
                    renderHTML(cardsList[key].front)
                  )}
                </div>

                <div id="card-back" name="back">
                  {cardsList[key].back === undefined ? (
                    <span />
                  ) : (
                    renderHTML(cardsList[key].back)
                  )}
                </div>
                <button
                  id="card-button-remove"
                  onClick={() => this.props.deleteCard(key)}
                >
                  remove
                </button>
              </div>
            </div>
          </div>
        );
      });
    } else {
      return <div> </div>;
    }
  }
}

export default CardEditorList;
