import React from "react";
import { useProducts } from "../../context/ProductContext";
import { ProductWidget } from "../../components/ProductWidget/ProductWidget";
import { NavBar } from "../../components/NavBar/NavBar";
import classes from "./Products.module.scss";

export const Products = () => {
  const { products } = useProducts();
  return (
    <div>
      <NavBar />
      <div className={classes.wrapper}>
        {products.map((product, index) => (
          <ProductWidget key={index} product={product} />
        ))}
      </div>
    </div>
  );
};
