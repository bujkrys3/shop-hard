import React, { useState } from "react";
import { NavBar } from "../../components/NavBar/NavBar";
import classes from "./Cart.module.scss";
import { useCart } from "../../context/CartContext";
import { CartForm } from "../../components/CartForm/CartForm";
import { DeliveryForm } from "../../components/DeliveryForm/DeliveryForm";
import { EmptyCart } from "../../components/EmptyCart/EmptyCart";
import { Discount } from "../../components/Discount/Discount";

export const Cart = () => {
  const { cart } = useCart();
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);

  const submitSuccessfulHandler = () => {
    setIsSubmitSuccessful(true);
    setTimeout(() => {
      setIsSubmitSuccessful(false);
    }, 3000);
  };

  return (
    <>
      <NavBar />
      {cart.items.length === 0 && (
        <div className={classes.wrapper}>
          {isSubmitSuccessful && (
            <p className={classes.success}>Your order has been sent!</p>
          )}
          {!isSubmitSuccessful && <EmptyCart />}
        </div>
      )}
      {cart.items.length !== 0 && (
        <div className={classes.wrapper}>
          <div className={classes.cart}>
            <CartForm />
          </div>
          <div>
            <Discount />
            <DeliveryForm submitSuccessfulHandler={submitSuccessfulHandler} />
          </div>
        </div>
      )}
    </>
  );
};
