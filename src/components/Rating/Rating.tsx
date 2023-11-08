import React from "react";
import classes from "./Rating.module.scss";

interface RatingProps {
  rate: number;
  count: number;
}

export const Rating: React.FC<RatingProps> = ({ rate, count }) => {
  const stars = [];
  const integerPart = Math.floor(rate);
  const decimalPart = rate - integerPart;

  for (let i = 0; i < 5; i++) {
    if (i < integerPart) {
      stars.push(<span key={i}>&#9733;</span>);
    } else if (i === integerPart && decimalPart >= 0.5) {
      stars.push(<span key={i}>&#9733;&#9734;</span>);
    } else {
      stars.push(<span key={i}>&#9734;</span>);
    }
  }

  return (
    <div className={classes.rating}>
      <div className={classes.rating__stars}>{stars}</div>
      <span className={classes.rating__count}>({count} ratings)</span>
    </div>
  );
};
