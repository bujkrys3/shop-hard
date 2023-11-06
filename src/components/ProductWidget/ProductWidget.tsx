import React, { useMemo, useState } from "react";
import { Product } from "../../utils/types/productsInterface";
import classes from "./ProductWidget.module.scss";
import { Button } from "../Button/Button";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { set } from "react-hook-form";

export const ProductWidget = ({ product }: { product: Product }) => {
  const { cart, addToCart } = useCart();
  const [buttonName, setButtonName] = useState("Add to cart");

  const changeButtonName = () => {
    setButtonName("Added");
    setTimeout(() => {
      setButtonName("Add to cart");
    }, 3000);
  };

  const classWithDiscount = useMemo(() => {
    return product.discountPrice
      ? classes.priceWrapper__discount
      : classes.priceWrapper__price;
  }, [product.discountPrice]);

  return (
    <div className={classes.wrapper} key={product.id}>
      <div className={classes.product}>
        <h4 className={classes.product__title}>{product.title}</h4>
        <div className={classes.priceWrapper}>
          <p className={classWithDiscount}>{product.price.toFixed(2)}$</p>
          {product.discountPrice && (
            <p className={classes.priceWrapper__price}>
              {product.discountPrice.toFixed(2)}$
            </p>
          )}
        </div>
      </div>
      <Link to={`/products/${product.id}`} className={classes.imageContainer}>
        <img
          className={classes.imageContainer__image}
          src={product.image}
          alt={product.title}
        />
      </Link>
      <div className={classes.controls}>
        <p className={classes.controls__description}>{product.description}</p>
        <Button
          name={buttonName}
          onClick={() => {
            addToCart(product);
            changeButtonName();
          }}
        />
      </div>
    </div>
  );
};
