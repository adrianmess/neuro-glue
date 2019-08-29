import React from "react";
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

    return (
      <>
        <div id="unique_Categories_Container">
          {uniqueCategories.map(uniqueCategory =>
            uniqueCategory === "" ? (
              <Link key="" to={`/Category/Unititled`}>
                Untitled
              </Link>
            ) : (
              <div
                key={uniqueCategory}
                onClick={event =>
                  this.props.selectCardCategory(event, uniqueCategory)
                }
              >
                <Link to={`/Category/${uniqueCategory}`}>{uniqueCategory}</Link>
              </div>
            )
          )}
        </div>
      </>
    );
  }
}

export default FlashCardSetTitlesByCategory;
