import React, { ReactNode, useEffect, useState } from "react";
import { Product } from "../types/productsInterface";

export interface ProductContextInterface {
  products: Product[];
  favoriteProducts: Product[];
  categories: string[];
  category: string;
  categoryProducts: Product[];
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const ProductContext = React.createContext<ProductContextInterface | null>(
  null
);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string>("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const favoriteProducts = [...products]
    .sort((a, b) => b.rating.rate - a.rating.rate);

  const categories = products.reduce<string[]>((acc, product) => {
    if (!acc.includes(product.category)) {
      acc.push(product.category);
    }
    return acc;
  }, []);

  const categoryProducts = products.filter(
    (product) => product.category === category
  );

  return (
    <ProductContext.Provider
      value={{
        products,
        favoriteProducts,
        categories,
        category,
        categoryProducts,
        setCategory,
        setProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = React.useContext(ProductContext);
  if (context === null) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
