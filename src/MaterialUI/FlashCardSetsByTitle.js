import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import AssignmentIcon from "@material-ui/icons/Assignment";
import SmallChart from "../charts/smallChart";
import NewFlashCardSetButton from "./NewFlashCardSet_Button";

import AnimatedMulti from "../Components/react-select/multiple-animated";

import "./FlashCardSetsByTitle.scss";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    margin: theme.spacing(4, 0, 2)
  },
  link: {
    textDecoration: "none"
  }
}));

function generate(element) {
  return [0, 1, 2].map(value =>
    React.cloneElement(element, {
      key: value
    })
  );
}

const iconStyle = {
  width: "25px",
  color: "black"
};

export default function FlashCardSetsByTitle(props) {
  const [values, setValues] = React.useState({
    selectedCategories: []
  });

  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  function setCardTitle(event, cardTitle, cardSetID) {
    event.preventDefault();
    props.setCurrentCardSetTitle(cardTitle, cardSetID);
  }

  function selectedCategories(categories) {
    const categoryList = categories.map(x => {
      return x.value;
    });

    setValues({
      selectedCategories: categoryList
    });
  }

  const cards = props.cards;

  const cardTitles = Object.keys(cards).map(cardSetID => [
    cardSetID,
    cards[cardSetID].CardSetTitle,
    cards[cardSetID].Category
  ]);

  const cardTitlesByCategory = cardTitles.filter(x => {
    const selected = values.selectedCategories;

    for (let i = 0; i < x.length; i++) {
      for (let b = 0; b < selected.length; b++) {
        if (x[2] === selected[b]) {
          return x;
        }
      }
    }
  });

  const categoriesSelected = cardTitlesByCategory.length !== 0;

  return (
    <div className={classes.root} id="flash_cards_list_main">
      {/* <Grid item xs={12} md={6}> */}
      <Typography
        variant="h6"
        className={classes.title}
        id="flash_cards_header"
      >
        Flash Cards
      </Typography>
      <AnimatedMulti
        selectedCategories={selectedCategories}
        cards={props.cards}
      />
      <div id="new_card_button_container">

          <NewFlashCardSetButton />

      </div>
      <div className={classes.demo} id="flash_cards_list">
        {categoriesSelected ? (
          <List dense={dense}>
            {cardTitlesByCategory.map(cardTitlesByCategory => (
              <div key={cardTitlesByCategory}>
                <ListItem>
                  <div
                    onClick={event =>
                      setCardTitle(
                        event,
                        cardTitlesByCategory[1],
                        cardTitlesByCategory[0]
                      )
                    }
                    id="flash_cards_list_items"
                  >
                    <Link
                      to={`/FlashCardTest/${cardTitlesByCategory[1]}`}
                      id="link"
                      className={classes.link}
                    >
                      <ListItem button>
                        <ListItemAvatar>
                          <Avatar>
                            <AssignmentIcon />
                          </Avatar>
                        </ListItemAvatar>

                        <ListItemText
                          primary={cardTitlesByCategory[1]}
                          secondary={secondary ? "Secondary text" : null}
                        />
                      </ListItem>
                    </Link>
                  </div>
                  <SmallChart
                    cards={props.cards}
                    currentCardSetID={cardTitlesByCategory[0]}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <Link to={"/FlashCardEditor"}>
                        <span
                          onClick={event =>
                            props.setCurrentCardSetID(cardTitlesByCategory[0])
                          }
                        >
                          {" "}
                          <EditIcon />
                        </span>
                      </Link>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </div>
            ))}
          </List>
        ) : (
          <List dense={dense}>
            {cardTitles.map(cardTitles => (
              <div key={cardTitles}>
                <ListItem>
                  <div
                    onClick={event =>
                      setCardTitle(event, cardTitles[1], cardTitles[0])
                    }
                    id="flash_cards_list_items"
                  >
                    <Link
                      to={`/FlashCardTest/${cardTitles[1]}`}
                      id="link"
                      className={classes.link}
                    >
                      <ListItem button>
                        <ListItemAvatar>
                          <Avatar>
                            <AssignmentIcon />
                          </Avatar>
                        </ListItemAvatar>

                        <ListItemText
                          primary={cardTitles[1]}
                          secondary={secondary ? "Secondary text" : null}
                        />
                      </ListItem>
                    </Link>
                  </div>
                  <SmallChart
                    cards={props.cards}
                    currentCardSetID={cardTitles[0]}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <Link to={"/FlashCardEditor"}>
                        <span
                          onClick={event =>
                            props.setCurrentCardSetID(cardTitles[0])
                          }
                        >
                          {" "}
                          <EditIcon />
                        </span>
                      </Link>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </div>
            ))}
          </List>
        )}
      </div>
    </div>
  );
}
