import React from "react";
import { NavBar } from "../../components/NavBar/NavBar";
import classes from "./HomePage.module.scss";
import { useProducts } from "../../context/ProductContext";
import { ProductWidget } from "../../components/ProductWidget/ProductWidget";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import "../../../node_modules/keen-slider/keen-slider.min.css";
import { Footer } from "../../components/Footer/Footer";

export const HomePage = () => {
  const { favoriteProducts } = useProducts();

  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 3000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  return (
    <div>
      <NavBar />
      <div className={classes.wrapper}>
        <div className={classes.nameCategory}>
          <h3 className={classes.title}>Popular Products</h3>
        </div>
        <div className={classes.products}>
          <div className="keen-slider" ref={sliderRef}>
            <div
              className={`keen-slider__slide number-slide1 ${classes.products__slide}`}
            >
              {favoriteProducts.slice(0, 3).map((product, index) => (
                <div className={classes.products__product} key={index}>
                  <ProductWidget product={product} />
                </div>
              ))}
            </div>
            <div
              className={`keen-slider__slide number-slide2 ${classes.products__slide}`}
            >
              {favoriteProducts.slice(3, 6).map((product, index) => (
                <div className={classes.products__product} key={index}>
                  <ProductWidget product={product} />
                </div>
              ))}
            </div>
            <div
              className={`keen-slider__slide number-slide3 ${classes.products__slide}`}
            >
              {favoriteProducts.slice(6, 9).map((product, index) => (
                <div className={classes.products__product} key={index}>
                  <ProductWidget product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
