import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));

export default function NewFlashCardSetButton() {
  const classes = useStyles();
  return (

      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        component={Link}
        to="/FlashCardEditor"
      >
        New Flash Card Deck
      </Button>

  );
}
