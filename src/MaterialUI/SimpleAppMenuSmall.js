import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { styled } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import "./SimpleAppMenuSmall.scss";

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
    },
    textAlign: "left"
  }
}));

const MyToolbar = styled(Toolbar)({
  display: "grid",
  gridTemplateColumns: "10% auto 10% ",
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
        <div id="header-content-left"></div>
        <h2 id="header-title">Neuro Glue</h2>

        <MyButton
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MenuIcon />
        </MyButton>

        {props.selectedCardCategory}
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          style={{ top: "30px", opacity: 0.9 }}
        >
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
            to="/Notes"
            style={{textAlign: "left"}}
          >
            Notes
          </MenuItem>

          <hr />
          <MenuItem
            onClick={props.logout}
            className={classes.menuItem}
            style={{ padding: "0px 15px" }}
          >
            <p id="logout-P">Logout</p>{" "}
            <img id="photoURLSmall" src={props.photoURL} />
          </MenuItem>
        </Menu>
      </MyToolbar>
    </AppBar>
  );
}
