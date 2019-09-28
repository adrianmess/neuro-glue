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

import "./FlashCardSetsByTitle.css";

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
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  function setCardTitle(event, cardTitle, cardSetID) {
    event.preventDefault();
    props.setCurrentCardSetTitle(cardTitle, cardSetID);
  }
  const cards = props.cards;

  const cardTitles = Object.keys(cards).map(cardSetID => [
    cardSetID,
    cards[cardSetID].CardSetTitle
  ]);
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

      {/* <div> */}
      <div className={classes.demo} id="flash_cards_list">
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
      </div>
    </div>
  );
}
