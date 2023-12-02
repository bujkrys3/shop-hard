import React, { ReactNode } from "react";
import { NavBar } from "../NavBar/NavBar";
import { Footer } from "../Footer/Footer";
import classes from "./LayOut.module.scss";
import { SideBar } from "../SideBar/SideBar";

export const LayOut = ({ children }: { children: ReactNode }) => {
  return (
    <div className={classes.container}>
      <NavBar />
      <SideBar />
      <div>{children}</div>
      <Footer />
    </div>
  );
};
