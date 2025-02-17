import { FC } from "react";
import classes from "./Layout.module.scss";
import { logo } from "../../assets";
import { Outlet, useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/constants";

export const Layout: FC = () => {
  const navigate = useNavigate();

  const handleContactButtonClick = () => {
    window.location.href = "https://t.me/mrTeddyIT";
  };

  const handleLogoClick = () => {
    navigate(ROUTES.home);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <header className={classes.header}>
          <img
            onClick={handleLogoClick}
            className={classes.logo}
            src={logo}
            alt=""
          />
          <button
            onClick={handleContactButtonClick}
            className={classes.contactBtn}
          >
            contact me
          </button>
        </header>
        <Outlet />
      </div>
    </div>
  );
};
