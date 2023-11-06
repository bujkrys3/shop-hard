import React from "react";
import classes from "./EmptyCart.module.scss";
import { Link } from "react-router-dom";

export const EmptyCart = () => {
  return (
    <div className={classes.wrapper}>
      <p className={classes.emptyCartTitle}>Add something to cart</p>

      <Link className={classes.emptyCartLink} to={"/"}>
        Check our Bestsellers!
      </Link>
    </div>
  );
};
