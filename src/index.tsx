import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";
import { DiscountProvider } from "./context/DiscountContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ProductProvider>
      <CartProvider>
        <DiscountProvider>
          <App />
        </DiscountProvider>
      </CartProvider>
    </ProductProvider>
  </React.StrictMode>
);
