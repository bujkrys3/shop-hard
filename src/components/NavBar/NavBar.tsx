import classes from "./NavBar.module.scss";
import { Link } from "react-router-dom";
import { CartStatus } from "../CartStatus/CartStatus";
import { useEffect, useRef, useState } from "react";
import { useProducts } from "../../context/ProductContext";

export const NavBar = () => {
  const { categories, setCategoryProductsHandler } = useProducts();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisible = () => {
    setIsVisible((prev) => !prev);
  };

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const wrapTwoRef = useRef<HTMLDivElement | null>(null);
  const wrapThreeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const wrapTwo = wrapTwoRef.current;
    const wrapThree = wrapThreeRef.current;

    const positionWrapTwo = () => {
      if (wrap === null || wrapTwo === null || wrapThree === null) return;
      const wrapTwoRect = wrapTwo.getBoundingClientRect();
      const wrapThreeRect = wrapThree.getBoundingClientRect();
      wrap.style.left = wrapTwoRect.left + "px";
      wrap.style.top = wrapThreeRect.bottom + "px";
    };

    positionWrapTwo();

    window.addEventListener("resize", positionWrapTwo);

    return () => {
      window.removeEventListener("resize", positionWrapTwo);
    };
  }, []);

  return (
    <div className={classes.container} ref={wrapThreeRef}>
      <div className={classes.wrapper}>
        <div className={classes.nav}>
          <Link to={"/"} className={classes.nav__title}>
            Home
          </Link>
          <Link to={"/contact"} className={classes.nav__title}>
            Contact
          </Link>
          <div
            ref={wrapTwoRef}
            className={classes.nav__title}
            onClick={toggleVisible}
          >
            Products
          </div>
          <div
            className={
              isVisible ? `${classes.list} ${classes.visible}` : classes.list
            }
            ref={wrapRef}
          >
            <Link to={"/products"} className={classes.list__item}>
              All products
            </Link>
            {categories.map((item, index) => {
              return (
                <Link
                  to={`/category`}
                  onClick={() => {
                    setCategoryProductsHandler(item);
                    toggleVisible();
                  }}
                  className={classes.list__item}
                  key={index}
                >
                  {item}
                </Link>
              );
            })}
          </div>
        </div>
        <CartStatus />
      </div>
    </div>
  );
};
