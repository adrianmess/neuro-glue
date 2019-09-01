import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function ButtonAppBar(props){
  const classes = useStyles();
	console.log(props)
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="subtitle2" className={classes.title}>
            <Link to="/Categories" className="headerLinks">
              Categories
            </Link>
          </Typography>
          <Typography variant="subtitle2" className={classes.title}>
            <Link to="/FlashCards" className="headerLinks">
              Flash Cards
            </Link>
          </Typography>
          <Typography variant="subtitle2" className={classes.title}>
			  <span onClick={event => props.clearSelectedCardSet(event)}>
            <Link to="/FlashCardEditor" className="headerLinks">
              New Flash Card Set
            </Link>
			</span>
          </Typography>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
