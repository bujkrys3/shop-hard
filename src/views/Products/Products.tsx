import React from "react";
import { useProducts } from "../../context/ProductContext";
import { ProductWidget } from "../../components/ProductWidget/ProductWidget";
import { NavBar } from "../../components/NavBar/NavBar";
import classes from "./Products.module.scss";
import { SideBar } from "../../components/SideBar/SideBar";

export const Products = () => {
  const { products } = useProducts();
  return (
    <div>
      <NavBar />
      <SideBar />
      <div className={classes.wrapper}>
        <h3 className={classes.title}>All products</h3>
        <div className={classes.products}>
          {products.map((product, index) => (
            <div className={classes.products__product} key={index}>
              <ProductWidget product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
