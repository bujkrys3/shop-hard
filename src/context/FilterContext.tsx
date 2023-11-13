import React, { ReactNode, useState, useContext, createContext } from "react";
import { FilterData } from "../types/productsInterface";
import { Product } from "../types/productsInterface";

interface FilterContextInterface {
  filterData: FilterData;
  setFilterData: (data: any) => void;
  filteredProducts: (products: Product[]) => Product[];
  resetFilter: () => void;
}

const initialFilterData = {
  price: {
    from: "",
    to: "",
  },
  sortBy: "lowestPrice",
};

const FilerContext = createContext<FilterContextInterface | null>(null);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filterData, setFilterData] = useState(initialFilterData);

  const resetFilter = () => {
    setFilterData(initialFilterData);
  };

  const filteredProducts = (products: Product[]) => {
    const { price, sortBy } = filterData;

    const filteredProducts = products.filter((product: any) => {
      if (price.from === "" && price.to === "") {
        return product;
      } else if (price.from === "") {
        return product.price <= price.to;
      } else if (price.to === "") {
        return product.price >= price.from;
      } else {
        return product.price >= price.from && product.price <= price.to;
      }
    });

    if (sortBy === "lowestPrice") {
      return filteredProducts.sort(
        (a: Product, b: Product) => a.price - b.price
      );
    } else if (sortBy === "highestPrice") {
      return filteredProducts.sort(
        (a: Product, b: Product) => b.price - a.price
      );
    } else if (sortBy === "lowestRating") {
      return filteredProducts.sort(
        (a: Product, b: Product) => a.rating.rate - b.rating.rate
      );
    } else if (sortBy === "highestRating") {
      return filteredProducts.sort(
        (a: Product, b: Product) => b.rating.rate - a.rating.rate
      );
    } else {
      return filteredProducts;
    }
  };

  return (
    <FilerContext.Provider
      value={{ filterData, setFilterData, filteredProducts, resetFilter }}
    >
      {children}
    </FilerContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilerContext);
  if (context === null) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
