import React from "react";

class FlashCardSetCategoriesList extends React.Component {
  render() {
    const { cards, selectedCardCategory } = this.props;
    const test = Object.entries(cards).filter(keys => {
      return keys[1].Category === selectedCardCategory;
    });

    console.log(test)
    return <>{}</>;
  }
}

export default FlashCardSetCategoriesList;
