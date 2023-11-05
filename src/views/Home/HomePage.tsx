import React from "react";
import { NavBar } from "../../components/NavBar/NavBar";
import classes from "./HomePage.module.scss";
import { useProducts } from "../../context/ProductContext";
import { ProductWidget } from "../../components/ProductWidget/ProductWidget";

export const HomePage = () => {
  const { favoriteProducts } = useProducts();
  return (
    <div>
      <NavBar />
      <div className={classes.wrapper}>
        <h3 className={classes.title}>Popular Products</h3>
        <div className={classes.products}>
          {favoriteProducts.map((product, index) => (
            <div className={classes.products__product} key={index}>
              <ProductWidget product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
