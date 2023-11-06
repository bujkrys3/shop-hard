import React, { useMemo } from "react";
import { useCart } from "../../context/CartContext";
import classes from "./Delivery.module.scss";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button/Button";

export const Delivery = () => {
  const navigate = useNavigate();
  const { cart } = useCart();

  const isCartEmpty = useMemo(() => {
    return cart.items.length === 0;
  }, [cart.items.length]);

  return (
    <div className={classes.summary}>
      <p className={classes.summary__totalPrice}>
        Total Price: {cart.totalPrice.toFixed(2)} $
      </p>
      <Button
        disabled={isCartEmpty}
        name="Delivery"
        onClick={() => {
          navigate("/delivery");
        }}
      />
    </div>
  );
};
