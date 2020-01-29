import React from "react";

import CreatableSelect from "react-select/creatable";
import { colourOptions } from "../data";

export default function CreatableSingle(props) {
  const { currentCardSetID, userID } = props;

  //   const classes = useStyles();
  const [values, setValues] = React.useState({
    category: "",
    name: "",
    categories: "",
    value: "",
    label: "",
    createdCategory: ""
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

  function handleChange(newValue, actionMeta) {
    // console.group("Value Changed");

    console.log(`action: ${actionMeta.action}`);
    // console.log(newValue.value);
    if (
      actionMeta.action === "select-option" ||
      actionMeta.action === "set-value" ||
      actionMeta.action === "create-option"
    ) {
      props.updateCategory(newValue.value);
      console.log("hangle change updated");
      console.log("value: " + newValue.value);
    }

    if (actionMeta.action === "clear") {
      props.updateCategory("");
    }
    // console.groupEnd();
    // console.log("handleChange")
    // if (newValue !== null) {
    //   setValues(oldValues => ({
    //     ...oldValues,
    //     category: newValue.value
    //   }));
    //   props.updateCategory(newValue.value);
    // }
  }
  function handleInputChange(inputValue, actionMeta) {
    // console.log("value IS null");
    // console.group("Input Changed");
    // console.log(inputValue);
    // console.log(`action: ${actionMeta.action}`);
    // console.groupEnd();
    // console.log(inputValue);
    // if (actionMeta.action === "input-change") {
    //   setValues(oldValues => ({
    //     ...oldValues,
    //     createdCategory: inputValue
    //   }));
    // }
    // console.log(inputValue);
    // if (actionMeta.action === "set-value" && inputValue == !"") {
    //   setValues(oldValues => ({
    //     ...oldValues,
    //     createdCategory: inputValue
    //   }));
    //   console.log(values.createdCategory);
    //   props.updateCategory(values.createdCategory);
    // }
  }

  const categoriesList = Object.values(values.categories)
    .filter(x => x !== "")
    .map(value => Object.assign({ value: value }, { label: value }));

  return (
    <div id="creatableSelect">
      {values.category === "" ? (
        <CreatableSelect
          isClearable
          onChange={handleChange}
          onInputChange={handleInputChange}
          placeholder="Select Category"
          // options={colourOptions}
          //   options={categoriesList}
          options={categoriesList}
          theme={theme => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary25: "lightgrey",
              primary: "grey"
            }
          })}
        />
      ) : (
        <CreatableSelect
          isClearable
          onChange={handleChange}
          onInputChange={handleInputChange}
          // options={colourOptions}
          //   options={categoriesList}
          value={({ value: values.category }, { label: values.category })}
          options={categoriesList}
          theme={theme => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary25: "lightgrey",
              primary: "grey"
            }
          })}
        />
      )}
    </div>
  );
}
