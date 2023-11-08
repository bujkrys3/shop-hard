import classes from "./TopBar.module.scss";
import { Link } from "react-router-dom";
import { CartStatus } from "../CartStatus/CartStatus";

export const NavBar = () => {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.nav}>
          <Link to={"/"} className={classes.nav__title}>
            Home
          </Link>
          <Link to={"/contact"} className={classes.nav__title}>
            Contact
          </Link>
        </div>
        <CartStatus />
      </div>
    </div>
  );
};
