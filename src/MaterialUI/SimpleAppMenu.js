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
import ListItem from "@material-ui/core/ListItem";

import "./SimpleAppMenu.scss";
import { flexbox } from "@material-ui/system";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    justifyContent: "center!important"
    // height: 100
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
    // marginTop: "5px",
  }
}));

const MyToolbar = styled(Toolbar)({
  display: "grid",
  gridTemplateColumns: "auto auto auto auto",
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

const MyListItem = styled(ListItem)({
  justifyContent: "center"
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
        <div id="header-content-left">
          <h2 id="header-title">Neuro Glue</h2>
        </div>

        <ListItem
          button
          component={Link}
          to="/Notes"
          style={{ justifyContent: "center", height: "100%" }}
        >
          Notes
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/FlashCards"
          style={{ justifyContent: "center", height: "100%" }}
        >
          FlashCards
        </ListItem>
        <MyButton
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          style={{ backgroundColor: "transparent" }}
        >
          {/* <MenuIcon /> */}
          <img id="photoURL" src={props.photoURL} />
        </MyButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          style={{
            top: "40px",
            opacity: 0.7,
            padding: "0px",
            marginLeft: "10px",
            minHeight: "0px"
          }}
        >
          <MenuItem
            onClick={props.logout}
            className={classes.menuItem}
            style={{ padding: "5px", minHeight: "10px" }}
          >
            Logout
          </MenuItem>
        </Menu>
      </MyToolbar>
    </AppBar>
  );
}
