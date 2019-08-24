import React from "react";
import { Link } from "react-router-dom";
import SimpleMenu from "./MaterialUI/CardCategoryMenu";
import "./Header.css";

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedCardCategory: ""
    };
  }

  render() {
    return (
      <>
        <div>
          <Link to="/Categories" className="headerLinks">
            Categories
          </Link>
          <Link to="/FlashCards" className="headerLinks">
            Flash Cards
          </Link>
          <span onClick={event => this.props.clearSelectCardSet(event)}>
            <Link to="/FlashCardEditor" className="headerLinks">
              Create Flash Cards
            </Link>
          </span>
        </div>
        {/* <SimpleMenu
				cards={this.props.cards}
				select={this.props.selectCardCategory}>
				</SimpleMenu> */}
      </>
    );
  }
}

export default Header;
