import React from "react";
import { Link } from "react-router-dom";

class FlashCardSetCategoriesList extends React.Component {
  setCardTitle(event, cardTitle, cardSetID) {
    event.preventDefault();
    this.props.setCurrentCardSetTitle(cardTitle, cardSetID);
  }

  render() {
    const { cards, selectedCardCategory } = this.props;
    const matchingCardArrays = Object.entries(cards).filter(keys => {
      return keys[1].Category === selectedCardCategory;
    });

    const cardSetTitleIDPair = [];
    for (let a = 0; a < matchingCardArrays.length; a++) {
      const cardSetID = matchingCardArrays[a][0];
      const cardSetTitle = matchingCardArrays[a][1].CardSetTitle;
      cardSetTitleIDPair.push([cardSetID, cardSetTitle]);
    }

    return (
      <>
        {cardSetTitleIDPair.map(keys => (
          <div key={keys[0]}>
            <span
              onClick={event =>
                this.setCardTitle(event, keys[1], keys[0])
              }
            >
              <Link to={`/FlashCardTest/${keys[1]}`}>{keys[1]}</Link>
            </span>
          </div>
        ))}
      </>
    );
  }
}

export default FlashCardSetCategoriesList;
