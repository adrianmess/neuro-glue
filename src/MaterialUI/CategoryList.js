import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";

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

export default function MaterialCategoryList(props) {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  const allCards = props.cards;
  const categories = Object.keys(allCards).map(key => allCards[key].Category);
  const noChars = new RegExp(/^\W*$/);
  const uniqueCategories = Array.from(new Set(categories)).filter(
    x => x !== ""
  );

  return (
    <div className={classes.root} id="category_list_main">
      <Grid container spacing={2} id="grid-main">
        <Grid item xs={12} md={12}>
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
                  <Link
                    key=""
                    to={`/Category/Unititled`}
                    className={classes.link}
                  >
                    <ListItem key={"key"} button>
                      <ListItemIcon>
                        <FolderIcon />
                      </ListItemIcon>
                      <ListItemText>-> No Category Set</ListItemText>
                      {/* -> No Category Set */}
                    </ListItem>
                  </Link>
                ) : (
                  <div
                    key={uniqueCategory}
                    onClick={event =>
                      props.selectCardCategory(event, uniqueCategory)
                    }
                  >
                    <Link to={`/Category/${uniqueCategory}`} className={classes.link}>
                      <ListItem button>
                        <ListItemIcon>
                          <FolderIcon />
                        </ListItemIcon>{" "}
                        {uniqueCategory}
                      </ListItem>
                    </Link>
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
