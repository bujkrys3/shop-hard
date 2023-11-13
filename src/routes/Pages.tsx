import React from "react";
import { HomePage } from "../views/Home/HomePage";
import { ProductPage } from "../views/ProductPage/ProductPage";
import { Category } from "../views/Category/Category";
import { Cart } from "../views/Cart/Cart";
import { Contact } from "../views/Contact/Contact";
import { Products } from "../views/Products/Products";
import { Route, Routes, HashRouter } from "react-router-dom";

const config = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/products",
    component: Products,
  },
  {
    path: "/products/:id",
    component: ProductPage,
  },
  {
    path: "/category",
    component: Category,
  },
  {
    path: "/cart",
    component: Cart,
  },
  {
    path: "/contact",
    component: Contact,
  },
  { path: "*", component: "Not Found" },
];

export const Pages = () => {
  return (
    <HashRouter>
      <Routes>
        {config.map((route, index) => (
          <Route key={index} path={route.path} element={<route.component />} />
        ))}
      </Routes>
    </HashRouter>
  );
};
