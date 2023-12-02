import React, { useMemo } from "react";
import { useProducts } from "../../context/ProductContext";
import { ProductWidget } from "../../components/ProductWidget/ProductWidget";
import { NavBar } from "../../components/NavBar/NavBar";
import classes from "./Products.module.scss";
import { SideBar } from "../../components/SideBar/SideBar";
import { useFilter } from "../../context/FilterContext";
import { Footer } from "../../components/Footer/Footer";
import { Button } from "../../components/Button/Button";

export const Products = () => {
  const { products } = useProducts();
  const { filteredProducts, resetFilter } = useFilter();

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
        {filteredProd.length === 0 && (
          <div className={classes.noFoundProducts}>
            <h3 className={classes.noFoundProducts__title}>
              No products found
            </h3>
            <Button name="Reset Filters" onClick={resetFilter} width="200px" />
          </div>
        )}
        {filteredProd.length !== 0 && (
          <div className={classes.products}>
            {filteredProd.map((product, index) => (
              <ProductWidget product={product} key={index} />
            ))}
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
};
