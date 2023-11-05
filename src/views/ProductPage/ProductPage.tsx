import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { NavBar } from "../../components/NavBar/NavBar";
import classes from "./ProductPage.module.scss";
import { useProducts } from "../../context/ProductContext";
import { useCart } from "../../context/CartContext";
import { Button } from "../../components/Button/Button";

export const ProductPage = () => {
  let { id } = useParams();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const product = useMemo(() => products[Number(id) - 1], [products, id]);

  const classWithDiscount = useMemo(() => {
    return product.discountPrice
      ? classes.product__discount
      : classes.product__price;
  }, [product.discountPrice]);

  return (
    <div className={classes.productContainer}>
      <NavBar />
      <div className={classes.product} key={product.id}>
        <h4 className={classes.product__title}>{product.title}</h4>
        <p className={classWithDiscount}>{product.price}$</p>
        {product.discountPrice && (
          <p className={classes.product__price}>
            {product.discountPrice}$
          </p>
        )}
        <div className={classes.product__imgContainer}>
          <img
            className={classes.product__imgContainer__image}
            src={product.image}
            alt={product.title}
          />
        </div>
        <p className={classes.product__description}>{product.description}</p>
        <Button
          name="Add to cart"
          onClick={() => {
            addToCart(product);
          }}
        />
      </div>
    </div>
  );
};
