import React, { useMemo } from "react";
import classes from "./Category.module.scss";
import { ProductWidget } from "../../components/ProductWidget/ProductWidget";
import { useProducts } from "../../context/ProductContext";
import { useFilter } from "../../context/FilterContext";
import { NavBar } from "../../components/NavBar/NavBar";
import { SideBar } from "../../components/SideBar/SideBar";

export const Category = () => {
  const { categoryProducts, category } = useProducts();
  const { filteredProducts } = useFilter();

  const products = useMemo(() => {
    return filteredProducts(categoryProducts);
  }, [categoryProducts, filteredProducts]);


  return (
    <div>
      <NavBar />
      <SideBar />
      <div className={classes.wrapper}>
        <h3 className={classes.title}>{category}</h3>
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
