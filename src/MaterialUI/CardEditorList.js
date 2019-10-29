import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@material-ui/icons/Delete";
import renderHTML from "react-render-html";

import SimpleCard from "./CardEditor_CardList_Card";
import "../FlashCardEditorMain.css";

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
  }
}));

export default function MaterialCardEditorList(props) {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  const cardSet = props.cards;
  const cardSetID = props.currentCardSetID;
  const cards = {};

  Object.assign(cards, cardSet[`${cardSetID}`]);

  const cardsList = cards["Cards"];

  function selectCard(e, key, cardfront, cardback) {
    e.preventDefault();
    props.editSelectedCard(key, cardfront, cardback);
    props.setCardState("updateCard");
  }

  const cardContainer = {
    marginBottom: "20px"
  };

  function cardButtonRemove(event, key) {
    props.deleteCard(event, key);
    props.cardListEmptyCheck(event, key);
  }

  if (cardsList !== undefined) {
    return (
      <div className={classes.root} id="card_editor_list_root">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <div className={classes.demo}>
              <List dense={dense}>
                {Object.keys(cardsList).map(key => {
                  return (
                    <div key={key}>
                      <div id="card-containerMain">
                        <div
                          key={key}
                          id="card-container"
                          onClick={event =>
                            selectCard(
                              event,
                              key,
                              cardsList[key].front,
                              cardsList[key].back
                            )
                          }
                          style={cardContainer}
                        >
                          <div id="card-front" name="front">
                            {cardsList[key].front === undefined ? (
                              <span />
                            ) : (
                              <SimpleCard
                                cardFace={renderHTML(cardsList[key].front)}
                              />
                            )}
                          </div>

                          <div id="card-back" name="back">
                            {cardsList[key].back === undefined ? (
                              <span />
                            ) : (
                              // renderHTML(cardsList[key].back)
                              <SimpleCard
                                cardFace={renderHTML(cardsList[key].back)}
                              />
                            )}
                          </div>
                        </div>
                        <div id="trash-button-container">
                          <span
                            id="card-button-remove"
                            onClick={event => cardButtonRemove(event, key)}
                          >
                            <IconButton edge="end" aria-label="delete">
                              <DeleteIcon />
                            </IconButton>
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </List>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  } else {
    return <div> </div>;
  }
}
