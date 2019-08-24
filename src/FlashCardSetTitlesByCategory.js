import React from "react";
import Header from "./Header";
import { firestore } from "./firebase";
import { object } from "prop-types";

class FlashCardSetTitlesByCategory extends React.Component {
  constructor() {
    super();
  }

  render() {
    const allCards = this.props.cards;
    const categories = Object.keys(allCards).map(key => allCards[key].Category);
    const uniqueCategories = Array.from(new Set(categories));
    uniqueCategories.map(uniqueCategories => Object.keys(uniqueCategories));

    return (
      <>
        <div id="unique_Categories_Container">
          {uniqueCategories.map(uniqueCategory => (
            <a key={uniqueCategory}>{uniqueCategory} Test</a>
          ))}
        </div>
      </>
    );
  }
}

export default FlashCardSetTitlesByCategory;
