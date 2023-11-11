import React, { useEffect, useState } from "react";
import classes from "./CartStatus.module.scss";
import { useCart } from "../../context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const CartStatus = () => {
  const { cart } = useCart();
  const [cartQuantity, setCartQuantity] = useState(cart.totalQuantity);

  useEffect(() => {
    setCartQuantity(cart.totalQuantity);
  }, [cart.totalQuantity]);

  return (
    <Link to={"/cart"}>
      <div className={classes.cart_icon}>
        <FontAwesomeIcon icon={faShoppingCart} />
        <div className={classes.cart_count}>{cartQuantity}</div>
      </div>
    </Link>
  );
};
