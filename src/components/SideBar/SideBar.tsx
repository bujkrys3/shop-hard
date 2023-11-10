import React, { useEffect, useRef, useState } from "react";
import classes from "./SideBar.module.scss";
import { useProducts } from "../../context/ProductContext";
import { Link } from "react-router-dom";
import { Filter } from "../Filter/Filter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export const SideBar = () => {
  const { categories, category, setCategoryProductsHandler } = useProducts();
  const [isCategoryVisible, setIsCategoryVisible] = useState<boolean>();

  const toggleCategoryVisibility = () => {
    setIsCategoryVisible!(!isCategoryVisible);
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const wrapTwoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const wrapTwo = wrapTwoRef.current;

    const positionWrapTwo = () => {
      if (wrap === null || wrapTwo === null) return;
      const wrapRect = wrap.getBoundingClientRect();
      wrapTwo.style.left = wrapRect.left + "px";
      wrapTwo.style.top = wrapRect.top + "px";
    };

    positionWrapTwo();

    window.addEventListener("resize", positionWrapTwo);

    return () => {
      window.removeEventListener("resize", positionWrapTwo);
    };
  }, []);

  return (
    <div ref={wrapRef}>
      <div ref={wrapTwoRef} className={classes.wrapper}>
        <Link to={"/products"} className={classes.nav__title}>
          All Products
        </Link>
        <div className={classes.nav__title} onClick={toggleCategoryVisibility}>
          Category <FontAwesomeIcon icon={faChevronDown} />
        </div>
        <ul
          className={`${classes.list} ${
            isCategoryVisible ? classes.visible : ""
          }`}
        >
          {categories.map((item, index) => {
            return (
              <Link
                to={`/category`}
                onClick={() => {
                  setCategoryProductsHandler(item);
                  scrollTop();
                }}
                className={
                  item === category ? classes.list__active : classes.list__item
                }
                key={index}
              >
                {item}
              </Link>
            );
          })}
        </ul>
        <Filter />
      </div>
    </div>
  );
};