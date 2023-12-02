import React, { useMemo } from "react";
import classes from "./Category.module.scss";
import { ProductWidget } from "../../components/ProductWidget/ProductWidget";
import { useProducts } from "../../context/ProductContext";
import { useFilter } from "../../context/FilterContext";
import { NavBar } from "../../components/NavBar/NavBar";
import { SideBar } from "../../components/SideBar/SideBar";
import { Footer } from "../../components/Footer/Footer";
import { Button } from "../../components/Button/Button";

export const Category = () => {
  const { categoryProducts, category } = useProducts();
  const { filteredProducts, resetFilter } = useFilter();

  const filteredProd = useMemo(() => {
    return filteredProducts(categoryProducts);
  }, [categoryProducts, filteredProducts]);

  const images = categoryProducts.map((product) => product.image);
  console.log(images);

  return (
    <div>
      <NavBar />
      <SideBar />
      <div className={classes.wrapper}>
        <div className={classes.nameCategory}>
          <h3 className={classes.title}>{category}</h3>
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
