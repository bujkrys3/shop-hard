import React, { useMemo } from "react";
import { useProducts } from "../../context/ProductContext";
import { ProductWidget } from "../../components/ProductWidget/ProductWidget";
import { NavBar } from "../../components/NavBar/NavBar";
import classes from "./Products.module.scss";
import { SideBar } from "../../components/SideBar/SideBar";
import { useFilter } from "../../context/FilterContext";

export const Products = () => {
  const { products } = useProducts();
  const { filteredProducts } = useFilter();

  const filteredProd = useMemo(() => {
    return filteredProducts(products);
  }, [products, filteredProducts]);

  return (
    <div>
      <NavBar />
      <SideBar />
      <div className={classes.wrapper}>
        <div className={classes.nameCategory}>
          <h3 className={classes.title}>All products</h3>
        </div>
        <div className={classes.products}>
          {filteredProd.map((product, index) => (
            <div className={classes.products__product} key={index}>
              <ProductWidget product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
