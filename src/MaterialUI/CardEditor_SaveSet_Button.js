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
  },
  link: {
    textDecoration: "none"
  }
}));

export default function SaveSetButton(props) {
  const classes = useStyles();
  const { currentCardSetID } = props;
  // function saveCardSet(event) {
  //   event.preventDefault();

  //   props.saveCardSet(currentCardSetID);
  // }
  function saveCardSet() {
    props.saveCardSet();
  }
  return (
    <div>
      {/* <Link
          to={`/FlashCards`}
          className={classes.link}
        > */}
      <span onClick={saveCardSet}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          className={classes.button}
        >
          {" "}
          Save Set
        </Button>
      </span>

      {/* </Link> */}
    </div>
  );
}
