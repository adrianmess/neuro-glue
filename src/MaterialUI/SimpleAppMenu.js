import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { styled } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import "./SimpleAppMenu.css";
import { flexbox } from "@material-ui/system";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  menuItem: {
    textDecoration: "none!important",
    "&:hover": {
      textDecoration: "none!important"
    }
  }
}));

const MyToolbar = styled(Toolbar)({
  display: "grid",
  gridTemplateColumns: "10% auto 10%",
  background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  color: "white",
  height: 48,
  padding: "0 30px"
});

const MyButton = styled(Button)({
  color: "white",
  justifySelf: "flex-end"
});

export default function ButtonAppBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <AppBar position="static">
      <MyToolbar>
        <span id="header-content-left"></span>
        <p id="header-title">Neuro Glue</p>
        <MyButton
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          {/* <IconButton
          edge="start"
          // className={classes.menuButton}
          color="inherit"
          aria-label="open drawer"
        > */}
          <MenuIcon />
          {/* </IconButton> */}
        </MyButton>

        {props.selectedCardCategory}
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          style={{ top: "30px", opacity: 0.9}}
        >
          <MenuItem
            component={Link}
            to="/Categories"
            onClick={handleClose}
            className={classes.menuItem}
          >
            Categories
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            className={classes.menuItem}
            component={Link}
            to="/FlashCards"
          >
            FlashCards
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            className={classes.menuItem}
            component={Link}
            to="/FlashCardEditor"
          >
            FlashCardEditor
          </MenuItem>

          <hr />
          <MenuItem onClick={props.logout} className={classes.menuItem}>
            Logout
          </MenuItem>
        </Menu>
      </MyToolbar>
    </AppBar>
  );
}
