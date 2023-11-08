import React from "react";
import { NavBar } from "../../components/TopBar/TopBar";
import classes from "./Contact.module.scss";

export const Contact = () => {
  return (
    <div className={classes.container}>
      <NavBar />
      <div className={classes.wrapper}>
        <h1 className={classes.name}>Nazwa Firmy</h1>
        <div className={classes.contact}>
          <p className={classes.contact__label}>Adres:</p>
          <p className={classes.contact__description}>
            ul. Przykładowa 123, 00-000 Miasto
          </p>
        </div>
        <div className={classes.contact}>
          <p className={classes.contact__label}>Telefon:</p>
          <p className={classes.contact__description}>123-456-789 </p>
        </div>
        <div className={classes.contact}>
          <p className={classes.contact__label}>Email:</p>
          <p className={classes.contact__description}>
            kontakt@przykladowafirma.pl
          </p>
        </div>
      </div>
    </div>
  );
};
