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

  const filteredProd = useMemo(() => {
    return filteredProducts(categoryProducts);
  }, [categoryProducts, filteredProducts]);

  const images = categoryProducts.map((product) => product.image);
  console.log(images)

  return (
    <div>
      <NavBar />
      <SideBar />
      <div className={classes.wrapper}>
        <div className={classes.nameCategory}>
          <h3 className={classes.title}>{category}</h3>
        </div>
        <div className={classes.products}>
          {filteredProd.map((product, index) => (
            <ProductWidget product={product} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};
