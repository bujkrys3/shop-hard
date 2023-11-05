import React from "react";
import classes from "./Category.module.scss";
import { ProductWidget } from "../../components/ProductWidget/ProductWidget";
import { useProducts } from "../../context/ProductContext";
import { NavBar } from "../../components/NavBar/NavBar";

export const Category = () => {
  const { categoryProducts } = useProducts();

  return (
    <div>
      <NavBar />
      <div className={classes.wrapper}>
        {categoryProducts.map((product, index) => (
          <ProductWidget key={index} product={product} />
        ))}
      </div>
    </div>
  );
};
