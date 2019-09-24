import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
// import PlusButton from "./AddPlusButton";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import { firestore } from "../../firebase";

import "./CardEditor_CategorySelect_Button.css";
import { PlayCircleFilledWhite } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export default function CategorySelect(props) {
  const { currentCardSetID, userID } = props;

  const classes = useStyles();
  const [values, setValues] = React.useState({
    category: "",
    name: "",
    categories: ""
  });

  React.useEffect(() => {
    const allCards = props.cards;
    const categories = Object.keys(allCards).map(key => allCards[key].Category);
    const allUniqueCategories = Array.from(new Set(categories));
    // remove undefined from unique categories
    const uniqueCategories = allUniqueCategories.filter(x => x !== undefined);

    setValues(oldValues => ({
      ...oldValues,
      categories: uniqueCategories
    }));

    if (props.cardSetCategory !== ("" || null || undefined)) {
      setValues(oldValues => ({
        ...oldValues,
        category: props.cardSetCategory
      }));
    }
  }, [props.cardSetCategory, props.cards]);

  function handleChange(event) {
    event.preventDefault();
    if (event.target.value === "+") {
      console.log("plus button");
    } else {
      setValues(oldValues => ({
        ...oldValues,
        [event.target.name]: event.target.value
      }));

      props.updateCategory(event.target.value);
    }

    // firestore
    //   .collection(`${userID}`)
    //   .doc("Cards")
    //   .update({
    //     [`${currentCardSetID}.Category`]: `${event.target.value}`
    //   });
    // console.log(event.target.value);
  }

  const categoriesList = Object.values(values.categories)
    .filter(x => x !== "")
    .map(category => (
      <MenuItem key={category} value={category}>
        {category}
      </MenuItem>
    ));

  return (
    <form className={classes.root} autoComplete="off">
      <FormControl
        variant="filled"
        className={classes.formControl}
      >
        <InputLabel htmlFor="filled-category-simple">Category</InputLabel>
        <Select
          value={values.category}
          onChange={handleChange}
          inputProps={{
            name: "category",
            id: "filled-category-simple"
          }}
        >
          {/* <MenuItem value="+" id="addCategory"> */}
          {/* <span id="addCategoryButton"> */}
          {/* <Fab
              color="primary"
              aria-label="add"
              // iconStyle={{ height: 21, width: 21 }}
              style={{ height: 21, width: 21, minHeight: 21 }}
            >
              <AddIcon
                style={{ height: 21, width: 21 }}
                // iconStyle={{ height: 21, width: 21 }}
              />
            </Fab> */}

          {/* </span> */}
          {/* </MenuItem> */}
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {categoriesList}
        </Select>
      </FormControl>
    </form>
  );
}
