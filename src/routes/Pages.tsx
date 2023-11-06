import React from "react";
import { HomePage } from "../views/Home/HomePage";
import { ProductPage } from "../views/ProductPage/ProductPage";
import { Category } from "../views/Category/Category";
import { Cart } from "../views/Cart/Cart";
import { Contact } from "../views/Contact/Contact";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  HashRouter,
} from "react-router-dom";
import { DeliveryForm } from "../views/DeliveryForm/DeliveryForm";

export const Pages = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/category" element={<Category />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/delivery" element={<DeliveryForm />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </HashRouter>
  );
};
