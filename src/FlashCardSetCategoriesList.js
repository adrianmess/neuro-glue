import React from "react";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import AssignmentIcon from "@material-ui/icons/Assignment";

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
      <div>
        <h2>Category: {selectedCardCategory}</h2>
        {cardSetTitleIDPair.map(keys => (
          <div key={keys[0]}>
            <span onClick={event => this.setCardTitle(event, keys[1], keys[0])}>
              <Link to={`/FlashCardTest/${keys[1]}`}>
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar>
                      <AssignmentIcon />
                    </Avatar>
                  </ListItemAvatar>

                  <ListItemText
                    primary={keys[1]}
                  />
                </ListItem>
              </Link>
            </span>
          </div>
        ))}
      </div>
    );
  }
}

export default FlashCardSetCategoriesList;
