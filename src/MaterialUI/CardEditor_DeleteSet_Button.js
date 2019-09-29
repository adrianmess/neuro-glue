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

export default function DeleteSetButton(props) {
  const classes = useStyles();
  const { currentCardSetID } = props;
  function deleteCardSet(event) {
    event.preventDefault();

    props.deleteCardSet(currentCardSetID);
  }
  return (
    <div>
      <span onClick={event => deleteCardSet(event)}>
        <Link
          to={`/FlashCards`}
          className={classes.link}
        >
          <Button
            variant="contained"
            color="secondary"
            size="small"
            className={classes.button}
          >
            {" "}
            Delete Set
          </Button>
        </Link>
      </span>
    </div>
  );
}
