import React from "react";
import Header from "./Header";
import { firestore } from "./firebase";
import { object } from "prop-types";
import { Link } from "react-router-dom";
import "./FlashCardSetTitlesByCategory.css";

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
            <Link
              to={`/Category/${uniqueCategory}`}
              key={uniqueCategory}
              onClick={ event => this.props.selectCardCategory(event, uniqueCategory)}
            >
              {uniqueCategory}
            </Link>
          ))}
        </div>
      </>
    );
  }
}

export default FlashCardSetTitlesByCategory;
