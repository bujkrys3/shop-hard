import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import classes from "./Footer.module.scss";

export const Footer = () => {
  return (
    <div className={classes.footer}>
      <FontAwesomeIcon icon={faFacebook} />
    </div>
  );
};
