import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";
import { DiscountProvider } from "./context/DiscountContext";
import { FilterProvider } from "./context/FilterContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ProductProvider>
      <CartProvider>
        <DiscountProvider>
          <FilterProvider>
            <App />
          </FilterProvider>
        </DiscountProvider>
      </CartProvider>
    </ProductProvider>
  </React.StrictMode>
);
