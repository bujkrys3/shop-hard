import React, { useEffect, useRef } from "react";
import classes from "./SideBar.module.scss";
import { Filter } from "../Filter/Filter";

export const SideBar = () => {
  // const wrapRef = useRef<HTMLDivElement | null>(null);
  // const wrapTwoRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   const wrap = wrapRef.current;
  //   const wrapTwo = wrapTwoRef.current;

  //   const positionWrapTwo = () => {
  //     if (wrap === null || wrapTwo === null) return;
  //     const wrapRect = wrap.getBoundingClientRect();
  //     wrapTwo.style.left = wrapRect.left + "px";
  //     wrapTwo.style.top = wrapRect.top + "px";
  //   };

  //   positionWrapTwo();

  //   window.addEventListener("resize", positionWrapTwo);

  //   return () => {
  //     window.removeEventListener("resize", positionWrapTwo);
  //   };
  // }, []);

  return (
    <div>
      <div className={classes.wrapper}>
        <p className={classes.title}>Filters:</p>
        <Filter />
      </div>
    </div>
  );
};
