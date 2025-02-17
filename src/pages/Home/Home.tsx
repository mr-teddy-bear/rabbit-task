import { FC } from "react";
import classes from "./Home.module.scss";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/constants";

export const Home: FC = () => {
  return (
    <div className={classes.wrapper}>
      <Link className={classes.link} to={ROUTES.standart}>
        Standart Widget
      </Link>
      <Link className={classes.link} to={ROUTES.algoritmical}>
        Algoritmical Widget
      </Link>
    </div>
  );
};
