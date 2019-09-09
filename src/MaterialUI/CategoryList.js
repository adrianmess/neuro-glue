import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import { CenterFocusStrong } from "@material-ui/icons";

import "./CategoryList.css";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    margin: theme.spacing(4, 0, 2),
    "text-align": "center"
  }
}));

function generate(element) {
  return [0, 1, 2].map(value =>
    React.cloneElement(element, {
      key: value
    })
  );
}

export default function MaterialCategoryList(props) {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  const allCards = props.cards;
  const categories = Object.keys(allCards).map(key => allCards[key].Category);
  const uniqueCategories = Array.from(new Set(categories));

  const noChars = new RegExp(/^\W*$/);

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography
            variant="h6"
            className={classes.title}
            id="categories_header"
          >
            Categories
          </Typography>
          <div className={classes.demo} id="category_list">
            <List dense={dense}>
              {uniqueCategories.map(uniqueCategory =>
                uniqueCategory === noChars || uniqueCategory === undefined ? (
                  <ListItem key={'key'}>
                    <ListItemIcon>
                      <FolderIcon />
                    </ListItemIcon>
                    <Link key="" to={`/Category/Unititled`}>
                      <a> -> No Category Set </a>
                    </Link>
                  </ListItem>
                ) : (
                  <div
                    key={uniqueCategory}
                    onClick={event =>
                      props.selectCardCategory(event, uniqueCategory)
                    }
                  >
                    <ListItem>
                      <ListItemIcon>
                        <FolderIcon />
                      </ListItemIcon>
                      <Link to={`/Category/${uniqueCategory}`}>
                        <ListItemText
                          primary={uniqueCategory}
                          secondary={secondary ? "Secondary text" : null}
                        />
                      </Link>
                    </ListItem>
                  </div>
                )
              )}
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
