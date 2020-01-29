import React from "react";

import Select from "react-select";
import makeAnimated from "react-select/animated";
import { colourOptions } from "../data";

const animatedComponents = makeAnimated();

export default function AnimatedMulti(props) {
  const [values, setValues] = React.useState({
    category: "",
    name: "",
    categories: "",
    value: "",
    label: "",
    selectedCategories: []
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

  function handleChange(inputValue, actionMeta) {
    // console.log(`action: ${actionMeta.action}`);

    if (inputValue === null) {
      props.selectedCategories([]);
    }
    if (inputValue !== null) {
      props.selectedCategories(inputValue);
    }
  }

  const categoriesList = Object.values(values.categories)
    .filter(x => x !== "")
    .map(value => Object.assign({ value: value }, { label: value }));

  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      onChange={handleChange}
      placeholder="Select Categories"
      //   defaultValue={[colourOptions[4], colourOptions[5]]}
      isMulti
      options={categoriesList}
    />
  );
}
