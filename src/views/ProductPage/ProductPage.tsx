import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { NavBar } from "../../components/NavBar/NavBar";
import classes from "./ProductPage.module.scss";
import { useProducts } from "../../context/ProductContext";
import { useCart } from "../../context/CartContext";
import { Button } from "../../components/Button/Button";
import { Rating } from "../../components/Rating/Rating";

export const ProductPage = () => {
  const { id } = useParams();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === Number(id));
  const [buttonName, setButtonName] = useState("Add to cart");
  const navigate = useNavigate();

  const backTo = () => {
    navigate(-1);
  };

  const changeButtonName = () => {
    setButtonName("Added");
    setTimeout(() => {
      setButtonName("Add to cart");
    }, 1000);
  };

  if (!product) {
    return <div>Product not found</div>;
  }
  const classWithDiscount = product.discountPrice
    ? classes.product__priceWrapper__discount
    : classes.product__priceWrapper__price;

  return (
    <div>
      <NavBar />
      <div className={classes.product} key={product.id}>
        <h4 className={classes.product__title}>{product.title}</h4>
        <div className={classes.product__priceWrapper}>
          <p className={classWithDiscount}>{product.price.toFixed(2)}$</p>
          {product.discountPrice && (
            <p className={classes.product__priceWrapper__price}>
              {product.discountPrice.toFixed(2)}$
            </p>
          )}
        </div>
        <div className={classes.product__imgContainer}>
          <img
            className={classes.product__imgContainer__image}
            src={product.image}
            alt={product.title}
          />
        </div>
        <div>
          <Rating rate={product.rating.rate} count={product.rating.count} />
        </div>
        <p className={classes.product__description}>{product.description}</p>
        <div className={classes.product__btnWrapper}>
          <Button name="Back" onClick={backTo} />
          <Button
            width="130px"
            name={buttonName}
            onClick={() => {
              addToCart(product);
              changeButtonName();
            }}
          />
        </div>
      </div>
    </div>
  );
};
