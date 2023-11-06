import React from "react";
import { useCart } from "../../context/CartContext";
import classes from "./Delivery.module.scss";
import { Link } from "react-router-dom";
import { Button } from "../Button/Button";

export const Delivery = () => {
  const { cart } = useCart();

  return (
    <div className={classes.summary}>
      <p className={classes.summary__totalPrice}>
        Total Price: {cart.totalPrice.toFixed(2)} $
      </p>
      <Link to="/delivery">
        <Button name="Delivery" onClick={() => {}} />
      </Link>
    </div>
  );
};
