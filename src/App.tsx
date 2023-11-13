import React from "react";
import { Pages } from "./routes/Pages";
import classes from "./App.module.scss";

export const App = () => {
  return (
    <div className={classes.wrapper}>
      {/* <Layout> */}
      <Pages />
      {/* </Layout> */}
    </div>
  );
};
