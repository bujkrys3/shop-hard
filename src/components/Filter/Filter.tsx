import React from "react";
import classes from "./Filter.module.scss";
import { useFilter } from "../../context/FilterContext";

export const Filter = () => {
  const { filterData, setFilterData, resetFilter } = useFilter();

  const handleChange = (
    name: string,
    value: { from: string; to: string } | string
  ) => {
    setFilterData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className={classes.filter}>
      <label className={classes.filter__label}>Price</label>
      <div className={classes.filter__price}>
        <input
          type="text"
          name="priceFrom"
          placeholder="from"
          value={filterData.price.from}
          onChange={(event) => {
            const input = event.target.value;
            if (/^[0-9]*$/.test(input) || input === "") {
              handleChange(`price`, {
                ...filterData.price,
                from: input,
              });
            }
          }}
        />
        <input
          type="text"
          name="priceTo"
          placeholder="to"
          value={filterData.price.to}
          onChange={(event) => {
            const input = event.target.value;
            if (/^[0-9]*$/.test(input) || input === "") {
              handleChange(`price`, {
                ...filterData.price,
                to: input,
              });
            }
          }}
        />
      </div>
      <label className={classes.filter__label}>Sort by </label>
      <select
        className={classes.filter__select}
        name="sortBy"
        value={filterData.sortBy}
        onChange={(event) => {
          handleChange("sortBy", event.target.value);
        }}
      >
        <option value="lowestPrice">Lowest Price</option>
        <option value="highestPrice">Highest Price</option>
        <option value="highestRating">Highest Rating</option>
        <option value="lowestRating">Lowest Rating</option>
      </select>
      <button className={classes.filter__button} onClick={resetFilter}>Reset</button>
    </div>
  );
};
