import React, { useState } from "react";
import { useProducts } from "../../context/ProductContext";
import classes from "./NavBar.module.scss";
import { Link } from "react-router-dom";
import { CartStatus } from "../CartStatus/CartStatus";

export const NavBar = () => {
  const { category, setCategoryProductsHandler } = useProducts();
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);

  const toggleCategoryVisibility = () => {
    setIsCategoryVisible(!isCategoryVisible);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.nav}>
        <Link to={"/"} className={classes.nav__title}>
          Home
        </Link>
        <div className={classes.nav__title} onClick={toggleCategoryVisibility}>
          Category
        </div>
        <Link to={"/contact"} className={classes.nav__title}>
          Contact
        </Link>
        <ul
          className={`${classes.list} ${
            isCategoryVisible ? classes.visible : ""
          }`}
        >
          <Link to={'/products'} className={classes.list__item}>All Products</Link>
          {category.map((item, index) => {
            return (
              <Link
                to={`/category`}
                onClick={() => {
                  setCategoryProductsHandler(item);
                  toggleCategoryVisibility();
                }}
                className={classes.list__item}
                key={index}
              >
                {item}
              </Link>
            );
          })}
        </ul>
      </div>
      <CartStatus />
    </div>
  );
};
