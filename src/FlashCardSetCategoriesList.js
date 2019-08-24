import React from "react";

class FlashCardSetCategoriesList extends React.Component {
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
          <div key={keys}>
            {keys[1]}
          </div>
        ))}
      </>
    );
  }
}

export default FlashCardSetCategoriesList;
