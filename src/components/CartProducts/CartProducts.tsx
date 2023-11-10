import React from "react";
import { useCart } from "../../context/CartContext";
import classes from "./CartProducts.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../Button/Button";

export const CartForm = () => {
  const { cart, setQuantityOfProduct, increaseQuantity, reduceQuantity } =
    useCart();

  const navigate = useNavigate();

  return (
    <div className={classes.wrapper}>
      <ul className={classes.cartList}>
        {cart.items.map((product) => (
          <li key={product.id} className={classes.item}>
            <Link
              to={`/products/${product.id}`}
              className={classes.item__image}
            >
              <img src={product.image} alt={product.title} />
            </Link>
            <div className={classes.item__details}>
              <p className={classes.item__details__title}>{product.title}</p>
            </div>
            <div className={classes.item__controls}>
              <div className={classes.item__controls__priceWrap}>
                <p
                  className={
                    product.discountPrice
                      ? classes.item__controls__discount
                      : classes.item__controls__price
                  }
                >
                  {(product.price * product.quantity).toFixed(2)}$
                </p>
                {product.discountPrice && (
                  <p className={classes.item__controls__price}>
                    {(product.discountPrice !== undefined
                      ? product.discountPrice * product.quantity
                      : product.price * product.quantity
                    ).toFixed(2)}
                    $
                  </p>
                )}
              </div>

              <input
                className={classes.item__controls__input}
                type="number"
                onChange={(e) => {
                  setQuantityOfProduct(product.id, Number(e.target.value));
                }}
                value={product.quantity}
                min={1}
              />
              <button
                className={classes.item__controls__button}
                onClick={() => {
                  increaseQuantity(product.id);
                }}
              >
                +
              </button>
              <button
                className={classes.item__controls__button}
                onClick={() => {
                  reduceQuantity(product.id);
                }}
              >
                -
              </button>
            </div>
          </li>
        ))}
        <div className={classes.total}>
          <p className={classes.total__price}>
            Total Price: {cart.totalPrice.toFixed(2)}$
          </p>{" "}
          <Button
            onClick={() => {
              navigate("/products");
            }}
            name="Back to shop"
            className="button"
          />
        </div>
      </ul>
    </div>
  );
};
