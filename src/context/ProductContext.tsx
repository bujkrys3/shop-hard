import React, { ReactNode, useEffect, useState } from "react";
import { Product } from "../utils/types/productsInterface";

export interface ProductContextInterface {
  products: Product[];
  favoriteProducts: Product[];
  categories: string[];
  category: string;
  categoryProducts: Product[];
  fetchCategoryProducts: (category: string) => void;
  setCategoryProductsHandler(category: string): void;
  addDiscountPrice: (discountCode: string) => void;
  removeDiscountPrice: () => void;
}

const ProductContext = React.createContext<ProductContextInterface | null>(
  null
);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState<string>("");
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);

  const fetchCategoryProducts = (category: string) => {
    fetch(`https://fakestoreapi.com/products/category/${category}`)
      .then((res) => res.json())
      .then((data) => setCategoryProducts(data));
  };

  const setCategoryProductsHandler = (category: string) => {
    const productsCategory = products.filter(
      (product) => product.category === category
    );
    setCategoryProducts(productsCategory);
    setCategory(category);
  };

  const addDiscountPrice = (discountCode: string) => {
    const discount = Number(discountCode.split("_")[1]);
    const updatedCart = products.map((item) => {
      const discountPrice = item.price - (item.price * discount) / 100;
      return { ...item, discountPrice };
    });
    setProducts(updatedCart);
  };

  const removeDiscountPrice = () => {
    const updatedCart = products.map((item) => {
      delete item.discountPrice;
      return { ...item };
    });
    setProducts(updatedCart);
  };

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    const sortedProducts = [...products].sort(
      (a, b) => a.rating.rate - b.rating.rate
    );
    setFavoriteProducts(sortedProducts.slice(0, 3));
  }, [products]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        favoriteProducts,
        categories,
        category,
        categoryProducts,
        fetchCategoryProducts,
        setCategoryProductsHandler,
        addDiscountPrice,
        removeDiscountPrice,
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
