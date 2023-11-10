import React from "react";
import { NavBar } from "../../components/TopBar/TopBar";
import classes from "./HomePage.module.scss";
import { useProducts } from "../../context/ProductContext";
import { ProductWidget } from "../../components/ProductWidget/ProductWidget";

export const HomePage = () => {
  const { favoriteProducts } = useProducts();
  return (
    <div>
      <NavBar />
      <div className={classes.wrapper}>
        <div className={classes.nameCategory}>
          <h3 className={classes.title}>Popular products</h3>
        </div>
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
