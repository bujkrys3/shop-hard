import React from "react";
import classes from "./CartStatus.module.scss";
import { useCart } from "../../context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const CartStatus = () => {
  const { cart } = useCart();
  return (
    <Link to={"/cart"}>
      <div className={classes.cart_icon}>
        <FontAwesomeIcon icon={faShoppingCart} />
        <div className={classes.cart_count}>{cart.totalQuantity}</div>
      </div>
    </Link>
  );
};
