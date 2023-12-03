import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import classes from "./Footer.module.scss";

export const Footer = () => {
  const openInNewTab = (url: string) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  return (
    <div className={classes.footer}>
      <FontAwesomeIcon
        onClick={() => {
          openInNewTab("https://www.facebook.com/");
        }}
        className={classes.footer__icon}
        icon={faFacebook}
      />
      <FontAwesomeIcon
        onClick={() => {
          openInNewTab("https://twitter.com/?lang=pl");
        }}
        className={classes.footer__icon}
        icon={faTwitter}
      />
      <FontAwesomeIcon
        onClick={() => {
          openInNewTab("https://www.instagram.com/");
        }}
        className={classes.footer__icon}
        icon={faInstagram}
      />
    </div>
  );
};
